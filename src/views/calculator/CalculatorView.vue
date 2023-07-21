<script setup lang="ts">
import CalculatorPanel from '@/views/calculator/CalculatorPanel.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import { ref, watch } from 'vue'
import { Character, Equipment } from '@/anise/worldflipper/object'
import CharacterWikiCard from '@/components/worldflipper/character/CharacterWikiCard.vue'
import EquipmentIcon from '@/components/worldflipper/equipment/EquipmentIcon.vue'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'

const worldflipper = useWorldflipperDataStore()
type WorldflipperObject = Character | Equipment | null | undefined
type EditorModule = 'Calculator' | 'WikiCard' | 'Editor' | 'Upload' | 'Resource'
const selected_module = ref<EditorModule>('WikiCard')
const selected_object = ref<WorldflipperObject>(undefined)
const memory_object = ref<WorldflipperObject>(undefined)
watch(selected_object, (value) => {
  if (value) memory_object.value = value
})

const panel_closed = ref<boolean>(false)
</script>

<template>
  <div style="height: 100%; width: 100%; overflow-y: hidden">
    <div style="display: flex; flex-direction: column; height: 100%">
      <v-tabs v-model="selected_module" bg-color="blue-lighten-1" align-tabs="center">
        <v-tab value="Calculator">计算器</v-tab>
        <v-tab value="WikiCard">资料卡</v-tab>
        <v-tab value="Editor">编队</v-tab>
        <v-tab value="Upload" @click="panel_closed = true">上传器</v-tab>
        <v-tab value="Resources">资源站</v-tab>
      </v-tabs>
      <v-window style="height: 100%" v-model="selected_module">
        <v-window-item value="Calculator">Calculator</v-window-item>
        <v-window-item value="WikiCard" style="height: 100%">
          <div style="overflow-y: auto; height: 100%">
            <div style="display: flex; min-height: 100%">
              <CharacterWikiCard
                v-if="memory_object instanceof Character"
                :character="memory_object"
                style="width: 100%"
              />
              <EquipmentIcon
                v-else-if="memory_object instanceof Equipment"
                :equipment="memory_object"
                style="width: 100%"
              />
            </div>
          </div>
        </v-window-item>
        <v-window-item value="Editor">Editor</v-window-item>
        <v-window-item value="Upload">Upload</v-window-item>
        <v-window-item value="Resources">Resources</v-window-item>
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
      v-model="selected_object"
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
@media (max-width: 1080px) {
  .panel {
    position: fixed;
    height: calc(100% - 64px);
    right: 0;
    bottom: 0;
    min-width: 255px;
    width: 25%;
    z-index: 10;
  }
  .panel.closed {
    width: 0;
    padding: 8px 0;
  }
}
</style>
