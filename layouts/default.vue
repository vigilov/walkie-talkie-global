<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";

const {user, signOut} = useAuth()

</script>

<template>
  <div class="body">
    <div class="header">
      <div class="title flex-1">
        walkie-talkie
      </div>
      <div class="user">
      </div>
      <div class="create-event button primary">
        Create Event
      </div>
    </div>
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
      <NuxtPage/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.header
  @apply flex items-center justify-between
  width: 1440px
  height: 100px

.body
  @apply flex flex-col items-center

</style>
