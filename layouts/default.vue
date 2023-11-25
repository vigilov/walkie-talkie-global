<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";

const {user, signOut} = useAuth()

</script>

<template>
  <div class="body">
    <div class="header">
      <div class="title flex-1">
        <NuxtLink to="/">walkie-talkie</NuxtLink>
      </div>
      <div class="user">
        <ClientOnly>
          <NuxtLink v-if="user" to="/profile" class="profile">
            <div class="displayName">{{ user.displayName }}</div>
            <img
                :src="<string>user.photoURL"
                alt="Profile"
                class="rounded-full w-10 h-10 border"
            />
          </NuxtLink>
          <NuxtLink v-else to="/auth/sign-in" class="button second">Sign In</NuxtLink>
        </ClientOnly>
      </div>
      <div class="create-event button primary">
        Create Event
      </div>
    </div>


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

.user
  padding-right: 24px

  .profile
    @apply flex items-center
    gap: 12px

.title
  font-weight: bold

</style>
