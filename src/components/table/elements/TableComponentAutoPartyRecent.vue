<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { PartyRelease } from '@/anise/worldflipper/party'
import TableComponentPartyCard from "@/components/table/elements/TableComponentPartyCard.vue";

const props = defineProps<{
  category: string
  questId: string
}>()

const parties = ref<Array<PartyRelease>>()

async function getRecentParties() {
  const response = await axios.post(
    '/api/v2/worldflipper/api/party/recent',
    {},
    { params: { category: props.category, quest_id: props.questId } }
  )
  if (response.status === 200) {
    parties.value = (response.data['parties'] as Array<any>).map((value) =>
      PartyRelease.load(value)
    )
  }
}

onMounted(() => {
  getRecentParties()
})
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    <template v-for="pr in parties" :key="pr">
      <TableComponentPartyCard :party-release="pr" :title="pr.title || ''" subtitle=""/>
    </template>
  </div>
</template>

<style scoped></style>
