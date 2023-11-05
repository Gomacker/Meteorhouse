<script setup lang="ts">
import { ref } from 'vue'
import { Character, Element, SpecialityType } from '@/anise/worldflipper/object'
import CharacterWikiCardEditable from '@/components/worldflipper/character/CharacterWikiCardEditable.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'

const character = ref<Character>()
const worldflipper = useWorldflipperDataStore()

character.value = worldflipper.characters.get('1')
</script>

<template>
  <div>
    <CharacterWikiCardEditable v-if="character" :obj="character" />
    <v-card>
      <v-card-item>
        {{ character }}
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped></style>
