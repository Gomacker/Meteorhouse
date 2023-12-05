<script setup lang="ts">

// let width = 240;
// let height = 240;
const props = defineProps({
  size: {
    type: Number,
    default: 240,
    required: false
  },
  soul: Boolean
})
const frame_width = (props.size * 14) / 240
// const ele_size = width * 44 / 240
</script>

<template>
  <div
    style="display: inline-block; vertical-align: bottom"
  >
    <svg
      style="display: block"
      :width="props.size"
      :height="props.size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <image
          :href="'/static/worldflipper/ui/armament_frame.png'"
          id="frame"
          :height="props.size"
          :width="props.size"
          y="0"
          x="0"
        />
        <image
          :href="'/static/worldflipper/ui/unit_background.png'"
          id="background"
          :height="props.size - frame_width * 2"
          :width="props.size - frame_width * 2"
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
