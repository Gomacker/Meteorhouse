<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  size?: number
  soul: boolean
}>()

const size = computed(() => props.size || 240)
const frame_width = computed(() => (size.value * 14) / 240)
</script>

<template>
  <div style="display: inline-block; vertical-align: bottom">
    <svg
      style="display: block"
      :width="size"
      :height="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <image
          :href="'/static/worldflipper/ui/armament_frame.png'"
          id="frame"
          :height="sizeEE"
          :width="size"
          y="0"
          x="0"
        />
        <image
          :href="'/static/worldflipper/ui/unit_background.png'"
          id="background"
          :height="size - frame_width * 2"
          :width="size - frame_width * 2"
          :y="frame_width"
          :x="frame_width"
        />
      </g>
    </svg>
  </div>
</template>
