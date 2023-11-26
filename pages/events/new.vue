<script setup lang="ts">

import {useEvents} from "~/composables/useEvents";

const {Create, UploadCover} = useEvents("")

const {$user} = useNuxtApp()

const eventCoverURL = ref<File>()
const eventCoverURLPreview = ref<string>()

const eventName = ref<string>("Hackadtech")

const eventDate = ref<Date>(new Date())
const eventDateFormatted = ref<string>(eventDate.value.toISOString().slice(0, 16))

const eventLocation = ref<string>("Limassol, Parklane Hotel")
const eventChannel = ref<string>("")
const eventParticipants = ref<number>(100)
const eventParticipantsUnlimited = ref<boolean>(false)
const eventTeams = ref<number>(5)
const eventTeamUnlimited = ref<boolean>(false)

const isCreating = ref<boolean>(false)

async function createEvent() {

  isCreating.value = true

  if (eventParticipantsUnlimited.value) eventParticipants.value = 0
  if (eventTeamUnlimited.value) eventTeams.value = 0

  let coverURL = ""
  if (eventCoverURL.value) {
    coverURL = await UploadCover(eventCoverURL.value)
  }

  console.log("cover:", coverURL)

  const event = <PublicEvent>(
      {
        name: eventName.value,
        description: "",
        startedAt: eventDateFormatted.value,
        publishedAt: new Date(0),
        createdAt: new Date(),
        location: eventLocation.value,
        channelURL: eventChannel.value,
        coverURL: coverURL,
        chatURL: "",
        createdBy: $user.value?.uid ?? "unknown",
        endedAt: new Date(0),
        maxTeamSize: eventTeams.value,
        maxParticipants: eventParticipants.value,
        participationFee: 0,
        conditionsOfParticipation: "",
        participants: [],
        teams: [],
      }
  )

  const id = await Create(event)

  const {$eventID} = useNuxtApp()
  $eventID.value = id

  await navigateTo(`/events/${id}`)
}

function eventCoverURLChanged(f: File) {
  if (f) {
    eventCoverURL.value = f
    eventCoverURLPreview.value = URL.createObjectURL(eventCoverURL.value)
  }

  console.log("eventCoverURLChanged", eventCoverURL.value)
}


</script>

<template>

  <div class="event-create">

    <NuxtLink class="back" to="/">
      <Icon name="material-symbols:arrow-back-ios"/>
      Go back to all events
    </NuxtLink>

    <h1 class="py-3">Create event</h1>

    <form class="form-event-create" @submit.prevent="createEvent">

      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">

          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">Cover
                photo</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">

                  <img v-if="eventCoverURLPreview" :src="eventCoverURLPreview" alt="Cover photo"
                       class="cover-img"/>
                  <icon v-else name="material-symbols:add-photo-alternate-outline-sharp"
                        class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>

                  <div class="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                    <label for="event-cover-photo"
                           class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input v-on:change="eventCoverURLChanged($event.target.files[0])" id="event-cover-photo"
                             name="event-cover-photo" type="file" class="sr-only"/>
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label for="event-name" class="block text-sm font-medium leading-6 text-gray-900">Event name</label>
              <div class="mt-2">
                <input v-model="eventName" type="text" name="event-name" id="event-name" autocomplete="event-name"
                       required
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div class="col-span-full">
              <label for="event-datetime" class="block text-sm font-medium leading-6 text-gray-900">Date and
                time</label>
              <div class="mt-2">
                <input v-model="eventDateFormatted" type="datetime-local" name="event-datetime" id="event-datetime"
                       autocomplete="event-datetime"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div class="col-span-full">
              <label for="event-location" class="block text-sm font-medium leading-6 text-gray-900">Location</label>
              <div class="mt-2">
                <input v-model="eventLocation" type="text" name="event-location" id="event-location"
                       required
                       autocomplete="event-location"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div class="col-span-full">
              <label for="event-channel" class="block text-sm font-medium leading-6 text-gray-900">Event
                channel</label>
              <div class="mt-2">
                <input v-model="eventChannel" type="text" name="event-channel" id="event-channel"
                       autocomplete="event-channel"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
          </div>

        </div>

        <div class="pb-12">

          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
              <label for="event-participants" class="block text-sm font-medium leading-6 text-gray-900">Number or
                participants</label>
              <div class="mt-2">
                <input v-model="eventParticipants" type="number" name="event-participants" id="event-participants"
                       :disabled="eventParticipantsUnlimited"
                       autocomplete="event-participants"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
              <div class="relative flex gap-x-3 pt-2">
                <div class="flex h-6 items-center">
                  <input v-model="eventParticipantsUnlimited" id="event-participants-unlimited"
                         name="event-participants-unlimited" type="checkbox"
                         class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="event-participants-unlimited" class="font-medium text-gray-900">Unlimited
                    participants</label>
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label for="event-max-teams" class="block text-sm font-medium leading-6 text-gray-900">Max team
                participants</label>
              <div class="mt-2">
                <input v-model="eventTeams" type="text" name="event-max-teams" id="event-max-teams"
                       :disabled="eventTeamUnlimited"
                       autocomplete="event-max-teams"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
              <div class="relative flex gap-x-3 pt-2">
                <div class="flex h-6 items-center">
                  <input v-model="eventTeamUnlimited" id="event-max-teams-unlimited" name="event-max-teams-unlimited"
                         type="checkbox"
                         class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="event-max-teams-unlimited" class="font-medium text-gray-900">No teams</label>
                </div>
              </div>
            </div>


          </div>
        </div>

      </div>

      <div class="mt-6">
        <button type="submit" class="button primary w-full" :disabled="isCreating">
          Create event
        </button>
      </div>

    </form>
  </div>
</template>

<style lang="sass" scoped>
.event-create
  display: flex
  flex-direction: column
  align-items: center

.form-event-create
  margin: auto
  background: #FFFFFF
  width: 803px
  padding: 24px

.button
  &:disabled
    background: gray
    cursor: not-allowed

input
  padding-left: 10px

.cover-img
  width: 448px
  height: 235px
  object-fit: cover

</style>
