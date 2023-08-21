<script setup lang="ts">
import SummaryTable from '@/components/table/SummaryTable.vue'
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Table } from '@/components/table/table'

const table_data = ref<any>()

const route = useRoute()
const show_replacements = route.query.show_replacements?.toString().toLowerCase() === 'true'
const show_name = route.query.show_name?.toString().toLowerCase() === 'true'
const show_awaken = route.query.show_awaken?.toString().toLowerCase() === 'true'

onMounted(() => {
  axios.post(`/api/v1/table/${route.params['table_id']}/data/`).then((r) => {
    table_data.value = r.data
  })
})

onUnmounted(() => {
  table_data.value = {}
})

const table = computed(() => new Table(table_data.value))
</script>

<template>
  <div
    style="
      width: 100%;
      min-width: fit-content;
      padding: 24px 0;
      display: flex;
      justify-content: center;
      overflow: auto;
    "
  >
    <SummaryTable v-if="table_data" :table="table"/>
  </div>
</template>

<style scoped></style>