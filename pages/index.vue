<script setup lang="ts">

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
      <div>01</div>
      <div>02</div>
      <div>03</div>
      <div>04</div>
      <div>05</div>
      <div>06</div>
    </div>

  </div>

</template>

<style lang="sass" scoped>

.events
  padding-top: 50px

  h1
    color: var(--black, #333)
    font-family: Corsa Grotesk, sans-serif
    font-size: 50px
    font-style: normal
    font-weight: 500
    line-height: normal

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
