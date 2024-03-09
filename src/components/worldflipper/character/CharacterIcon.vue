<script setup lang="ts">
import { Character, Element } from '@/anise/worldflipper/object'
import { computed } from 'vue'

const props = defineProps<{
  obj: Character
  size?: number
  awakened?: boolean
  eager?: boolean
}>()

const size = computed(() => props.size || 240)
const frameWidth = computed(() => (size.value * 14) / 240)
const elementSize = computed(() => (size.value * 44) / 240)
const backgroundSize = computed(() => size.value - frameWidth.value * 2)

const url = computed(
  () =>
    `/static/${props.obj?.__type_id}/square212x/${props.awakened ? 'awakened' : 'base'}/${
      props.obj?.resource_id
    }.png`
)
</script>

<template>
  <div
    class="character-icon"
    :style="{
      '--frame-width': `${frameWidth}px`,
      '--element-size': `${elementSize}px`,
      '--element-x': `${size - frameWidth - elementSize}px`,
      '--element-pic': `url(/static/worldflipper/icon/${Element[obj.element]}.png)`,
      '--rarity-pic': `url(/static/worldflipper/ui/star_in_frame/star${obj.rarity}inf.png)`,

      '--size': `${size}px`
    }"
    :title="`${obj.id} : ${obj.resource_id}`"
  >
    <svg
      style="display: block; z-index: 1; position: absolute"
      :width="size"
      :height="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
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
          :height="elementSize"
          :width="elementSize"
          :y="frameWidth"
          :x="size - frameWidth - elementSize"
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

    <v-img :eager="eager" :width="backgroundSize" :height="backgroundSize" :src="url"></v-img>
  </div>
</template>

<style scoped>
.character-icon {
  display: block;
  z-index: 0;
}
.character-icon > .front-frame {
  background: url('/static/worldflipper/ui/unit_frame.png') no-repeat;
  background-size: var(--size);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}
.character-icon > .v-img {
  background: url('/static/worldflipper/ui/unit_background.png');
  background-size: 100%;
  margin: var(--frame-width);
}
.character-icon > .front-frame::before {
  content: '';
  position: absolute;
  width: var(--element-size);
  height: var(--element-size);
  top: var(--frame-width);
  left: var(--element-x);
  background: var(--element-pic);
  background-size: var(--element-size);
  z-index: 2;
}
.character-icon > .front-frame::after {
  content: '';
  position: absolute;
  width: var(--size);
  height: var(--size);
  top: 0;
  left: 0;
  background: var(--rarity-pic);
  background-size: var(--size);
  z-index: 2;
}
</style>
