<template>
  <template v-if="typeof id_list.wf_id === 'number'">
    <UnitWikiCard id="main-card" :unit="manager.unit_data.get(id_list.wf_id)" />
  </template>
  <template v-else> 缺少ID </template>
</template>

<script lang="ts">
import UnitWikiCard from '@/components/card/UnitWikiCard.vue'
import { manager } from '@/stores/manager'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'

let id_list: { wf_id: number | undefined } = reactive({
  wf_id: undefined
})
export default {
  name: 'UnitCardView',
  computed: {
    manager() {
      return manager
    }
  },
  data() {
    return {
      id_list: id_list
    }
  },
  components: { UnitWikiCard },
  mounted() {
    const route = useRoute()
    id_list.wf_id =
      typeof route.query['wf_id'] === 'string' ? parseInt(route.query['wf_id']) : undefined
    console.log(id_list.wf_id)
  }
}
</script>

<style scoped></style>
