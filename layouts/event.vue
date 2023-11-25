<script setup lang="ts">
import type {PublicEvent} from "~/utils/event";

const {id} = useRoute().params

const {Subscribe, Unsubscribe, Join} = useEvent(id as string)
const {$user} = useNuxtApp()
const {path} = useRoute()

let event = ref<PublicEvent>()

onMounted(() => {
  event = Subscribe()
})
onUnmounted(() => {
  Unsubscribe()
})

const inEvent = computed(() => {
  return event.value?.participants?.findIndex(p => p.id === $user.value?.uid) !== -1
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
              {{ event?.startedAt?.toDate().toLocaleString() }}
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
            <div class="join-panel">
              <div class="progress-panel">
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
            </div>
          </div>
        </div>

        <NuxtPage :event="event"/>
      </div>
    </div>
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
</style>
