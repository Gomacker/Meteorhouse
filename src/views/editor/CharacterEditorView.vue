<script setup lang="ts">
import { ref } from 'vue'
import { Character, Element, SpecialityType } from '@/anise/worldflipper/object'
import CharacterWikiCardEditable from '@/components/worldflipper/character/CharacterWikiCardEditable.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'

const props = defineProps<{ character: Character }>()

// const character = ref<Character>()
const worldflipper = useWorldflipperDataStore()

// character.value = worldflipper.characters.get('1')
</script>

<template>
  <div>
    <CharacterWikiCardEditable v-if="character" :obj="character" />
    <div
      style="
        min-width: 560px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 120px;
      "
      v-else
    >
      Error: 未传入角色引用
    </div>
  </div>
</template>

<style scoped></style>
