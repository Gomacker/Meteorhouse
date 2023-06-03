<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import RoomCard from '@/components/card/RoomCard.vue'

interface RoomData {
  name: string
  room_number: string
  background_url: string
  image_url: string
}

const room_data = ref<RoomData | undefined>()

const route = useRoute()
console.log(route.query)
room_data.value = {
  name: String(route.query['name']),
  room_number: String(route.query['room_number']),
  background_url: String(route.query['background_url']),
  image_url: String(route.query['image_url'])
}
</script>
<template>
  <div>
    <RoomCard
      :quest_name="room_data['name']"
      :room_number="room_data['room_number']"
      :background_url="room_data['background_url']"
      :image_url="room_data['image_url']"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'RoomCardView'
}
</script>

<style scoped></style>
