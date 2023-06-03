<script lang="ts" setup>
import { Unit } from '@/stores/manager'

const props = defineProps({
  unit: Unit,
  size: {
    type: Number,
    default: 240,
    required: false
  },
  awakened: Boolean
})
const frame_width = (props.size * 14) / 240
const ele_size = (props.size * 44) / 240
</script>

<template>
  <div
    v-if="props.unit instanceof Unit"
    style="display: inline-block; vertical-align: bottom"
    :title="props.unit.anise_id + ': ' + props.unit.extraction_id + ': ' + props.unit.id"
  >
    <svg
      style="display: block"
      :width="props.size"
      :height="props.size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <image
          :href="'/static/worldflipper/ui/unit_background.png'"
          id="background"
          :height="props.size - frame_width * 2"
          :width="props.size - frame_width * 2"
          :y="frame_width"
          :x="frame_width"
        />
        <image
          v-if="props.unit.extraction_id"
          :href="props.unit.pic_url(awakened)"
          id="unit_pic"
          :height="props.size - frame_width * 2"
          :width="props.size - frame_width * 2"
          :y="frame_width"
          :x="frame_width"
        />
        <image
          :href="'/static/worldflipper/ui/unit_frame.png'"
          id="frame"
          :height="props.size"
          :width="props.size"
          y="0"
          x="0"
        />
        <image
          :href="`/static/worldflipper/icon/${props.unit.element}.png`"
          id="element_icon"
          :height="ele_size"
          :width="ele_size"
          :y="frame_width"
          :x="props.size - frame_width - ele_size"
        />
        <image
          v-if="props.unit.rarity"
          :href="'/static/worldflipper/ui/star_in_frame/star' + props.unit.rarity + 'inf.png'"
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
  name: 'UnitPicOrigin'
}
</script>

<style scoped></style>
