<script setup lang="ts"></script>

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
    <div style="background: #00f"></div>
    <div style="background: red" v-for="i in 10">{{i}}</div>
  </v-card>
</template>

<style scoped></style>
