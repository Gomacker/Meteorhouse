<script setup lang="ts">

import type { WorldflipperObject } from "@/stores/worldflipper";

defineProps<{
  obj: WorldflipperObject
}>()
</script>

<template>
  <div>
    <v-card>
      {{ obj }}
      <v-img v-if="obj" :src="`/static/${obj.__type_id}/full/base/${obj.resource_id}.png`"/>
    </v-card>
  </div>
</template>

<style scoped>

</style>