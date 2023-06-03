<template>
  <div>
    <SummaryTableCard :table="new Table(table)" :party_style="{
      show_awaken: show_awaken,
      show_name: show_name,
      show_replacements: show_replacements
    }" />
  </div>
</template>

<script lang="ts">
import SummaryTableCard from '@/components/card/SummaryTableCard.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Table } from '@/stores/table'

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
        Object.hasOwn(route.query, 'show_replacements') && route.query.show_replacements
          ? route.query.show_replacements.toString().toLowerCase() === 'true'
          : false,
      show_name:
        Object.hasOwn(route.query, 'show_name') && route.query.show_name
          ? route.query.show_name.toString().toLowerCase() === 'true'
          : false,
      show_awaken:
        Object.hasOwn(route.query, 'show_awaken') && route.query.show_awaken
          ? route.query.show_awaken.toString().toLowerCase() === 'true'
          : false
    }
  },
  mounted() {
    const route = useRoute()
    axios
      // .post('/api/summary_table/' + route.params['table_id'] + '/data')
      .post(`/api/v1/table/${route.query['table_id']}/data/`)
      .then((r) => {
        table_data.value = r.data
      })
  },
  unmounted() {
    table_data.value = {}
  },
  components: { SummaryTableCard }
}
</script>

<style scoped></style>
