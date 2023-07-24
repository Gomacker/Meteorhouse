<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 240,
    required: false
  },
  soul: Boolean
})
const frame_width = computed(() => (props.size * 14) / 240)
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
          :height="size"
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

<script lang="ts">
export default {
  name: 'EmptyPicOrigin'
}
</script>

<style scoped></style>
