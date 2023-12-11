<script setup lang="ts">
import type {PublicEvent} from "~/utils/event";

const {$eventID} = useNuxtApp()

const {params} = useRoute()
const id = params.id || $eventID.value

const {Subscribe, Unsubscribe, Join} = useEvent(id as string)
const {$user} = useNuxtApp()
const {path} = useRoute()

const createEventPlanModal = ref(false)
const waitingEventPlan = ref(false)
const eventPlanSuggestionsRequest = ref([])
const ideas = ref('')

let event = ref<PublicEvent>()

onMounted(() => {
  event = Subscribe()
})
onUnmounted(() => {
  Unsubscribe()
})

const inEvent = computed(() => {
  return event.value?.participants?.findIndex(p => p.id === $user.value?.uid) != -1 || isOwner.value
})

const isOwner = computed(() => {
  return event.value?.createdBy === $user.value?.uid
})


function fillingLevel() {
  if (event.value?.maxTeamSize <= 1) {
    const progress = (event.value?.participants?.length || 0) * 100 / (event.value?.maxParticipants || 1)
    return progress > 100 ? 100 : progress
  }

  return (event.value?.teams?.length || 0) * 100 / ((event.value?.maxParticipants || 1) / (event.value?.maxTeamSize || 1))
}

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href);
}

async function planEvent() {
  waitingEventPlan.value = true
  createEventPlanModal.value = true

  await useFetch(`/api/gpt?query=${event.value?.name}`,
      {
        method: 'GET',
        onResponse({request, response, options}) {
          eventPlanSuggestionsRequest.value = JSON.parse(response._data.hello.choices[0].message.content)
          waitingEventPlan.value = false
        },
      })
}

async function generateIdea() {
  waitingEventPlan.value = true
  createEventPlanModal.value = true

  await useFetch(`/api/idea?query=${event.value?.name}&description=${event.value?.description}`,
      {
        method: 'GET',
        onResponse({request, response, options}) {
          ideas.value = response._data.hello.choices[0].message.content
          waitingEventPlan.value = false
        },
      })
}

function fillingText() {
  if (event.value?.maxTeamSize <= 1) {
    return `${event.value?.participants?.length || 0}/${(event.value?.maxParticipants || 1)} participants`
  }

  return `${event.value?.teams?.length || 0}/${Math.round((event.value?.maxParticipants || 1) / (event.value?.maxTeamSize || 1))} teams`

}

const eventCover = computed(() => {
  return event.value?.coverURL || '../resources/cover.jpg'
})

</script>

<template>
  <ClientOnly>
    <div class="body">
      <Header/>

      <div>
        <NuxtLink class="back" to="/">
          <Icon name="material-symbols:arrow-back-ios"/>
          Go back to all events
        </NuxtLink>

        <div class="header">

          <img v-if="event?.coverURL" :src="event.coverURL" alt="" class="header-bg">
          <img v-else src="../resources/cover.jpg" alt="" class="header-bg">

          <div class="title">
            {{ event?.name }}
          </div>
          <div class="info">
            <div class="startedAt">
              {{ event?.startedAt }}
            </div>
            <div class="y-divider"></div>
            <div class="location">
              {{ event?.location }}
            </div>
            <div class="y-divider"></div>
            <NuxtLink class="chat" :to="event?.chatURL" target="_blank">
              Chat with organizer
            </NuxtLink>
          </div>
          <div class="flex flex-col items-center">
            <div class="join-panel gap-4">
              <div class="progress-panel flex-1">
                <div class="progress-bar">
                  <div class="progress" :style="{'width': `${fillingLevel()}%`}"></div>
                </div>
                <div class="progress-text">
                  {{ fillingText() }}
                </div>
              </div>
              <div v-if="inEvent" class="button primary" @click="copyLink">
                Copy link
              </div>
              <div class="button primary" @click="Join" v-else>
                Join to this event
              </div>
              <div class="button aibutton" v-if="isOwner" @click="planEvent">
                <img src="/openai.png" class="w-4 h-4">
                Event plan
              </div>
              <div class="button aibutton" @click="generateIdea">
                <img src="/openai.png" class="w-4 h-4">
                Generate an idea
              </div>
            </div>

            <div class="description-panel">{{ event?.description }}</div>

          </div>
        </div>

        <NuxtPage v-if="$user" :event="event"/>
      </div>
    </div>
    <EventPlanPanel :suggestions="eventPlanSuggestionsRequest" :eventID="id" @close="createEventPlanModal=false"
                    v-if="createEventPlanModal" :waiting="waitingEventPlan"/>

    <EventIdeasPanel :content="ideas" :eventID="id" @close="createEventPlanModal=false"
                     v-if="createEventPlanModal" :waiting="waitingEventPlan"/>
  </ClientOnly>
</template>

<style scoped lang="sass">
.header
  @apply mb-12
  overflow: hidden
  position: relative

  .header-bg
    @apply absolute
    left: 5%
    top: 5%
    width: 90%
    height: 90%
    object-fit: cover
    z-index: -1
    filter: blur(5px)
    opacity: 0.4
    border-radius: 20px

.body
  @apply flex flex-col items-center

.title
  @apply text-center mt-6
  font-size: 50px
  font-weight: 700
  -webkit-text-stroke: 1px #fff
  text-stroke: 1px #fff

.info
  @apply flex items-center justify-center gap-4

.join-panel
  @apply mt-8
  display: flex
  width: 700px
  padding: 20px
  justify-content: space-between
  align-items: center
  border-radius: 20px
  background: #FFF

.description-panel
  @apply mt-5 break-words rounded-2xl bg-white bg-opacity-60 mb-8 py-2 px-2 text-gray-800
  width: 1200px
  display: flex
  justify-content: space-between
  align-items: center
  text-align: center
  font-size: 22px
  font-weight: 500

.progress-panel
  @apply flex items-center gap-4

  .progress-bar
    @apply rounded-full relative
    background: rgba(169, 176, 188, 0.30)
    width: 109px
    height: 13px

    .progress
      @apply rounded-full absolute
      background: var(--Main, #D244DE)
      height: 100%
      left: 0
      top: 0

  .progress-text
    font-size: 16px
    font-weight: 500
    color: var(--grey, #A9B0BC)

.chat
  color: var(--Main, #D244DE)

.aibutton
  color: white
  background: linear-gradient(90deg, #6477EC 0%, #A461E6 49.81%, #F98F56 103.38%)
</style>

