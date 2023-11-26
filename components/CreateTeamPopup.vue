<script setup lang="ts">
const props = defineProps<{
  eventID: string
}>()

const teamName = ref<string>('')
const chatURL = ref<string>('')

const {CreateTeam} = useEvent(props.eventID)

async function createTeam() {
  if (!teamName.value) {
    alert('Team name is required')
    return
  }
  if (!chatURL.value) {
    alert('Chat url is required')
    return
  }

  // if (!chatURL.value.startsWith('https://t.me/')) {
  //   alert('Chat url must be a telegram chat')
  //   return
  // }

  await CreateTeam(teamName.value, chatURL.value)
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<template>
  <div class="create-team-container">
    <div class="create-team-panel">
      <div class="close" @click="emit('close')">
        <Icon name="material-symbols:close"/>
      </div>
      <div class="create-team-header">
        <div class="title">
          Create team
        </div>
      </div>
      <div class="create-team-body">
        <div class="input">
          <div class="label">
            Name
          </div>
          <input type="text" v-model="teamName"/>
        </div>
        <div class="input">
          <div class="label">
            Telegram url
          </div>
          <input type="text" v-model="chatURL"/>
        </div>
      </div>
      <div class="create-team-footer">
        <div class="button primary" @click="createTeam">Create team</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.create-team-container
  @apply fixed inset-0 flex items-center justify-center
  background: rgba(0, 0, 0, 0.5)
  z-index: 1000

  .create-team-panel
    @apply flex flex-col relative
    width: 600px
    background: #FFF
    border-radius: 10px
    padding: 24px

    .create-team-header
      @apply flex items-center justify-between
      color: var(--black, #333)
      font-size: 24px
      font-weight: 500

      .title
        @apply font-bold text-2xl

    .create-team-body
      @apply flex flex-col
      padding-top: 20px
      flex: 1

      .input
        @apply flex flex-col
        margin-bottom: 10px

        .label
          @apply mb-2
          font-size: 16px
          font-weight: 500

        input
          @apply border border-gray-300 rounded-md
          padding: 10px
          font-size: 16px
          font-weight: 500
          color: #333
          resize: none

          &:focus
            @apply outline-none
            border-color: var(--Main, #D244DE)

      .input:last-child
        @apply flex-1

    .create-team-footer
      @apply mt-4 mb-2

.close
  @apply cursor-pointer absolute top-2 right-3
  width: 20px
  height: 20px
  color: #DDD

</style>
