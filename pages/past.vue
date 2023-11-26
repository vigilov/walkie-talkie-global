<script setup lang="ts">
</script>

<template>

  <div class="events">

    <h1>Past events</h1>

    <div class="events-links">
      <NuxtLink as="a" to="/">Upcoming</NuxtLink>
      <NuxtLink as="a" to="/past" class="active">Past</NuxtLink>
    </div>

    <div class="events-filter">
      <input type="text" placeholder="Search">
    </div>

    <div class="pt-5">
      <span>No past events</span>
    </div>

  </div>

</template>

<style lang="sass" scoped>

.events
  padding-top: 50px

.events-links
  display: flex
  width: 1280px
  align-items: flex-start
  gap: 32px
  border-bottom: 1px solid rgba(169, 176, 188, 0.20)

  a
    display: flex
    padding: 20px 0px
    justify-content: center
    align-items: center
    gap: 10px

    &.active
      border-bottom: 3px solid var(--Main, #D244DE)

.events-grid
  padding-top: 30px
  width: 1280px

.events-filter
  padding-top: 30px
  padding-bottom: 30px
  width: 410px
  height: 48px

  input
    @apply w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0
    display: flex

    flex-direction: column
    align-items: flex-start
    gap: 5px
    flex: 1 0 0
    border-radius: 6px
    border: 1px solid var(--Stroke, #DFE4EA)
    background: var(--white-white, #FFF)

</style>