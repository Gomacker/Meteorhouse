<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import TableCard from '@/views/table/TableCard.vue'
import type { TableProfile } from '@/components/table/table'
import worldflipperService from "@/services/worldflipperService";

const tableList = ref<Array<TableProfile>>()

// axios.post('/api/v2/worldflipper/table/list').then((r) => {
//   tableList.value = (r.data['tables'] as Array<TableProfile>).sort((a, b) => b.weight - a.weight)
// })
worldflipperService.fetchTableList().then(value => tableList.value = value)

const tableListSorted = computed(() => {
  const tl: any = {}
  tableList.value?.forEach((value) => {
    if (!(tl[value.weight] instanceof Array)) tl[value.weight] = [] as Array<TableProfile>
    ;(tl[value.weight] as Array<any>).push(value)
  })
  return tl
})
</script>

<template>
  <div style="height: 100%">
    <template
      v-for="weight in Object.keys(tableListSorted).sort((a, b) => parseInt(b) - parseInt(a))"
      :key="weight"
    >

      <div class="table-list">
        <template :key="table_profile.id" v-for="table_profile in tableListSorted[weight]">
          <TableCard :table-profile="table_profile" />
        </template>
      </div>
      <div style="display: flex; place-content: center">
        <v-divider :thickness="3" length="90%" />
      </div>
    </template>
  </div>
</template>

<style>
.table-list {
  margin: 32px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 16px;
  justify-content: center;
}

@media(max-width: 670px) {
  .table-list {
    margin: 16px 0;
    grid-template-columns: repeat(auto-fill, 240px);
  }
}
</style>
