<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";

const {user, signOut} = useAuth()

</script>

<template>
  <div>
    Loading
  </div>
  <ClientOnly>
    <div>
      user: {{ user?.displayName }}
    </div>
  </ClientOnly>

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
