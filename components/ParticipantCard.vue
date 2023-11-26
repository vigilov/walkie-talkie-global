<script setup lang="ts">
const props = defineProps<{
  id: string
  eventID: string
  team?: Team
  name: string
  photoURL: string
  description: string
}>()

const {$user} = useNuxtApp()
const {LeaveTeam} = useEvent(props.eventID)
</script>

<template>
  <div class="card">
    <div class="remove" v-if="id == $user.uid" @click="LeaveTeam(team)">
      <Icon name="material-symbols:close"/>
    </div>
    <div class="photo">
      <img :src="photoURL" alt="Profile" class="rounded-full w-28 h-28 border"/>
    </div>

    <div class="title">
      {{ name }}
    </div>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<style scoped lang="sass">
.card
  @apply flex items-center flex-col justify-center shadow relative
  width: 248px
  height: 288px
  flex-shrink: 0
  border-radius: 10px
  background: #FFF

.title
  @apply m-2
  font-size: 16px
  font-weight: 500

.description
  color: var(--grey, #A9B0BC)
  text-align: center
  font-size: 14px
  font-style: normal

.remove
  @apply absolute top-2 right-3 text-gray-400 cursor-pointer
</style>
