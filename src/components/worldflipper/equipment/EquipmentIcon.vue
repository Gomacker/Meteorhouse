<script setup lang="ts">
import {Equipment, Element} from "@/anise/worldflipper/object";
import { computed } from "vue";

const props = defineProps({
  equipment: Equipment,
  size: {
    type: Number,
    default: 240,
    required: false
  },
  awakened: Boolean
})

const frame_width = computed(() => (props.size * 14) / 240)
// const element_size = computed(() => (props.size * 44) / 240)
const background_size = computed(() => props.size - frame_width.value * 2)

const url = computed(() => `/static/${props.equipment?.__type_id}/${props.equipment?.resource_id}.png`)

</script>

<template>
  <div
      v-if="props.equipment instanceof Equipment"
      style="display: inline-block; width: fit-content; vertical-align: bottom"
      :title="`${props.equipment.id}: ${props.equipment.resource_id}`"
  >
    <svg
        style="display: block"
        :width="props.size"
        :height="props.size"
        xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <image
            v-if="props.equipment.resource_id"
            :href="url"
            id="pic"
            style="image-rendering: pixelated"
            :height="background_size"
            :width="background_size"
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
            v-if="props.equipment.rarity"
            :href="`/static/worldflipper/ui/star_in_frame/star${props.equipment.rarity}inf.png`"
            id="star"
            :height="props.size"
            :width="props.size"
            y="0"
            x="0"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>

</style>