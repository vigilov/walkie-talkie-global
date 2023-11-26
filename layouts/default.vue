<script setup lang="ts">
import Header from "~/components/Header.vue";
</script>

<template>
  <ClientOnly>
    <div class="body">

      <Header/>

      <div class="main">

        <NuxtPage/>

      </div>
    </div>

  </ClientOnly>
</template>

<style lang="sass" scoped>

.body
  @apply flex flex-col items-center

.main
  width: 1280px


</style>
