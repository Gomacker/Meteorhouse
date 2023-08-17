<script setup lang="ts">
import { shallowRef } from 'vue'

const cardRegex = /^\/card/
const pureRegex = /^\/pure/

const Mode = shallowRef(null)

;(async () => {
  if (cardRegex.test(location.pathname)) {
    Mode.value = (await import('@/mode/CardMode.vue')).default
  } else if (pureRegex.test(location.pathname)) {
    Mode.value = (await import('@/mode/PureMode.vue')).default
  } else {
    Mode.value = (await import('@/mode/DefaultMode.vue')).default
  }
})()
</script>

<template>
  <component :is="Mode"></component>
</template>

<style scoped></style>
