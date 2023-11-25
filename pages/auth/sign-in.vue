<script setup lang="ts">

const {redirect} = useRoute().query

const {SignIn} = useAuth()

async function signIn() {
  await SignIn()

  navigateTo(redirect ? redirect as string : '/')
}

</script>

<template>
  <div @click="signIn">
    Sign IN by Google
  </div>
</template>

<style scoped>

</style>
