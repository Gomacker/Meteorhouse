<script setup lang="ts">
import { ref } from "vue";
import { Character, Element, SpecialityType } from "@/anise/worldflipper/object";

const character = ref<Character>()
character.value = new Character(
  '',
  '',
  [''],
  0,
  Element.All,
  SpecialityType.Knight,
  '',
  '',
  '',
  {
    name: '',
    description: ''
  },
  {
    name: '',
    weight: 0,
    description: ''
  },
  [],
  '',
  '',
  [],
  '',
  '',
)
</script>

<template>
  <div>
    {{ character }}
  </div>
</template>

<style scoped></style>
