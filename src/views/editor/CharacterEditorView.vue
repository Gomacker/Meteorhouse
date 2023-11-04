<script setup lang="ts">
import { ref } from 'vue'
import { Character, Element, SpecialityType } from '@/anise/worldflipper/object'
import CharacterWikiCard from '@/components/worldflipper/character/CharacterWikiCard.vue'

const character = ref<Character>()
character.value = new Character(
  '',
  '',
  ['gkg', 'er', 'zcv'],
  5,
  Element.None,
  SpecialityType.Knight,
  '',
  '',
  '[]',
  {
    name: '',
    description: ''
  },
  {
    name: '',
    weight: 0,
    description: ''
  },
  [
  ],
  '',
  '',
  [],
  '',
  ''
)
</script>

<template>
  <div>
    <CharacterWikiCard :obj="character" />
    {{ character }}
  </div>
</template>

<style scoped></style>
