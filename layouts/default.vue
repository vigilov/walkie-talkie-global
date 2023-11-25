<script setup lang="ts">
import Header from "~/components/Header.vue";
</script>

<template>
  <ClientOnly>
    <div class="body">
      <Header/>
      <div>
        <NuxtPage/>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="sass" scoped>
.body
  @apply flex flex-col items-center

</style>
