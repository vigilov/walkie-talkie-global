<script setup lang="ts">
import type {PublicEvent} from "~/utils/event";

const {id} = useRoute().params
const {Load} = useEvent(id as string)

const event = await Load() as PublicEvent

function fillingLevel() {
  return 90
}

function fillingText() {
  return '18/20 teams'
}
</script>

<template>
  <ClientOnly>
    <div class="header">
      <div class="back">
        <Icon name="material-symbols:arrow-back-ios"/>
        Go back to all events
      </div>

      <div class="title">
        {{ event.name }}
      </div>
      <div class="info">
        <div class="startedAt">
          {{ event?.startedAt?.toDate().toLocaleString() }}
        </div>
        <div class="y-divider"></div>
        <div class="location">
          {{ event.location }}
        </div>
        <div class="y-divider"></div>
        <div class="chat">
          Chat with organizer
        </div>
      </div>
      <div class="join-panel">
        <div class="progress-panel">
          <div class="progress-bar">
            <div class="progress" :style="{'width': `${fillingLevel()}%`}"></div>
          </div>
          <div class="progress-text">
            {{ fillingText() }}
          </div>
        </div>
        <div class="button primary">
          Join to this event
        </div>
      </div>
    </div>

    <NuxtPage/>

  </ClientOnly>
</template>

<style scoped lang="sass">
.back
  @apply cursor-pointer flex items-center justify-center
  color: var(--grey, #A9B0BC)
  font-size: 16px

.title
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
</style>
