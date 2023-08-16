<script setup lang="ts">
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
// import { PartyRelease } from '@/stores/manager'
import { useRoute } from 'vue-router'
import { PartyRelease } from "@/anise/worldflipper/party";

const page_party_list = ref(new Map())

const search_content = ref('')
const search_content_applied = ref('')
const scrollbar_ref = ref()
const party_count = ref(0)
const current_page = ref(1)
const loading = ref(true)

function get_data(page_index: number, search_content = '') {
  const params = {
    page_index: page_index,
    search_text: '',
    ppp: 12
  }
  if (search_content) params.search_text = search_content
  page_party_list.value.clear()
  loading.value = true
  axios
    .post(
      '/api/v1/party/page/',
      {},
      {
        params: params
      }
    )
    .then((r) => {
      console.log(r.data)
      r.data
      page_party_list.value = new Map(Object.entries(r.data['parties']))
      // for (const party in r.data['parties']) {
      //   console.log(party)
      // }
      party_count.value = r.data['party_count']
      loading.value = false
    })
    .catch((r) => {
      console.log(r)
    })
}
function search_party(search_content: string) {
  search_content_applied.value = search_content
  get_data(current_page.value, search_content_applied.value)
  current_page.value = 1
}
onMounted(() => {
  const route = useRoute()
  const query = route.query
  console.log(query)
  if (query.hasOwnProperty('q')) {
    search_content.value = String(query.q)
    search_content_applied.value = search_content.value
  }
  if (query.hasOwnProperty('page')) {
    const page = parseInt(String(query.page))
    if (page) current_page.value = page
  }
  get_data(current_page.value, search_content_applied.value)
  current_page.value = 1
})
</script>

<template>
  <div
    style="
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 16px 0;
    "
  >
    <div style="margin: 16px 32px 8px; display: flex">
      <v-text-field
        label="搜索鸭"
        variant="solo"
        prepend-icon="mdi-magnify"
        v-model="search_content"
        @keydown.enter="search_party(search_content)"
      ></v-text-field>
      <v-btn
        :color="'rgba(163,56,220,0.75)'"
        style="margin-left: 16px; margin-top: 6px"
        size="large"
        @click="search_party(search_content)"
      >
        搜索
      </v-btn>
    </div>
    <v-card
      ref="scrollbar_ref"
      v-loading="loading"
      class="elevation-0"
      style="background-color: #ffffff80; height: 100%; padding: 8px; margin: 0 16px"
    >
      <div style="overflow-y: scroll; height: 100%">
        <div style="display: flex; flex-direction: row; align-items: flex-start; justify-content: center; flex-wrap: wrap">
          <template v-if="page_party_list.size">
            <template v-for="party in page_party_list" :key="party[0]">
              <PartyReleaseCard style="margin: 4px" :party_release="PartyRelease.load(party[1])" />
            </template>
          </template>
        </div>
      </div>
    </v-card>
    <div style="margin: 16px; display: flex; justify-content: center">
      <v-pagination
        v-model="current_page"
        :length="Math.ceil(party_count / 12)"
        style="width: 50%"
        @update:model-value="
          () => {
            get_data(current_page, search_content_applied)
          }
        "
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped></style>
