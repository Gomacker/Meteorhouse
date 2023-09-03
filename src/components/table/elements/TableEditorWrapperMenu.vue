<script setup lang="ts">

import type { TableElement } from "@/components/table/table";

const props = defineProps<{element: TableElement, delete: () => void}>()
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-menu" style="margin: 0 4px" size="small"/>
    </template>
    <v-list style="padding: 0">
      <v-list-item style="padding: 0">
        <v-btn
          color="error"
          prepend-icon="mdi-delete"
          @click="props.delete"
        >
          删除
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>