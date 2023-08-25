<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from "vue";
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import EquipmentWikiCard from "@/components/worldflipper/equipment/EquipmentWikiCard.vue";

const wf_id = ref<string | undefined>()
const worldflipper = useWorldflipperDataStore()
const obj = computed(() => worldflipper.equipments.get(wf_id.value || '0'))

onMounted(() => {
  const route = useRoute()
  wf_id.value = typeof route.query['wf_id'] === 'string' ? route.query['wf_id'] : undefined
})
</script>
<template>
  <template v-if="obj">
    <EquipmentWikiCard id="main-card" :obj="obj" />
  </template>
  <template v-else> 缺少ID </template>
</template>

<style scoped></style>
