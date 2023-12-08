<script setup lang="ts">
import type { Manaboard2Values, PartyEditor } from '@/anise/worldflipper/party'
import { PartyParamManaboard2, PartyPosition } from '@/anise/worldflipper/party'
import type { Character } from '@/anise/worldflipper/object'
import { computed, ref } from 'vue'
import { ele2color } from '@/stores/manager'
import PartyExAEditorSelector from '@/views/calculator/modules/party/PartyExAEditorSelector.vue'
import PartyExBEditorSelector from '@/views/calculator/modules/party/PartyExBEditorSelector.vue'

const props = defineProps<{
  partyEditor: PartyEditor
  position: PartyPosition
}>()

const character = computed(
  () => props.partyEditor.release.party.get(props.position) as Character | undefined
)
const manaboardValues = computed(() => {
  const ppm2 = props.partyEditor.release.getParam('manaboard2')
  return ppm2 instanceof PartyParamManaboard2
    ? (ppm2.get(props.position) as Manaboard2Values)
    : { ability4: undefined, ability5: undefined, ability6: undefined }
})
function setManaboard(abilityIndex: 4 | 5 | 6, level: number) {
  let ppm2 = props.partyEditor.release.getParam('manaboard2')
  if (!(ppm2 instanceof PartyParamManaboard2)) {
    ppm2 = new PartyParamManaboard2()
  }
  const value = {
    ...manaboardValues.value,
    [`ability${abilityIndex}`]: level === -1 ? undefined : level
  }
  ;(ppm2 as PartyParamManaboard2).set(props.position, value)
  props.partyEditor.release.setParam(ppm2)
}

const exA = ref()
const exB = ref()
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
            display: flex;
            justify-content: space-evenly;
            padding: 0 16px;
            align-items: center;
            height: 72px;
          "
        >
          <v-menu location="bottom center">
            <template v-slot:activator="{ props }">
              <v-icon
                size="32px"
                icon="mdi-selection"
                v-bind='props'
              />
            </template>
            <PartyExAEditorSelector v-model='exA' />
          </v-menu>
          <v-menu location="bottom center">
            <template v-slot:activator="{ props }">
              <v-icon
                size="32px"
                icon="mdi-selection"
                v-bind='props'
              />
            </template>
            <PartyExBEditorSelector v-model='exB' />
          </v-menu>
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
