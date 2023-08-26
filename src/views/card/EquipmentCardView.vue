<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from "vue";
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import EquipmentWikiCard from "@/components/worldflipper/equipment/EquipmentWikiCard.vue";

const id = ref<string | undefined>()
const worldflipper = useWorldflipperDataStore()
const obj = computed(() => worldflipper.equipments.get(id.value || '0'))

onMounted(() => {
  const route = useRoute()
  id.value = route.query['id'] as string || route.query['wf_id'] as string  // Version legacy: wf_id
})
</script>
<template>
  <template v-if="obj">
    <EquipmentWikiCard id="main-card" :obj="obj" />
  </template>
  <template v-else> 缺少ID / ID无效 </template>
</template>

<style scoped></style>
