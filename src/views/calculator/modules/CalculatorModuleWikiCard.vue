<script setup lang="ts">
import { Character, Equipment } from '@/anise/worldflipper/object'
import CharacterWikiCard from "@/components/worldflipper/character/CharacterWikiCard.vue";
import EquipmentIcon from "@/components/worldflipper/equipment/EquipmentIcon.vue";
import { WorldflipperObject } from "@/stores/worldflipper";
import EquipmentWikiCard from "@/components/worldflipper/equipment/EquipmentWikiCard.vue";

defineProps<{
  obj: WorldflipperObject
}>()
</script>

<template>
  <div style="overflow-y: auto; height: 100%">
    <div style="display: flex; min-height: 100%; justify-content: center">
      <CharacterWikiCard
        class="wiki-card"
        v-if="obj instanceof Character"
        :obj="obj"
        style="width: 100%"
      />
      <EquipmentWikiCard
        class="wiki-card"
        v-else-if="obj instanceof Equipment"
        :obj="obj"
        style="width: 100%"
      />
      <div v-else style="margin-top: 32px; font-size: 24px; color: grey">
        <v-icon icon="mdi-package-variant" />
        选择一个角色／装备
      </div>
    </div>
  </div>
</template>

<style scoped>

.wiki-card {
  zoom: 100%;
}
@media (max-width: 960px) {
  .wiki-card {
    zoom: 80%;
  }
}

</style>
