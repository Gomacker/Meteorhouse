<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PartyRelease } from '@/anise/worldflipper/party'
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'
import { apiService } from '@/utils'

const id = ref<string | undefined>()
const complete = ref<boolean>(false)

async function getParty(id: string) {
  party.value = await apiService.searchParty(id)
  if (party.value) party.value.partyCode = id
  complete.value = true
}
onMounted(() => {
  const route = useRoute()
  const id = route.query['id'] as string
  getParty(id).then()
})
const party = ref<PartyRelease | undefined>(undefined)
</script>

<template>
  <div v-if="complete" id="card-complete">
    <PartyReleaseCard
      v-if="party instanceof PartyRelease"
      id="main-card"
      :party_release="party"
      hide-tools
      eager
    />
    <div id="card-failed" v-else>缺少ID / ID无效</div>
  </div>
</template>

<style scoped></style>
