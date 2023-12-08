<script setup lang='ts'>



import type { ExAbility } from '@/anise/worldflipper/party'

const exA: ExAbility[] = [
  {
    id: '',
    name: '',
    imageSrc: ''
  }
]

</script>

<template>
  <v-card
    class="elevation-4"
    style="
      padding: 4px;
      display: grid;
      grid-gap: 4px;
      grid-template-columns: repeat(4, 32px);
      grid-template-rows: repeat(3, 32px);
    "
  >
    <div
      style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center"
    >
      <v-icon v-ripple size="32px" icon="mdi-selection" />
    </div>
    <template v-for="i in 10" :key="i - 1">
      <v-img
        v-ripple
        @dragstart.prevent
        style="height: 100%; width: 100%; border-radius: 2px"
        :src="`/assets/worldflipper/icon/ex1${i - 1}.png`"
        alt=""
      />
    </template>
  </v-card>
</template>

<style scoped></style>
