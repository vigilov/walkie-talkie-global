<script setup lang="ts">

const {signIn} = await useAuth()

</script>

<template>
  <div @click="signIn">
    Sign IN by Google
  </div>
</template>

<style scoped>

</style>
