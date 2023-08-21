<template>
  <div>
    <SummaryTable
      :table="new Table(table)"
      :party_style="{
        show_awaken: show_awaken,
        show_name: show_name,
        show_replacements: show_replacements
      }"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Table } from '@/components/table/table'
import SummaryTable from "@/components/table/SummaryTable.vue";

const table_data = ref({})

export default {
  name: 'TableCardView',
  computed: {
    Table() {
      return Table
    }
  },
  data() {
    const route = useRoute()

    return {
      table: table_data,
      show_replacements:
        route.query.hasOwnProperty('show_replacements') && route.query.show_replacements
          ? route.query.show_replacements.toString().toLowerCase() === 'true'
          : false,
      show_name:
        route.query.hasOwnProperty('show_name') && route.query.show_name
          ? route.query.show_name.toString().toLowerCase() === 'true'
          : false,
      show_awaken:
        route.query.hasOwnProperty('show_awaken') && route.query.show_awaken
          ? route.query.show_awaken.toString().toLowerCase() === 'true'
          : false
    }
  },
  mounted() {
    const route = useRoute()
    axios.post(`/api/v1/table/${route.query['table_id']}/data/`).then((r) => {
      table_data.value = r.data
    })
  },
  unmounted() {
    table_data.value = {}
  },
  components: { SummaryTable }
}
</script>

<style scoped></style>
