<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { Party, PartyRelease } from "@/anise/worldflipper/party";
import PartyReleaseCard from "@/components/card/PartyReleaseCard.vue";
import { useRoute } from "vue-router";

// const worldflipper = useWorldflipperDataStore()
const parties = ref<Array<any>>([])
const route = useRoute()

async function getParties() {
  const response = await axios.post(
    '/api/v2/worldflipper/data/party/statistics/character',
    {},
    { params: { id: route.query['id'] } }
  )
  parties.value = response.data['parties']
}
function getPr(p: any, count: string) {
  return new PartyRelease(Party.load(p), [], `总记录数${count}`)

}
onMounted(() => {
  getParties()
})
</script>

<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, 504px); justify-content: center;">
    <template v-for="p in parties.sort((a, b) => b[1] - a[1]).slice(0, 50)" :key="p">
      <div style="margin: 4px">
        <PartyReleaseCard :party_release="getPr(p[0], p[1])"/>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
