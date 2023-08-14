<script setup lang="ts">
import { Union } from '@/anise/worldflipper/party'
import type { WorldflipperObject } from '@/stores/worldflipper'
import { Character, Element } from '@/anise/worldflipper/object'
import { useWorldflipperDataStore } from "@/stores/worldflipper";

defineProps<{
  modelValue: Union
  selected_obj?: WorldflipperObject
  show_name?: boolean
  is_leader?: boolean
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="union">
    <div
      class="wfo-slot main"
      :class="[
        modelValue.main
          ? `ele-${Element[modelValue.main.element].toLowerCase()}`
          : undefined
      ]"
      @click="
        () => {
          const new_union = modelValue
          const l = Array.from(useWorldflipperDataStore().characters.values())
          const c = l[Math.floor(Math.random() * l.length)] as Character
          new_union.main = c
          $emit('update:modelValue', new_union)
        }
      "
    >
      <v-img :src="modelValue.main ? modelValue.main.res('square212x/base') : '/static/worldflipper/unit/blank.png'" />
      <div style="text-align: center">
        {{
          (() => {
            if (show_name) if (modelValue.main instanceof Character) return modelValue.main.names[0]
            return is_leader ? '队长' : '主要角色'
          })()
        }}
      </div>
    </div>
    <div class="wfo-slot armament">
      <v-img :src="'/static/worldflipper/unit/blank.png'" />
      <div style="text-align: center">装备</div>
    </div>
    <div
      class="wfo-slot unison"
      :class="[
        modelValue.unison
          ? `ele-${Element[modelValue.unison.element].toLowerCase()}`
          : undefined
      ]"
    >
      <v-img src="/static/worldflipper/unit/blank.png" />
      <div style="text-align: center">
        {{
          (() => {
            if (show_name)
              if (modelValue.unison instanceof Character) return modelValue.unison.names[0]
            return '辅助角色'
          })()
        }}
      </div>
    </div>
    <div class="wfo-slot core">
      <v-img src="/static/worldflipper/unit/blank.png" />
      <div style="text-align: center">魂珠</div>
    </div>
  </div>
</template>

<style scoped>
.union {
  width: 150px;
  height: 195px;
  margin: 5px;
  position: relative;
  //background-color: #0f0;
}

.union img {
  display: block;
}

.wfo {
  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 0 0 4px black;
  margin: 2px 0;
  width: 62px;
  cursor: pointer;
}

.ele-none::before {
  background-image: url('/static/worldflipper/icon/none.png');
}

.ele-fire::before {
  background-image: url('/static/worldflipper/icon/fire.png');
}

.ele-water::before {
  background-image: url('/static/worldflipper/icon/water.png');
}

.ele-thunder::before {
  background-image: url('/static/worldflipper/icon/thunder.png');
}

.ele-wind::before {
  background-image: url('/static/worldflipper/icon/wind.png');
}

.ele-light::before {
  background-image: url('/static/worldflipper/icon/light.png');
}

.ele-dark::before {
  background-image: url('/static/worldflipper/icon/dark.png');
}

.wfo-slot.main::before,
.wfo-slot.unison::before,
.wfo::before {
  content: '';
  background-size: 14px;
  background-position: 1px 1px;
  background-repeat: no-repeat;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -2px;
  right: -2px;
  border-radius: 2px;
  background-color: white;
  z-index: 10;
}

.wfo-slot {
  border: 3px solid white;
  border-radius: 3px;
  margin: 2px;
  height: 100%;
  position: absolute;
  background-color: white;
  box-shadow: rgba(9, 30, 66, 0.35) 0 1px 1px, rgba(9, 30, 66, 0.25) 0 0 1px 1px;
  //box-shadow: 0 0 2px black;
  /*cursor: pointer;*/
  cursor: auto;
}

.main {
  z-index: 3;
  width: 88px;
  height: 104px;
  left: 0;
  top: 0;
}

.main > img {
  width: 82px;
  height: 82px;
}

.armament {
  z-index: 5;
  width: 60px;
  height: 76px;
  top: 16px;
  right: 0;
}

.armament > img {
  width: 54px;
  height: 54px;
}

.unison {
  z-index: 2;
  width: 75px;
  height: 91px;
  bottom: 0;
  right: 0;
}

.unison > img {
  width: 69px;
  height: 69px;
}

.core {
  box-shadow: none;
  width: 60px;
  height: 76px;
  bottom: 3px;
  left: 5px;
}

.core > img {
  width: 54px;
  height: 54px;
}
</style>
