<script setup lang="ts">
import EventCard from "~/components/EventCard.vue";

const {$user} = useNuxtApp()

const {Subscribe, Unsubscribe} = useEvents($user.value?.uid)

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
      <input type="text" placeholder="Search">
    </div>

    <div class="events-grid grid grid-cols-3 gap-4">
      <EventCard v-for="[id, evt] in events" :id="id" :event="evt"/>
    </div>

  </div>
</template>

<style scoped lang="sass">
</style>
