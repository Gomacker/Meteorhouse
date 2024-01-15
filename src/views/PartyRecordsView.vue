<script setup lang="ts">
import { PartyRelease } from '@/anise/worldflipper/party'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import PartyReleaseCard from "@/components/card/PartyReleaseCard.vue";
import { useDefer } from "@/utils";

const pts = ref<Array<PartyRelease>>()
const defer = useDefer()
async function getPartyRecords() {
  const response = await axios.post('/api/v2/worldflipper/party/records')
  if (response.status === 200) {
    pts.value = (response.data['parties'] as Array<any>).splice(0, 500).map((value) => PartyRelease.load(value))
    console.log(pts.value?.length);
  }
}

onMounted(getPartyRecords)
</script>

<template>
  <div style="justify-content: center; display: flex; flex-wrap: wrap">
    <template v-if="pts && pts.length">
      <template v-for="(p, index_) in pts" :key="index_">
        <PartyReleaseCard v-if="defer(index_)" :party_release="p" hide-tools />
      </template>
    </template>
  </div>
</template>

<style scoped></style>
