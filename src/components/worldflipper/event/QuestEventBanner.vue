<script setup lang="ts">
import { useRouter } from 'vue-router'

export interface QuestEvent {
  id: string
  table_id: string
}

defineProps<{ event: QuestEvent }>()
</script>

<template>
  <v-img
    v-ripple
    style="border-radius: 15px; cursor: pointer"
    @dragstart.prevent
    :src="`/static/worldflipper/banner/${event.id}.png`"
    @click="
      () => {
        if (event.table_id) $router.push(`/table/${event.table_id}`)
      }
    "
  />
</template>

<style scoped></style>
