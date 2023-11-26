<script setup lang="ts">
import EventCard from "~/components/EventCard.vue";

let events = ref<Map<string, PublicEvent>>(new Map)

const {Subscribe, Unsubscribe} = useEvents("")

onMounted(() => {
  events = Subscribe()
})

onUnmounted(() => {
  Unsubscribe()
})

</script>

<template>

  <div class="events">

    <h1>All events</h1>

    <div class="events-links">
      <NuxtLink as="a" to="/" class="active">Upcoming</NuxtLink>
      <NuxtLink as="a" to="/past">Past</NuxtLink>
    </div>

    <div class="events-filter">
      <input type="text" placeholder="Search">
    </div>

    <div class="events-grid grid grid-cols-3 gap-4">
      <EventCard v-for="[id, evt] in events" :id="id" :event="evt"/>
    </div>

  </div>

</template>

<style lang="sass" scoped>


</style>
