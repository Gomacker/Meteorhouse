<script setup lang="ts">
import { PartyEditor, PartyPosition, Union } from '@/anise/worldflipper/party'
import { Element } from '@/anise/worldflipper/object'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: Union
  show_name?: boolean
  show_awaken?: boolean
  union_index: number
  party_editor?: PartyEditor
  eager?: boolean
}>()
const mainName = computed(() => {
  if (props.show_name && props.modelValue.main) return props.modelValue.main?.names[0]
  return props.union_index === 1 ? '队长' : '主要角色'
})
const unisonName = computed(() => {
  if (props.show_name && props.modelValue.unison) return props.modelValue.unison.names[0]
  return '辅助角色'
})
</script>

<template>
  <div class="union">
    <div
      v-ripple="!!party_editor"
      class="wfo-slot party-slot-main"
      :class="[
        modelValue.main ? `ele-${Element[modelValue.main.element].toLowerCase()}` : undefined,
        party_editor?.verifyPosition(new PartyPosition(union_index, 0)) ? 'selected' : undefined
      ]"
      @click="party_editor?.select(new PartyPosition(union_index, 0))"
    >
      <v-img
        :src="
          modelValue.main?.res(show_awaken ? 'square212x/awakened' : 'square212x/base') ||
          '/static/worldflipper/unit/blank.png'
        "
        :eager="eager || false"
        @dragstart.prevent
      />
      <div
        v-if="
          (() => {
            return true
            // const ppm: PartyParam = props.party?._params.get('manaboard2')
            // return ppm instanceof PartyParamManaboard2 ? !ppm[`union${union}main`].is_empty() : false
          })()
        "
        class="party-card-manaboard2-wrapper"
      >
        <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
          {{
            (() => {
              return '-'
              // const m =
              //   props.party._params.get('manaboard2')[`union${union}main`][`manaboard${i + 3}`]
              // return typeof m === 'number' ? m : '-'
            })()
          }}
        </div>
      </div>
      <div style="text-align: center">
        {{ mainName }}
      </div>
    </div>
    <div
      v-ripple="!!party_editor"
      class="wfo-slot party-slot-equipment"
      :class="[
        party_editor?.verifyPosition(new PartyPosition(union_index, 2)) ? 'selected' : undefined
      ]"
      @click="party_editor?.select(new PartyPosition(union_index, 2))"
    >
      <v-img
        :src="modelValue.equipment?.res('normal') || '/static/worldflipper/unit/blank.png'"
        :eager="eager || false"
        @dragstart.prevent
      />
      <div style="text-align: center">装备</div>
    </div>
    <div
      v-ripple="!!party_editor"
      class="wfo-slot party-slot-unison"
      :class="[
        modelValue.unison ? `ele-${Element[modelValue.unison.element].toLowerCase()}` : undefined,
        party_editor?.verifyPosition(new PartyPosition(union_index, 1)) ? 'selected' : undefined
      ]"
      @click="party_editor?.select(new PartyPosition(union_index, 1))"
    >
      <v-img
        :src="
          modelValue.unison?.res(show_awaken ? 'square212x/awakened' : 'square212x/base') ||
          '/static/worldflipper/unit/blank.png'
        "
        :eager="eager || false"
        @dragstart.prevent
      />
      <div
        style="
          position: absolute;
          display: flex;
          background-color: rgba(0, 0, 0, 0.55);
          color: white;
          left: 0;
          bottom: 16px;
          border-top-right-radius: 6px;
        "
        v-if="
          (() => {
            return true
            // const ppm: PartyParam = props.party?._params.get('manaboard2')
            // return ppm instanceof PartyParamManaboard2 ? !ppm[`union${union}unison`].is_empty() : false
          })()
        "
      >
        <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
          {{
            (() => {
              return '-'
              // const m =
              //   props.party._params.get('manaboard2')[`union${union}unison`][
              //     `manaboard${i + 3}`
              //     ]
              // return typeof m === 'number' ? m : '-'
            })()
          }}
        </div>
      </div>
      <div style="text-align: center">
        {{ unisonName }}
      </div>
    </div>
    <div
      v-ripple="!!party_editor"
      class="wfo-slot core"
      :class="[
        party_editor?.verifyPosition(new PartyPosition(union_index, 3)) ? 'selected' : undefined
      ]"
      @click="party_editor?.select(new PartyPosition(union_index, 3))"
    >
      <v-img
        :src="modelValue.core?.res('soul') || '/static/worldflipper/unit/blank.png'"
        :eager="eager || false"
        @dragstart.prevent
      />
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

.wfo-slot.party-slot-main::before,
.wfo-slot.party-slot-unison::before,
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
  transition: border 0.3s ease;
}

.wfo-slot.selected {
  border: rgb(var(--v-theme-primary)) 3px solid;
}

.party-slot-main {
  z-index: 3;
  width: 88px;
  height: 104px;
  left: 0;
  top: 0;
}

.party-slot-main > img {
  width: 82px;
  height: 82px;
}

.party-slot-equipment {
  z-index: 5;
  width: 60px;
  height: 76px;
  top: 16px;
  right: 0;
}

.party-slot-equipment > img {
  width: 54px;
  height: 54px;
}

.party-slot-unison {
  z-index: 2;
  width: 75px;
  height: 91px;
  bottom: 0;
  right: 0;
}

.party-slot-unison > img {
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

.party-card-manaboard2-wrapper {
  position: absolute;
  display: flex;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  left: 0;
  bottom: 16px;
  border-top-right-radius: 6px;
}
</style>
