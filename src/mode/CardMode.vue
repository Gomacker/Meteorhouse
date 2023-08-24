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
  <router-view></router-view>
</template>

<style scoped></style>
