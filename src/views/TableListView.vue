<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import TableCard from "@/views/table/TableCard.vue";
import type { TableProfile } from "@/components/table/table";


const table_list = ref<Array<TableProfile>>()

axios.post('/api/v2/worldflipper/table/list').then((r) => {
  table_list.value = (r.data['tables'] as Array<TableProfile>).sort((a, b) => b.weight - a.weight)
})
</script>

<template>
  <div>
    <div
      style="
        margin: 32px 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, 320px);
        grid-gap: 16px;
        justify-content: center;
      "
    >
      <template :key="table_profile.id" v-for="table_profile in table_list">
        <TableCard :table-profile="table_profile" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TableListView'
}
</script>

