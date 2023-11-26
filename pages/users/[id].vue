<script setup lang="ts">

const {$user} = useNuxtApp()

</script>

<template>
  <div class="user-profile">
    <NuxtLink class="back" to="/">
      <Icon name="material-symbols:arrow-back-ios"/>
      Go back to all events
    </NuxtLink>

    <div class="user-info">
      <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        <li>
          <div class="flex items-center gap-x-6">
            <img class="h-16 w-16 rounded-full" :src="$user.photoURL" alt="" referrerpolicy="no-referrer">
            <div>
              <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">{{ $user.displayName }}</h3>
              <p class="text-sm font-semibold leading-6 text-indigo-600">{{ $user.email }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<style lang="sass" scoped>
.user-profile
  display: flex
  flex-direction: column
  align-items: center

.user-info
  display: flex
  flex-direction: column
  align-items: start
  align-self: start
  margin-top: 20px
</style>
