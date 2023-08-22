<script setup lang="ts">
import {Character, Element} from "@/anise/worldflipper/object";
import { computed } from "vue";

const props = defineProps({
  obj: Character,
  size: {
    type: Number,
    default: 240,
    required: false
  },
  awakened: Boolean
})

const frame_width = computed(() => (props.size * 14) / 240)
const element_size = computed(() => (props.size * 44) / 240)
const background_size = computed(() => props.size - frame_width.value * 2)

const url = computed(() => `/static/${props.obj?.__type_id}/square212x/${props.awakened ? 'awakened' : 'base'}/${props.obj?.resource_id}.png`)

</script>

<template>
  <div
    v-if="obj instanceof Character"
    :title="`${obj.id} : ${obj.resource_id}`"
  >
    <svg
      style="display: block"
      :width="size"
      :height="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <image
          :href="'/static/worldflipper/ui/unit_background.png'"
          id="background"
          :height="background_size"
          :width="background_size"
          :y="frame_width"
          :x="frame_width"
        />
        <image
          v-if="obj.resource_id"
          :href="url"
          id="pic"
          :height="background_size"
          :width="background_size"
          :y="frame_width"
          :x="frame_width"
        />
        <image
          :href="'/static/worldflipper/ui/unit_frame.png'"
          id="frame"
          :height="size"
          :width="size"
          y="0"
          x="0"
        />
        <image
          :href="`/static/worldflipper/icon/${Element[obj.element]}.png`"
          id="element_icon"
          :height="element_size"
          :width="element_size"
          :y="frame_width"
          :x="size - frame_width - element_size"
        />
        <image
          v-if="obj.rarity"
          :href="`/static/worldflipper/ui/star_in_frame/star${obj.rarity}inf.png`"
          id="star"
          :height="size"
          :width="size"
          y="0"
          x="0"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>

</style>