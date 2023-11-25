<script setup lang="ts">
import type {Participant} from "~/utils/participant";

definePageMeta({
  layout: 'event'
})

const props = defineProps<{
  event: PublicEvent
}>()

const participants = [{
  name: 'John Doe',
  photoURL: 'https://i.pravatar.cc/300?img=1',
  description: 'I am a cool guy'
}, {
  name: 'John Doe',
  photoURL: 'https://i.pravatar.cc/300?img=1',
  description: 'I am a cool guy'
}, {
  name: 'John Doe',
  photoURL: 'https://i.pravatar.cc/300?img=4',
  description: 'I am a cool guy'
}, {
  name: 'John Doe',
  photoURL: 'https://i.pravatar.cc/300?img=2',
  description: 'I am a cool guy'
}, {
  name: 'John Doe',
  photoURL: 'https://i.pravatar.cc/300?img=1',
  description: 'I am a cool guy'
}, {
  name: 'John Doe',
  photoURL: 'https://i.pravatar.cc/300?img=1',
  description: 'I am a cool guy'
}]
</script>

<template>
  <div>
    <div class="menu">
      <div class="menu-item">
        Teams & Participants
      </div>
    </div>

    <div class="group-title-panel">
      <div class="h1">
        Participants <template v-if="event.maxParticipants">without team</template>
      </div>
      <div>
        <div class="article">
          This is where all participants who are looking for a team go.
        </div>
        <div class="article">
          You can move them yourself to teams with a free slot, assign them automatically or leave them as substitutes.
        </div>
      </div>

      <div class="team flex flex-wrap">
        <ParticipantCard v-for="participant in participants" :name="participant.name"
                         :photoURL="participant.photoURL" :description="participant.description"/>
      </div>
    </div>

    <div class="group-title-panel" v-if="event?.maxTeamSize > 1">
      <div class="h1">
        Teams
      </div>
      <div>
        <div class="article">
          Participants can create and add to teams themselves.
        </div>
        <div class="article">
          For convenience, you can pre-create as many teams as you think you will need.
        </div>

        <div class="flex justify-center m-8">
          <div class="button primary">Create team</div>
        </div>
      </div>

      <div class="teams">
        <div class="team-header">
          <div class="title">
            Team 1
          </div>
          <div class="chat">

          </div>
        </div>
        <div class="team flex flex-wrap">
          <ParticipantCard v-for="participant in participants" :name="participant.name"
                           :photoURL="participant.photoURL" :description="participant.description"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.menu
  @apply flex justify-center
  border-bottom-color: #DDD
  border-bottom-width: 1px

  .menu-item
    @apply border-b-2
    font-size: 22px
    font-weight: 500
    border-color: var(--Main, #D244DE)

.group-title-panel
  @apply flex justify-center items-center mt-12 flex-col
  width: 800px

  .h1
    @apply mb-4
    font-size: 32px
    font-weight: 500
    border-color: var(--Main, #D244DE)

  .article
    @apply text-center
    color: var(--black, #333)
    font-size: 16px

.team
  @apply flex justify-start items-center gap-4
  width: 1440px
  margin-top: 24px
</style>
