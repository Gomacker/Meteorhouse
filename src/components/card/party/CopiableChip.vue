<script setup lang="ts">
const props = defineProps<{
  value: string
  color?: string
  enable?: boolean
}>()

const handleClick = () => {
  navigator.clipboard.writeText(props.value).then(() => {
    alert('copied to clipboard')
  })
}
</script>

<template>
  <v-chip
    v-ripple
    :color="color"
    density="comfortable"
    style="
      height: 20px;
      margin: 0 4px;
      user-select: none;
      flex-shrink: 0;
      cursor: default;
      vertical-align: text-bottom;
    "
    @click="() => {
      if (enable) handleClick()
    }"
  >
    {{ value }}
  </v-chip>
</template>

<style scoped></style>
