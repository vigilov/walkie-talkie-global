<script setup lang="ts">
import EventCard from "~/components/EventCard.vue";

const {$user} = useNuxtApp()

const {Subscribe, Unsubscribe} = useEvents($user.value?.uid)
const search = ref<string>("")

let events = ref<Map<string, PublicEvent>>(new Map)

onMounted(() => {
  events = Subscribe()
})

onUnmounted(() => {
  Unsubscribe()
})

</script>

<template v-if="$user">
  <div class="events">

    <h1>My events</h1>

    <div class="events-filter">
      <input type="text" placeholder="Search" v-model="search">
    </div>

    <div class="events-grid grid grid-cols-3 gap-4">
      <template v-for="[id, evt] in events">
        <EventCard v-if="evt.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())" :id="id" :event="evt"/>
      </template>
    </div>

  </div>
</template>

<style scoped lang="sass">
</style>
