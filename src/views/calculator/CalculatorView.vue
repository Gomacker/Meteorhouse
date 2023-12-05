<script setup lang="ts">
import CalculatorPanel from '@/views/calculator/CalculatorPanel.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import type { WorldflipperObject } from '@/stores/worldflipper'
import { ref, watch } from 'vue'
import CalculatorModuleNotAvailable from '@/views/calculator/modules/CalculatorModuleNotAvailable.vue'
import CalculatorModuleWikiCard from '@/views/calculator/modules/CalculatorModuleWikiCard.vue'
import CalculatorModuleResource from '@/views/calculator/modules/CalculatorModuleResource.vue'
import CalculatorModuleParty from '@/views/calculator/modules/CalculatorModuleParty.vue'
import { partyEditor, PartyEditor, PartyPosition, PartyRelease } from "@/anise/worldflipper/party";
import { useDefer } from "@/utils";
import CalculatorModuleUpdate from "@/views/calculator/modules/CalculatorModuleUpdate.vue";

const worldflipper = useWorldflipperDataStore()

type EditorModule = 'Calculator' | 'WikiCard' | 'Editor' | 'Upload' | 'Resource'
const selected_module = ref<EditorModule>('Editor')

const memory_object = ref<WorldflipperObject>(undefined)
const panel_closed = ref<boolean>(false)
// const party_editor = reactive<PartyEditor>(new PartyEditor(PartyRelease.empty()))

const defer = useDefer(3)

watch(partyEditor, (value) => {
  if (value.selectedPosition && value.release)
    memory_object.value = value.release.party.get(value.selectedPosition) || memory_object.value
  else if (value.selectedObject) memory_object.value = value.selectedObject as WorldflipperObject
}, {deep: true})
</script>

<template>
  <div style="height: 100%; width: 100%; overflow-y: hidden">
    <div style="display: flex; flex-direction: column; height: 100%">
      <v-tabs v-if="defer(0)" v-model="selected_module" bg-color="blue-lighten-1" align-tabs="center">
        <v-tab value="Calculator">
          <v-icon icon="mdi-calculator" />
          计算
        </v-tab>
        <v-tab value="WikiCard">
          <v-icon icon="mdi-card-account-details" />
          资料
        </v-tab>
        <v-tab value="Editor">
          <v-icon icon="mdi-table-edit" />
          编队
        </v-tab>
        <v-tab value="Upload" @click="panel_closed = true">
          <v-icon icon="mdi-upload" />
          上传
        </v-tab>
        <v-tab value="Resources">
          <v-icon icon="mdi-package-variant-closed" />
          资源
        </v-tab>
      </v-tabs>
      <v-window :touch="false" style="height: 100%" v-model="selected_module">
        <v-window-item value="Calculator">
          <CalculatorModuleNotAvailable />
        </v-window-item>
        <v-window-item value="WikiCard" style="height: 100%">
          <CalculatorModuleWikiCard v-if="defer(3)" :obj="memory_object as WorldflipperObject" />
        </v-window-item>
        <v-window-item value="Editor" class="hidden-scroll" style="height: 100%">
          <CalculatorModuleParty
            v-if="defer(1)"
            :partyEditor="partyEditor as PartyEditor"
          />
        </v-window-item>
        <v-window-item value="Upload" style="height: 100%">
          <CalculatorModuleUpdate :partyEditor="partyEditor as PartyEditor" />
        </v-window-item>
        <v-window-item value="Resources" style="height: 100%">
          <CalculatorModuleResource v-if="defer(3)" :obj="memory_object as WorldflipperObject" />
        </v-window-item>
      </v-window>
    </div>
    <v-btn
      style="
        position: fixed;
        right: 16px;
        bottom: calc(50% + 16px);
        transition: bottom 0.4s ease;
        z-index: 11;
      "
      :style="panel_closed ? { bottom: '16px' } : {}"
      icon="mdi-grid"
      size="large"
      color="primary"
      rounded="50%"
      @click="panel_closed = !panel_closed"
    />
    <CalculatorPanel
      v-if="defer(2)"
      class="panel"
      :class="panel_closed ? ['closed'] : []"
      :characters="worldflipper.characters"
      :equipments="worldflipper.equipments"
      v-model="partyEditor"
    />
  </div>
</template>

<style scoped>
.panel {
  position: fixed;
  height: 50%;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 8px;
  z-index: 10;
  transition: height 0.4s ease, width 0.4s ease, padding 0.4s ease;
  border-radius: 16px 16px 0 0;
}
.panel.closed {
  height: 0;
  padding: 0 8px;
}
.hidden-scroll {
  overflow-y: scroll;
}
.hidden-scroll::-webkit-scrollbar {
  width: 0;
}
</style>
