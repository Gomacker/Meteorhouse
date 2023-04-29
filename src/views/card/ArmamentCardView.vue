<template>
  <template v-if="typeof id_list.wf_id === 'number'">
    <ArmamentWikiCard :unit="manager.armament_data.get(id_list.wf_id)" />
  </template>
  <template v-else> 缺少ID </template>
</template>

<script lang="ts">
import ArmamentWikiCard from '@/components/card/ArmamentWikiCard.vue'
import { manager } from '@/stores/manager'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'

let id_list: { wf_id: number | undefined } = reactive({
  wf_id: undefined
})
export default {
  name: 'ArmamentCardView',
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
  components: { ArmamentWikiCard },
  mounted() {
    const route = useRoute()
    id_list.wf_id =
      typeof route.query['wf_id'] === 'string' ? parseInt(route.query['wf_id']) : undefined
    console.log(id_list.wf_id)
  }
}
</script>

<style scoped></style>
