<script setup lang="ts">
import type { TableElement } from '@/components/table/table'

const props = defineProps<{
  element: TableElement
  delete: () => void
  movePre: () => void
  moveNext: () => void
  insertPre: () => void
  insertNext: () => void
}>()
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-menu" style="margin: 0 4px" size="small" />
    </template>
    <v-list style="padding: 0">
      <v-list-item @click="props.movePre"> 前移一格 </v-list-item>
      <v-list-item @click="props.moveNext"> 后移一格 </v-list-item>
      <v-list-item @click="props.insertPre"> 在前方插入 </v-list-item>
      <v-list-item @click="props.insertNext"> 在后方插入 </v-list-item>
      <v-list-item @click="props.delete" base-color="red" append-icon="mdi-delete">
        删除
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped></style>
