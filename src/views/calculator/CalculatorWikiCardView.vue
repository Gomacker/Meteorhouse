<script setup lang="ts">
import { Armament, Unit } from "@/stores/manager";
import UnitWikiCard from "@/components/card/UnitWikiCard.vue";
import ArmamentWikiCard from "@/components/card/ArmamentWikiCard.vue";

defineProps<{
  obj: Unit | Armament | undefined
}>()
</script>

<template>

  <el-scrollbar view-style="height: 100%;">
    <div style="display: flex; min-height: 100%; width: 100%">
      <UnitWikiCard
        style="width: 100%; border-radius: 0"
        class="wiki-card"
        v-if="obj instanceof Unit"
        :unit="obj"
      />
      <ArmamentWikiCard
        style="width: 100%; border-radius: 0"
        class="wiki-card"
        v-else-if="obj instanceof Armament"
        :armament="obj"
      />
      <div style="text-align: center; width: 100%;" v-else>选择一个角色 / 装备</div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.wiki-card {
    zoom: 100%;
}
@media (max-width: 1080px) {
    .wiki-card {
        zoom: 75%;
    }
}
</style>
