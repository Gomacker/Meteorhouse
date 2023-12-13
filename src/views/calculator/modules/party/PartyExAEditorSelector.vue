<script setup lang='ts'>
import { exAAbilities } from '@/anise/worldflipper/party'
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
    <template v-for="(exAbility, id_) in exAAbilities" :key="id_">
      <v-img
        v-ripple
        @dragstart.prevent
        style="height: 100%; width: 100%; border-radius: 2px"
        :src="exAbility.imageSrc"
        :title='exAbility.name'
        alt=""
      />
    </template>
  </v-card>
</template>

<style scoped></style>
