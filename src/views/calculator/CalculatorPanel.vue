<script setup lang="ts">
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import { Character, Equipment } from '@/anise/worldflipper/object'
import { ref } from 'vue'
import { ele2color } from '@/stores/manager'

const props = defineProps<{
  characters: Map<string, Character>
  modelValue: Character | Equipment | null | undefined
}>()

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

const updateValue = (obj: Character | Equipment | null | undefined) => {
  inputValue.value = obj
  emit('update:modelValue', inputValue.value)
}

function isSelected(obj: Character | Equipment | null | undefined) {
  return props.modelValue?.resource_id === obj?.resource_id
}
</script>

<template>
  <v-card
    :elevation="24"
    style="
      background: rgba(0 0 0 / 0.4);
      backdrop-filter: blur(2px);
      user-select: none;
      display: flex;
      flex-direction: column;
      padding: 8px;
    "
  >
    <div style="display: flex; justify-content: space-between">
      <div style="display: grid; grid-template-columns: repeat(2, auto); grid-gap: 8px">
        <v-btn color="primary">角色</v-btn>
        <v-btn>装备</v-btn>
      </div>
    </div>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, 98px);
        justify-content: center;
        overflow-y: scroll;
        border-radius: 4px;
      "
      class="wfo-list"
    >
      <CharacterIcon
        v-ripple
        class="wfo"
        v-for="c in characters"
        :class="isSelected(c[1]) ? ['selected'] : []"
        :key="c[0]"
        :character="c[1]"
        :size="90"
        :style="{ '--element-color': ele2color[c[1].element] }"
        @click="isSelected(c[1]) ? updateValue(undefined) : updateValue(c[1])"
      />
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title ripple>
          筛选条件
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-btn>aa</v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<style scoped>
.wfo {
  margin: 1px;
  padding: 3px;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  filter: none;
  box-shadow: none;
  transition: background-color 0.2s ease, scale 0.4s ease;
  --element-color: rgb(68, 68, 68);
}

.wfo:hover {
  z-index: 1;
  filter: drop-shadow(0 0 16px var(--element-color));
  scale: 1.025;
}

.wfo.selected {
  filter: drop-shadow(0 0 8px var(--element-color));
  background-color: rgba(52, 255, 201, 0.8);
}
.wfo-list {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  padding: 8px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(140, 140, 140, 0.25) 50%,
    transparent
  );
  border-radius: 12px 12px 0 0;
  margin: 8px;
}

.wfo-list::-webkit-scrollbar {
  background: rgba(255 255 255 / 0.1);
  width: 8px;
  border-radius: 4px;
  padding: 0 16px;
  margin: 2px;
}

.wfo-list::-webkit-scrollbar-thumb {
  background: rgba(0 0 0 / 0.4);
  border-radius: 4px;
}
.wfo-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0 0 0 / 0.6);
}
</style>
