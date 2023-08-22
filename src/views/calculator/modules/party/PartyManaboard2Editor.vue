<script setup lang="ts">
import type { PartyEditor } from "@/anise/worldflipper/party";
import { PartyPosition } from "@/anise/worldflipper/party";

const props = defineProps<{
  partyEditor: PartyEditor,
  position: PartyPosition
}>()
</script>

<template>
  <div>
    <div style="height: 24px; display: flex">
      <div style="margin-top: -8px; width: 32px">
        <img :src="party.party.union(2)?.main?.res('pixelart/walk_front', 'gif')" alt="" />
      </div>
      <div style="font-weight: bold; font-size: 18px">
        {{ party.party.union(2).main?.names[0] }}
      </div>
    </div>
    <div>能力4</div>
    <div>能力5</div>
    <div>能力6</div>
  </div>
</template>

<style scoped>

</style>