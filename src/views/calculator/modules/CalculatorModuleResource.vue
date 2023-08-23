<script setup lang="ts">
import type { WorldflipperObject } from '@/stores/worldflipper'
import { ele2color } from '@/stores/manager'
import { computed } from 'vue'
import { Character, Element, Equipment } from "@/anise/worldflipper/object";
import EquipmentWikiCard from '@/components/worldflipper/equipment/EquipmentWikiCard.vue'

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
  <div style="overflow-y: auto; height: 100%">
    <div
      style="display: flex; flex-direction: column; align-items: center; justify-content: center"
    >
      <div style="height: 24px" />

      <v-btn
        v-if="obj"
        color="primary"
        :href="
          obj instanceof Character
            ? `/card/character?wf_id=${obj.id}`
            : `/card/equipment?wf_id=${obj.id}`
        "
        target="_blank"
      >
        资料卡页
        <v-tooltip activator="parent">
          请使用playwright或任意网页截屏工具捕获
        </v-tooltip>
      </v-btn>
      <div
        v-if="obj instanceof Character"
        style="
          display: grid;
          grid-template-columns: repeat(2, 512px);
          grid-gap: 16px;
          justify-content: center;
          margin-top: 16px;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        "
      >
        <v-card class="resource-card">
          <v-toolbar density="compact" :color="color">
            <v-toolbar-title class="title__" :style="{ color: font_color }">
              觉醒前
            </v-toolbar-title>
          </v-toolbar>
          <v-img
            v-if="obj"
            style="height: calc(100% - 48px)"
            :src="`/static/${obj.__type_id}/full_resized/base/${obj.resource_id}.png`"
          />
        </v-card>
        <v-card class="resource-card">
          <v-toolbar density="compact" :color="color">
            <v-toolbar-title class="title__" :style="{ color: font_color }">
              觉醒后
            </v-toolbar-title>
          </v-toolbar>
          <v-img
            v-if="obj"
            style="height: calc(100% - 48px)"
            :src="`/static/${obj.__type_id}/full_resized/awakened/${obj.resource_id}.png`"
          />
        </v-card>
        <v-card class="resource-card">
          <v-toolbar density="compact" :color="color">
            <v-toolbar-title class="title__" :style="{ color: font_color }">
              SPECIAL
            </v-toolbar-title>
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
      <div v-else-if="obj instanceof Equipment"></div>
      <div v-else style="margin-top: 32px; font-size: 24px; color: grey">
        <v-icon icon="mdi-package-variant" />
        选择一个角色／装备
      </div>
    </div>
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
