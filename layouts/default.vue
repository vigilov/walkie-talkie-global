<script setup lang="ts">

const {loadUser} = useAuth()

const {data: user} = await useAsyncData('user', () => loadUser()) as any

</script>

<template>
  <div>
    user: {{ user?.displayName }}
  </div>

  <div>
    <p>Some default layout content shared across all pages</p>
    <NuxtPage/>
  </div>
</template>

<style scoped>

</style>
