<script setup lang="ts">
import type { Manaboard2Values, PartyEditor } from '@/anise/worldflipper/party'
import { PartyParamManaboard2, PartyPosition } from '@/anise/worldflipper/party'
import type { Character } from '@/anise/worldflipper/object'
import { computed } from 'vue'
import { ele2color } from '@/stores/manager'

const props = defineProps<{
  partyEditor: PartyEditor
  position: PartyPosition
}>()

const character = computed(
  () => props.partyEditor.party.party.get(props.position) as Character | undefined
)
const manaboardValues = computed(() => {
  const ppm2 = props.partyEditor.party.getParam('manaboard2')
  return ppm2 instanceof PartyParamManaboard2
    ? (ppm2.get(props.position) as Manaboard2Values)
    : { ability4: undefined, ability5: undefined, ability6: undefined }
})
function setManaboard(abilityIndex: 4 | 5 | 6, level: number) {
  let ppm2 = props.partyEditor.party.getParam('manaboard2')
  if (!(ppm2 instanceof PartyParamManaboard2)) {
    ppm2 = new PartyParamManaboard2()
  }
  const value = {
    ...manaboardValues.value,
    [`ability${abilityIndex}`]: level === -1 ? undefined : level
  }
  ;(ppm2 as PartyParamManaboard2).set(props.position, value)
  props.partyEditor.party.setParam(ppm2)
}
</script>

<template>
  <template v-if="character">
    <div style="padding: 2px; user-select: none">
      <div
        style="height: 100%; border-radius: 8px; padding: 2px 4px"
        :style="{background: ele2color[(character as Character).element].alpha(0.6)}"
      >
        <div style="height: 24px; display: flex">
          <div style="margin-top: -12px; width: 30px">
            <img @dragstart.prevent :src="character.res('pixelart/walk_front', 'gif')" alt="" />
          </div>
          <div style="font-weight: bold; font-size: 17px">
            {{ character.names[0] }}
          </div>
        </div>
        <div
          style="
            filter: drop-shadow(0 0 4px rgba(0 0 0/0.5));
            display: grid;
            grid-template-rows: repeat(3, 24px);
          "
        >
          <div style="display: flex; align-items: center">
            <span class="manaboard2-editor-ability-text">4</span>
            <v-slider
              :model-value="manaboardValues.ability4 ?? -1"
              @update:model-value="(v) => setManaboard(4, v)"
              step="1"
              min="-1"
              max="5"
              show-ticks="always"
              hide-details
              style="margin: 0 12px"
              density="compact"
              thumb-size="12px"
            />
          </div>
          <div style="display: flex; align-items: center">
            <span class="manaboard2-editor-ability-text">5</span>
            <v-slider
              :model-value="manaboardValues.ability5 ?? -1"
              @update:model-value="(v) => setManaboard(5, v)"
              step="1"
              min="-1"
              max="5"
              show-ticks="always"
              hide-details
              style="margin: 0 12px"
              density="compact"
              thumb-size="12px"
            />
          </div>
          <div style="display: flex; align-items: center">
            <span class="manaboard2-editor-ability-text">6</span>
            <v-slider
              :model-value="manaboardValues.ability6 ?? -1"
              @update:model-value="(v) => setManaboard(6, v)"
              step="1"
              min="-1"
              max="5"
              show-ticks="always"
              hide-details
              style="margin: 0 12px"
              density="compact"
              thumb-size="12px"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div
      style="
        display: flex;
        font-size: 42px;
        font-weight: bold;
        color: grey;
        justify-content: center;
        align-items: center;
        user-select: none;
      "
    >
      ×
    </div>
  </template>
</template>

<style scoped>
.manaboard2-editor-ability-text {
  color: white;
  text-align: center;
  width: 21px;
  height: 21px;
  font-size: 15px;
  background: radial-gradient(rgb(47, 195, 183) 60%, transparent 65%);
}
</style>
