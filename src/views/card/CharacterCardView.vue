<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import { useRoute } from 'vue-router'
import CharacterWikiCard from "@/components/worldflipper/character/CharacterWikiCard.vue";

const id = ref<string | undefined>()
const worldflipper = useWorldflipperDataStore()
const obj = computed(() => worldflipper.characters.get(id.value || '0'))

onMounted(() => {
  const route = useRoute()
  id.value = route.query['id'] as string || route.query['wf_id'] as string  // Version legacy: wf_id
})
</script>
<template>
  <template v-if="obj">
    <CharacterWikiCard id="main-card" :obj="obj" />
  </template>
  <template v-else> 缺少ID / ID无效 </template>
</template>

<style scoped></style>
