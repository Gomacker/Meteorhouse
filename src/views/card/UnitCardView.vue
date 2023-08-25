<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import { useRoute } from 'vue-router'
import CharacterWikiCard from "@/components/worldflipper/character/CharacterWikiCard.vue";

const wf_id = ref<string | undefined>()
const worldflipper = useWorldflipperDataStore()

const obj = computed(() => worldflipper.characters.get(wf_id.value || '0'))

onMounted(() => {
  const route = useRoute()
  wf_id.value = typeof route.query['wf_id'] === 'string' ? route.query['wf_id'] : undefined
})
</script>
<template>
  <template v-if="obj">
    <CharacterWikiCard id="main-card" :obj="obj" />
  </template>
  <template v-else> 缺少ID </template>
</template>

<style scoped></style>
