<script setup lang="ts">

const {loadUser, signOut} = useAuth()

const {data: user} = await useAsyncData('user', () => loadUser()) as any

</script>

<template>
  <div>
    user: {{ user?.displayName }}
  </div>

  <div @click="signOut">
    sign out
  </div>

  <div>
    <p>Some default layout content shared across all pages</p>
    <NuxtPage/>
  </div>
</template>

<style scoped>

</style>
