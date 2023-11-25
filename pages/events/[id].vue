<script setup lang="ts">
import type {Participant} from "~/utils/participant";

definePageMeta({
  layout: 'event'
})

const {id} = useRoute().params

const props = defineProps<{
  event: PublicEvent
}>()

const createTeamModal = ref(false)

const {CreateTeam, LeaveTeam, DeleteTeam} = useEvent(id as string)

function createTeam() {
  CreateTeam('New Team', '')
}

function freeSlots(team?: Team) {
  if (!team) {
    return 0
  }

  return props.event?.maxTeamSize - team.participants.length
}
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
        Participants
        <template v-if="event?.maxTeamSize > 1">without team</template>
      </div>
      <div v-if="event?.maxTeamSize > 1">
        <div class="article">
          This is where all participants who are looking for a team go.
        </div>
        <div class="article">
          You can move them yourself to teams with a free slot, assign them automatically or leave them as substitutes.
        </div>
      </div>

      <div class="team flex flex-wrap">
        <ParticipantCard v-for="participant in event?.participants" :name="participant.name"
                         :photoURL="participant.photoURL" :description="participant.about"/>
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
          <div class="button primary" @click="createTeamModal=true">Create team</div>
        </div>
      </div>

      <div class="teams">
        <div class="team-block" v-for="team in event?.teams">
          <div class="team-header">
            <div class="title">
              {{ team?.name }}
            </div>
            <NuxtLink :to="team?.chatURL" class="chat" v-if="team?.chatURL" target="_blank">
              Chat with team
            </NuxtLink>
            <div class="chat" @click="DeleteTeam(team)">
              Delete
            </div>
          </div>
          <div class="team flex flex-wrap">
            <ParticipantCard v-for="participant in team?.participants" :name="participant.name" :id="participant.id"
                             :team="team"
                             :photoURL="participant.photoURL" :description="participant.about"/>
            <EmptyCard v-for="i in freeSlots(team)" :team="team" :eventID="id as string" :i="i"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CreateTeamPopup :eventID="id as string" @close="createTeamModal=false" v-if="createTeamModal"/>
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

.team-block
  @apply mb-8
  .team-header
    @apply flex w-full mb-4

    .title
      font-size: 16px
      font-style: normal
      font-weight: 700

    .chat
      @apply cursor-pointer ml-4
      color: var(--Main, #D244DE)
      font-size: 16px
</style>
