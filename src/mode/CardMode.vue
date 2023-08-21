<script lang="ts" setup>


import { useWorldflipperDataStore } from "@/stores/worldflipper";
import { ref } from "vue";

const worldflipper = useWorldflipperDataStore()
const worldflipper_updated = ref(false)
worldflipper.init().then((r) => {
  worldflipper_updated.value = r
})

console.log(`worldflipper loaded, Version: ${worldflipper.version}`)
</script>

<template>
  <v-snackbar
    v-model="worldflipper_updated"
    color="green-lighten-4"
    location="top"
    style="top: 72px"
    close-on-content-click
  >
    <v-icon icon="mdi-check-circle-outline" color="green" />
    已更新数据：worldflipper
  </v-snackbar>
  <router-view></router-view>
</template>

<style scoped></style>
