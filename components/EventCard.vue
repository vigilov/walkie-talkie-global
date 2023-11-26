<script setup lang="ts">
const props = defineProps<{
  id: string,
  event: PublicEvent
}>()

const event = ref<PublicEvent>(props.event)

function fillingLevel() {
  if (event.value?.maxTeamSize === 1) {
    return (event.value?.participants?.length || 0) * 100 / (event.value?.maxParticipants || 1)
  }

  return (event.value?.teams?.length || 0) * 100 / (event.value?.maxTeamSize || 1)
}

function fillingText() {
  if (event.value?.maxTeamSize === 1) {
    return `${event.value?.participants?.length || 0}/${(event.value?.maxParticipants || 1)} participants`
  }

  return `${event.value?.teams?.length || 0}/${(event.value?.maxTeamSize || 1)} teams`
}

function toEvent(id: string) {
  const {$eventID} = useNuxtApp()
  $eventID.value = id as string
  navigateTo(`/events/${id}`)
}

</script>

<template>
  <div class="event-card">
    <div class="cover">
      <NuxtLink @click="toEvent(props.id)" >
        <img v-if="event.coverURL" :src="event.coverURL" alt="Event Cover" class="cover-img">
        <img v-else src="../resources/cover.jpg" alt="Event Cover" class="cover-img">
      </NuxtLink>
    </div>

    <div class="description space-y-1.5">
      <NuxtLink @click="toEvent(props.id)" class="pb-2 cursor-pointer">
        <h2>{{ event.name }}</h2>
      </NuxtLink>
      <span class="event-date">{{ new Date(event.startedAt).toLocaleString() }}</span>
      <span class="event-location">{{ event.location }}</span>

      <div class="progress-panel pt-3">
        <div class="progress-bar">
          <div class="progress" :style="{'width': `${fillingLevel()}%`}"></div>
        </div>
        <div class="progress-text">
          {{ fillingText() }}
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="sass">
.event-card
  @apply flex items-center flex-col
  width: 410px
  height: 413px
  flex-shrink: 0
  border-radius: 10px
  background: #FFF

.description
  @apply m-4 flex items-start flex-col self-start
  text-align: center
  font-size: 14px
  font-style: normal

  h2
    color: var(--black, #333)
    font-family: Corsa Grotesk, sans-serif
    font-size: 22px
    font-style: normal
    font-weight: 500
    line-height: normal

  .event-date
    color: var(--black, #333)
    font-family: Corsa Grotesk, sans-serif
    font-size: 16px
    font-style: normal
    font-weight: 400
    line-height: 24px

  .event-location
    color: var(--black, #333)
    font-family: Corsa Grotesk, sans-serif
    font-size: 16px
    font-style: normal
    font-weight: 400
    line-height: 24px

.cover
  @apply flex items-center justify-center  cursor-pointer
  background: var(--grey, #fff)
  width: 100%
  border-radius: 10px

.cover-img
  width: 448px
  height: 235px
  border-radius: 10px 10px 0 0
  object-fit: cover

.add-icon
  @apply w-6 h-6
  color: var(--Main, #D244DE)

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
</style>
