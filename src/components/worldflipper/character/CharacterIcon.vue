<script setup lang="ts">
import { Character } from "@/anise/worldflipper/object";
import { computed } from "vue";
import { ele_id2ele } from "@/stores/manager";

const props = defineProps({
  character: Character,
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

const square212x = computed(() => `/static/worldflipper/unit/square212x/${props.awakened ? 'base' : 'awakened'}/${props.character?.resource_id}.png`)

</script>

<template>
  <div
    v-if="props.character instanceof Character"
    style="display: inline-block; vertical-align: bottom"
    :title="`${props.character.id} : ${props.character.resource_id}`"
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
          :height="background_size"
          :width="background_size"
          :y="frame_width"
          :x="frame_width"
        />
        <image
          v-if="props.character.resource_id"
          :href="square212x"
          id="unit_pic"
          :height="background_size"
          :width="background_size"
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
          :href="`/static/worldflipper/icon/${ele_id2ele[props.character.element]}.png`"
          id="element_icon"
          :height="element_size"
          :width="element_size"
          :y="frame_width"
          :x="props.size - frame_width - element_size"
        />
        <image
          v-if="props.character.rarity"
          :href="`/static/worldflipper/ui/star_in_frame/star${props.character.rarity}inf.png`"
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

<style scoped>

</style>