<script setup lang="ts">
import SummaryTable from '@/components/table/SummaryTable.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Table } from '@/components/table/table'
import worldflipperService from "@/services/worldflipperService";

const table_data = ref<any>()

const route = useRoute()
const show_replacements = route.query.show_replacements?.toString().toLowerCase() === 'true'
const show_name = route.query.show_name?.toString().toLowerCase() === 'true'
const show_awaken = route.query.show_awaken?.toString().toLowerCase() === 'true'

interface RenderOption {
  show_replacements: boolean
  show_name: boolean
  show_awaken: boolean
}

const renderOption: RenderOption = {
  show_replacements,
  show_name,
  show_awaken
}

onMounted(() => {
  const tableId: string = route.params['table_id'].toString()
  if (tableId) {
    worldflipperService.fetchTableData(tableId).then(value => table_data.value = value)
  }
})

onUnmounted(() => {
  table_data.value = {}
})

const table = computed(() => new Table(table_data.value))
</script>

<template>
  <div style='height: 100%; overflow: scroll'>
    <v-toolbar density="compact"> 绑定ID: {{ route.params['table_id'] }} </v-toolbar>
    <div class="table-wrapper">
      <SummaryTable class="table-body" v-if="table_data" :table="table" />
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  min-width: fit-content;
  display: flex;
  justify-content: center;
  //overflow: scroll;
  //height: 100%;
}
@media (max-width: 768px) {
  .table-body {
    zoom: 0.8;
  }
}
@media (width: 560px) {
  .table-body {
    zoom: calc(560 / 1036);
  }
}
</style>
