
<template>
  <div>
    <SummaryTableCard :table="new Table(table)" :hidden_replacements="hidden_replacements"/>
  </div>
</template>

<script lang="ts">
import SummaryTableCard from "@/components/card/SummaryTableCard.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {Table} from "@/stores/table";

const table_data = ref({})


export default {
  name: "TableContentView",
  computed: {
    Table() {
      return Table
    }
  },
  data() {
    const route = useRoute()

    return {
      table: table_data,
      hidden_replacements: 'hidden_replacements' in route.query && route.query.hidden_replacements
          ? route.query.hidden_replacements.toString().toLowerCase() === 'true'
          : true
    }
  },
  mounted() {
    const route = useRoute()
    axios
        // .post('/api/summary_table/' + route.params['table_id'] + '/data')
        .post(`/api/v1/table/${route.params['table_id']}/data/`)
        .then(r => {
          table_data.value = r.data
        })
  },
  unmounted() {
    table_data.value = {}
  },
  components: {SummaryTableCard}
}
</script>

<style scoped>

</style>