<script setup lang="ts">
import SummaryTableCard from '@/components/card/SummaryTableCard.vue'
import { Table } from '@/stores/table'
import d_ from '@/views/aa.json'

const table_data = new Table(d_)
</script>
<template>
  <div>
    <div>
      <div id="container">
        <SummaryTableCard :table="new Table(table_data)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/*#container {*/
/*    zoom: 0.75;*/
/*}*/
</style>
