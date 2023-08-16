<template>
  <template v-if="obj">
    <EquipmentWikiCard id="main-card" :obj="obj" />
  </template>
  <template v-else> 缺少ID </template>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { ref } from "vue";
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import EquipmentWikiCard from "@/components/worldflipper/equipment/EquipmentWikiCard.vue";

let wf_id = ref<string | undefined>()
const worldflipper = useWorldflipperDataStore()
export default {
  name: 'ArmamentCardView',
  computed: {
    obj() {
      return worldflipper.equipments.get(wf_id.value || '0')
    }
  },
  data() {
    return {
      wf_id: wf_id
    }
  },
  components: { EquipmentWikiCard },
  mounted() {
    const route = useRoute()
    wf_id.value = typeof route.query['wf_id'] === 'string' ? route.query['wf_id'] : undefined
    console.log(wf_id)
  }
}
</script>

<style scoped></style>
