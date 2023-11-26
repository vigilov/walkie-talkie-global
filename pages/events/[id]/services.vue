<script setup lang="ts">
import {useServices} from "~/composables/useServices";

definePageMeta({
  layout: 'event'
})

const {id} = useRoute().params
const {filters} = useRoute().query

const {Load} = useServices()

const servicesAreas = ref([])

onBeforeRouteUpdate((to, from, next) => {
  Load(to.query.filters as string[]).then(services => {
    if (to.query.filters) {
      console.log(to.query.filters,'filters')
      console.log(services,'services')
      servicesAreas.value = services.filter(service => to.query.filters?.includes(service.name))
    } else {
      servicesAreas.value = services
    }
    next()
  })
})

onMounted(async () => {
  Load(filters as string[]).then(services => {
    if (filters) {
      servicesAreas.value = services.filter(service => filters?.includes(service.name))
    } else {
      servicesAreas.value = services
    }
  })
})
</script>

<template>
  <div class="services-body">
    <div class="event-panel-menu">
      <div class="event-panel-menu-item disabled">
        <NuxtLink :to="`/events/${id}`">
          Teams & Participants
        </NuxtLink>
      </div>

      <div class="event-panel-menu-item">
        Available services
      </div>
    </div>

    <div class="services-areas">
      <div class="service-area" v-for="service in servicesAreas">
        <div class="title">
          {{ service.name }}
        </div>

        <div>
          <div class="flex flex-wrap gap-10 justify-start" v-for="serviceMap in service.services">
            <div v-for="service in serviceMap">
              <ServiceCard :name="service?.name" :description="service?.description"
                           :coverURL="service?.picture"/>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.services-body
  width: 1330px

.service-area
  @apply mt-10 mb-6
  .title
    @apply text-center mb-6
    font-size: 32px
    font-weight: 500
</style>
