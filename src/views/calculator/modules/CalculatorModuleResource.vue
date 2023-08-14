<script setup lang="ts">
import type { WorldflipperObject } from '@/stores/worldflipper'
import { ele2color } from '@/stores/manager'
import { computed } from 'vue'
import { Element } from '@/anise/worldflipper/object'

const props = defineProps<{
  obj?: WorldflipperObject
}>()
const color = computed(() =>
  props.obj ? ele2color[props.obj?.element].alpha(0.8).hex() : ele2color[-1].hex()
)
const font_color = computed(() =>
  props.obj?.element === Element.Light ? 'rgb(136,136,136)' : 'white'
)
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(2, 512px);
      grid-gap: 16px;
      align-content: center;
      justify-content: center;
      justify-items: center;
      width: 100%;
      height: 100%;
    "
  >
    <v-card class="resource-card">
      <v-toolbar density="compact" :color="color">
        <v-toolbar-title class="title__" :style="{ color: font_color }"> 觉醒前 </v-toolbar-title>
        <v-toolbar-items style="color: white">
          <v-btn icon="mdi-copliad" />
        </v-toolbar-items>
      </v-toolbar>
      <v-img
        v-if="obj"
        style="height: calc(100% - 48px)"
        :src="`/static/${obj.__type_id}/full_resized/base/${obj.resource_id}.png`"
      />
    </v-card>
    <v-card class="resource-card">
      <v-toolbar density="compact" :color="color">
        <v-toolbar-title class="title__" :style="{ color: font_color }"> 觉醒后 </v-toolbar-title>
      </v-toolbar>
      <v-img
        v-if="obj"
        style="height: calc(100% - 48px)"
        :src="`/static/${obj.__type_id}/full_resized/awakened/${obj.resource_id}.png`"
      />
    </v-card>
    <v-card class="resource-card">
      <v-toolbar density="compact" :color="color">
        <v-toolbar-title class="title__" :style="{ color: font_color }"> SPECIAL </v-toolbar-title>
      </v-toolbar>
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 100%;
          height: calc(100% - 48px);
          align-items: center;
          justify-content: center;
        "
      >
        <img
          v-if="obj"
          style="image-rendering: pixelated; scale: 2"
          :src="`/static/${obj.__type_id}/pixelart/special/${obj.resource_id}.gif`"
          alt=""
        />
      </div>
    </v-card>
    <v-card class="resource-card">
      <v-toolbar density="compact" :color="color">
        <v-toolbar-title class="title__" :style="{ color: font_color }"> WALK </v-toolbar-title>
      </v-toolbar>
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 100%;
          height: calc(100% - 48px);
          align-items: center;
          justify-content: center;
        "
      >
        <img
          v-if="obj"
          style="image-rendering: pixelated; scale: 2"
          :src="`/static/${obj.__type_id}/pixelart/walk_front/${obj.resource_id}.gif`"
          alt=""
        />
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.title__ {
  color: white;
  font-weight: bolder;
  font-size: 22px;
  font-family: '黑体', sans-serif;
}
.v-toolbar {
  transition: background-color 0.2s ease;
}
.resource-card {
  width: 512px;
  height: 512px;
  border-radius: 8px;
}
</style>
