<script setup lang="ts">
definePageMeta({
  layout: 'event'
})

const {id} = useRoute().params
const {filters} = useRoute().query
</script>

<template>
  <div>
    <div class="event-panel-menu">
      <div class="event-panel-menu-item disabled">
        <NuxtLink :to="`/events/${id}`">
          Teams & Participants
        </NuxtLink>
      </div>

      <div class="event-panel-menu-item">
        Available services
      </div>
    </div>

    <div>
      <div v-for="filter in filters?.split(',')">

        {{filter}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

</style>
