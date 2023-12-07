<script setup lang='ts'>
</script>

<template>
  <v-card
    class="elevation-4"
    style="
      padding: 4px;
      display: grid;
      grid-gap: 6px;
      grid-template-columns: repeat(4, 32px);
      grid-template-rows: repeat(3, 32px);
    "
  >
    <template v-for='i in 10'>
      <img style='height: 100%; width: 100%' :src='`/assets/worldflipper/icon/ex1${i-1}.png`' alt='' :title='`${i-1}`'/>
    </template>
  </v-card>
</template>

<style scoped></style>
