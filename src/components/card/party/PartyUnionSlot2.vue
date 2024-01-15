<script setup lang="ts">
import type { PartyParams } from '@/anise/worldflipper/party2'
import { type Character, Element, type Equipment } from '@/anise/worldflipper/object'
import { exAAbilities, exBAbilities } from '@/anise/worldflipper/party'
import { computed } from 'vue'

defineProps<{
  equipment?: Equipment
  params: PartyParams
  unionIndex: 0 | 1 | 2
}>()
</script>

<template>
  <div class="union-slot union-equipment">
    <v-img
      :src="equipment ? equipment.res('normal') : '/static/worldflipper/unit/blank.png'"
      @dragstart.prevent
    />
    <div style="text-align: center; font-size: 13px">装备</div>
  </div>
</template>
<style scoped></style>
