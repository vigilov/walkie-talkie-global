<script setup lang="ts">

interface SuggestionRequest {
  title: string,
  description: string,
  isSelected?: boolean
}

const props = defineProps<{
  suggestions: SuggestionRequest[],
  waiting: boolean,
  eventID: string,
}>()
const emit = defineEmits(['close'])

const isSaveActive = computed(() => {
  return props.suggestions.some(suggestion => suggestion.isSelected)
})

function save() {
  const filters = props.suggestions.filter(suggestion => suggestion.isSelected).map(suggestion => suggestion.title)
  navigateTo(`/events/${props.eventID}/services?filters=${filters.join(',')}`)
  emit('close')
}
</script>

<template>
  <div class="plan-container">
    <div class="hider"></div>
    <div class="plan-panel">
      <div class="close" @click="emit('close')">
        <Icon name="material-symbols:close"/>
      </div>
      <div class="title">
        Event plan
      </div>

      <div class="suggestions -m-4">
        <div class="waiting" v-if="waiting">
          <Icon name="material-symbols:hourglass-bottom"/>
          <div class="text">
            Waiting for response...
          </div>
        </div>
        <template v-else>
          <div class="suggestion p-4" v-for="suggestion in suggestions" :class="{'active': suggestion.isSelected}"
               @click="suggestion.isSelected = !suggestion.isSelected">
            <div class="suggestion-title">{{ suggestion.title }}</div>
            <div class="description">{{ suggestion.description }}</div>

          </div>
        </template>
      </div>
      <div class="button primary mt-8" :class="{'disabled': !isSaveActive}" @click="save">
        Save it and see suggestions
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.plan-container
  @apply fixed top-0 left-0 right-0 bottom-0 flex items-center justify-end
  .hider
    @apply fixed inset-0 bg-black opacity-50

  .plan-panel
    @apply fixed bg-white w-1/3 h-full opacity-100 p-8 flex flex-col shadow relative

.title
  @apply font-bold text-2xl mb-4
  font-size: 24px
  font-style: normal
  font-weight: 500

.suggestions
  @apply overflow-y-auto flex-1

  .suggestion
    @apply cursor-pointer
    &:hover
      @apply bg-gray-100

    &.active
      @apply bg-green-100

  .suggestion-title
    @apply font-bold text-xl mb-2
    font-size: 16px
    font-style: normal
    font-weight: 700

  .description
    @apply text-gray-500

.waiting
  @apply text-gray-600 flex items-center justify-center flex-col mt-10

.close
  @apply cursor-pointer absolute top-2 right-3 text-gray-400 text-xl

.button
  &.disabled
    @apply bg-gray-400
</style>
