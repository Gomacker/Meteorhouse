<script setup lang="ts">
import type { TableProfile } from "@/components/table/table";

defineProps<{
  tableProfile: TableProfile
}>()
</script>

<template>
  <v-card class="table-card elevation-4" @click="$router.push(`/table/${tableProfile.id}`)">
    <v-img
      style="min-height: 60px; height: 100%"
      @dragstart.prevent
      :aspect-ratio="16 / 9"
      :cover="true"
      :src="
              tableProfile.image
                ? tableProfile.image
                : '/static/worldflipper/st/banner/world_flipper-1609036650079981568-img1.png'
            "
    />
    <div
      style="
              text-align: center;
              margin-top: -24px;
              height: 24px;
              z-index: 1;
              background-color: rgba(255, 255, 255, 0.9);
              width: 100%;
            "
    >
      {{ tableProfile.name }}
    </div>
  </v-card>
</template>
<style scoped>
.table-card {
  user-select: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  max-width: 320px;
  transition: transform 0.4s ease;
}

.table-card:hover {
  transform: scale(1.05);
  z-index: 1;
}
</style>