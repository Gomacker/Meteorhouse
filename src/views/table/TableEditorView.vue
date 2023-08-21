<script setup lang="ts">
import table_data from './hlw.json'
import { computed } from "vue";
import { Table } from "@/components/table/table";

const table = computed(() => new Table(table_data))
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>Test</v-toolbar-title>
  </v-toolbar>
  <div>
    <v-card>
      <v-card-item>
        <v-text-field v-model="table.property.title" label="标题" hide-details/>
        <v-text-field v-model="table.property.main_color" label="主颜色" hide-details/>
      </v-card-item>
    </v-card>
  </div>
  <div>{{ table }}</div>
</template>

<style scoped></style>
