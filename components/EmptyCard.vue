<script setup lang="ts">
const props = defineProps<{
}>()
</script>

<template>
  <div class="card">
    <div class="photo">
      <Icon name="material-symbols:person-add-outline" class="add-icon"/>
    </div>

    <div class="description">
      Waiting participant...
    </div>
  </div>
</template>

<style scoped lang="sass">
.card
  @apply flex items-center flex-col justify-center border border-dashed
  width: 248px
  height: 288px
  flex-shrink: 0
  border-radius: 10px
  background: rgba(255, 255, 255, 0.40)

.description
  @apply m-4
  color: var(--grey, #A9B0BC)
  text-align: center
  font-size: 14px
  font-style: normal

.photo
  @apply flex items-center justify-center w-20 h-20 rounded-full cursor-pointer
  background: var(--grey, #fff)

.add-icon
  @apply w-6 h-6
  color: var(--Main, #D244DE)
</style>
