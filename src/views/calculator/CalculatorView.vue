<script setup lang="ts">
import CalculatorPanel from '@/views/calculator/CalculatorPanel.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import type { WorldflipperObject } from '@/stores/worldflipper'
import { reactive, ref, watch } from 'vue'
import CalculatorModuleNotAvailable from '@/views/calculator/modules/CalculatorModuleNotAvailable.vue'
import CalculatorModuleWikiCard from '@/views/calculator/modules/CalculatorModuleWikiCard.vue'
import CalculatorModuleResource from '@/views/calculator/modules/CalculatorModuleResource.vue'
import CalculatorModuleParty from '@/views/calculator/modules/CalculatorModuleParty.vue'
import { Party, PartyEditor, PartyPosition, PartyRelease } from '@/anise/worldflipper/party'

const worldflipper = useWorldflipperDataStore()

type EditorModule = 'Calculator' | 'WikiCard' | 'Editor' | 'Upload' | 'Resource'
const selected_module = ref<EditorModule>('Editor')

const memory_object = ref<WorldflipperObject>(undefined)

const panel_closed = ref<boolean>(false)

const party = PartyRelease.load({
  party: {
    union1: [121003, 223013, 5020024, 4050019],
    union2: [121007, 111021, 5090020, 5090020],
    union3: [121004, 331011, 5060025, 5090020]
  },
  params: {}
})

const party_editor = reactive<PartyEditor>(new PartyEditor(party))

watch(party_editor, (value) => {
  if (value.selected_object instanceof PartyPosition && party)
    memory_object.value = value.selected_object.get(party.party)
  else if (value.selected_object) memory_object.value = value.selected_object as WorldflipperObject
})
</script>

<template>
  <div style="height: 100%; width: 100%; overflow-y: hidden">
    <div style="display: flex; flex-direction: column; height: 100%">
      <v-tabs v-model="selected_module" bg-color="blue-lighten-1" align-tabs="center">
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
      <v-window style="height: 100%" v-model="selected_module">
        <v-window-item value="Calculator">
          <CalculatorModuleNotAvailable />
        </v-window-item>
        <v-window-item value="WikiCard" style="height: 100%">
          <CalculatorModuleWikiCard :obj="memory_object" />
        </v-window-item>
        <v-window-item value="Editor">
          <CalculatorModuleParty
            :party="party_editor.party as PartyRelease || PartyRelease.empty()"
            :party_editor="party_editor instanceof PartyEditor ? party_editor : undefined"
          />
        </v-window-item>
        <v-window-item value="Upload">
          <CalculatorModuleNotAvailable />
        </v-window-item>
        <v-window-item value="Resources" style="height: 100%">
          <CalculatorModuleResource :obj="memory_object" />
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
      class="panel"
      :class="panel_closed ? ['closed'] : []"
      :characters="worldflipper.characters"
      :equipments="worldflipper.equipments"
      v-model="party_editor"

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
}
.panel.closed {
  height: 0;
  padding: 0 8px;
}
</style>
