<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";

const {User, SignOut, SignIn} = useAuth()

</script>

<template>
  <div class="header">
    <div class="title flex-1">
      <NuxtLink to="/">walkie-talkie</NuxtLink>
    </div>
    <div class="user">
      <ClientOnly>
        <HeadlessMenu v-if="User" as="div" class="relative inline-block text-left">
          <HeadlessMenuButton as="div" class="profile">
            <span>{{ User.displayName }}</span>
            <img
                :src="<string>User.photoURL"
                alt="Profile"
                class="rounded-full w-10 h-10 border"
            />
          </HeadlessMenuButton>

          <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
          />

          <HeadlessMenuItems class="profile-items">
            <HeadlessMenuItems>
              <HeadlessMenuItem v-slot="{ active }">
                <a :class='{ "active": active }' class="group profile-item" href="/events/user">My
                  Events</a>
              </HeadlessMenuItem>
              <HeadlessMenuItem v-slot="{ active }">
                <a :class='{ "active": active }' class="group profile-item" href="/users/">Profile</a>
              </HeadlessMenuItem>
              <HeadlessMenuItem v-slot="{ active }">
                <a :class='{ "active": active }' class="group profile-item" @click="SignOut">Logout</a>
              </HeadlessMenuItem>
            </HeadlessMenuItems>
          </HeadlessMenuItems>
        </HeadlessMenu>
        <div v-else @click="SignIn" class="button second">Sign In</div>
      </ClientOnly>
    </div>
    <div class="create-event button primary">
      <NuxtLink to="/events/new">Create Event</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="sass">
.header
  @apply flex items-center justify-between
  width: 1440px
  height: 100px

.user
  padding-right: 24px

.profile
  @apply flex items-center
  @apply cursor-pointer
  gap: 12px
  text-align: center
  font-feature-settings: 'clig' off, 'liga' off
  font-family: Corsa Grotesk, sans-serif
  font-size: 16px
  font-style: normal
  font-weight: 400
  line-height: 20px


.profile-items
  @apply absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none

.profile-item
  @apply flex w-full items-center rounded-md
  display: flex
  width: 210px
  padding: 8px 20px
  align-items: center
  gap: 10px

  &.active
    background: #d18dd7

.title
  font-family: Affect, sans-serif
  font-size: 20px
  font-style: normal
  font-weight: 400
  line-height: normal

</style>
