<script setup lang="ts">
import { Armament } from '@/stores/manager'

// let width = 240;
// let height = 240;
const props = defineProps({
  armament: Armament,
  size: {
    type: Number,
    default: 240,
    required: false
  },
  soul: Boolean
})
const frame_width = (props.size * 14) / 240
</script>

<template>
  <div
    v-if="props.armament instanceof Armament"
    style="display: inline-block; vertical-align: bottom"
    :title="`${props.armament.id}: ${props.armament.anise_id}: ${props.armament.extraction_id}`"
  >
    <svg
      style="display: block"
      :width="props.size"
      :height="props.size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <image
          v-if="props.armament.extraction_id"
          :href="props.armament.pic_url(false)"
          id="armament_pic"
          style="image-rendering: pixelated"
          :height="props.size - frame_width * 2"
          :width="props.size - frame_width * 2"
          :y="frame_width"
          :x="frame_width"
        />
        <image
          :href="'/static/worldflipper/ui/armament_frame.png'"
          id="frame"
          :height="props.size"
          :width="props.size"
          y="0"
          x="0"
        />
        <image
          v-if="props.armament.rarity"
          :href="`/static/worldflipper/ui/star_in_frame/star${props.armament.rarity}inf.png`"
          id="element_icon"
          :height="props.size"
          :width="props.size"
          y="0"
          x="0"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArmamentPicOrigin'
}
</script>

<style scoped></style>
