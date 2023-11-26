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
  if (event.value?.maxTeamSize === 1) {
    return (event.value?.participants?.length || 0) * 100 / (event.value?.maxParticipants || 1)
  }

  return (event.value?.teams?.length || 0) * 100 / (event.value?.maxTeamSize || 1)
}

async function copyLink() {
  await navigator.clipboard.writeText(`${window.location.origin}${path}`);
}

async function planEvent() {
  waitingEventPlan.value = true
  const propmpt = `We have several services for any planning event:
1. Location Selection
2. Food Catering Selection
3. Shisha Catering Selection
4. Drink Catering Selection
5. Music Selection
6. Event Host Selection
7. Board Games Selection
8. Sport Games Selection
9. Kids Games Selection
10. Hike/Trip Selection
11. Villages Master Classes Selection
12. Even Sponsors Selection
13. Animal Shelter Excurtion Selection
14. Education Lectures Selection

Propose please plan of 5 points for the event with the name “${event?.value?.name}”, which related the services described above.
Wrap the response in json, each option should have a title field and a description field. Example of response: [{'title':'...', 'description':'...'}, ...]. response type is list of dictionaries.`

  createEventPlanModal.value = true

  await useFetch('https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'OpenAI-Organization': 'org-xKRpliiv6Z20BC0OvEdWZQRI'
        },
        body: {"model": "gpt-4", "messages": [{"role": "user", "content": propmpt}]},
        onResponse({request, response, options}) {

          waitingEventPlan.value = false

          eventPlanSuggestionsRequest.value = JSON.parse(response._data.choices[0].message.content)
        },
      })
}

function fillingText() {
  if (event.value?.maxTeamSize === 1) {
    return `${event.value?.participants?.length || 0}/${(event.value?.maxParticipants || 1)} participants`
  }

  return `${event.value?.teams?.length || 0}/${(event.value?.maxTeamSize || 1)} teams`

}

</script>

<template>
  <ClientOnly>
    <div class="body">
      <Header/>

      <div>
        <div class="header">
          <NuxtLink class="back" to="/">
            <Icon name="material-symbols:arrow-back-ios"/>
            Go back to all events
          </NuxtLink>

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
            </div>
          </div>
        </div>

        <NuxtPage :event="event"/>
      </div>
    </div>
    <EventPlanPanel :suggestions="eventPlanSuggestionsRequest" :eventID="id" @close="createEventPlanModal=false"
                    v-if="createEventPlanModal" :waiting="waitingEventPlan"/>
  </ClientOnly>
</template>

<style scoped lang="sass">
.header
  @apply mb-12

.body
  @apply flex flex-col items-center

.back
  @apply cursor-pointer flex items-center justify-center
  color: var(--grey, #A9B0BC)
  font-size: 16px

.title
  @apply text-center
  font-size: 50px
  font-weight: 500

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

