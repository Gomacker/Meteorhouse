<script setup lang="ts">
import { shallowRef } from 'vue'

const cardRegex = /^\/card/
const pureRegex = /^\/pure/

const Mode = shallowRef(null)

;(async () => {
  if (cardRegex.test(location.pathname)) {
    Mode.value = (await import('@/views/CardMode.vue')).default
  } else if (pureRegex.test(location.pathname)) {
    Mode.value = (await import('@/views/PureMode.vue')).default
  } else {
    Mode.value = (await import('@/views/DefaultMode.vue')).default
  }
})()
</script>

<template>
  <component :is="Mode"></component>
</template>

<style scoped></style>
