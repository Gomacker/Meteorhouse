<script setup lang="ts">
import { useAlert } from "@/utils";

const am = useAlert()
</script>

<template>
  <div>
    <template v-for="(alert, index) in am.stack" :key="index">
      <v-snackbar :model-value="!!alert">
        {{ alert.content }}
      </v-snackbar>
    </template>
  </div>
</template>

<style scoped>
.alert-bar {
  transition: all 0.4s ease;
}
</style>