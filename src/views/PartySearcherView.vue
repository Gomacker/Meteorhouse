<script setup lang="ts">
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { PartyRelease } from '@/anise/worldflipper/party'

const page_party_list = ref(new Map())

const search_content = ref('')
const search_content_applied = ref('')
const party_count = ref(0)
const current_page = ref(1)
const loading = ref(true)

defineProps<{ eager?: boolean }>()

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
      page_party_list.value = new Map(
        Object.keys(r.data['parties']).map((key) => [key, r.data['parties'][key]]) as Array<
          [string, PartyRelease]
        >
      )
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
  if (query['q']) {
    search_content.value = String(query.q)
    search_content_applied.value = search_content.value
  }
  if (query['page']) {
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
      align-items: center;
      justify-content: space-between;
      height: 100%;
      /*padding: 16px 0;*/
      position: relative;
    "
  >
    <div
      style="
        z-index: 1;
        margin: 16px 32px 8px;
        display: flex;
        align-items: center;
        position: absolute;
        width: 80%;
      "
    >
      <v-text-field
        label="搜索鸭"
        variant="solo"
        density="compact"
        hide-details
        prepend-icon="mdi-magnify"
        v-model="search_content"
        @keydown.enter="search_party(search_content)"
      />
      <v-btn
        :color="'rgba(163,56,220,0.75)'"
        style="margin-left: 16px"
        size="large"
        @click="search_party(search_content)"
      >
        搜索
      </v-btn>
    </div>
    <v-card
      :loading="loading"
      class="elevation-0 party-searcher-wrapper"
      style="
        background: transparent;
        height: 100%;
        padding: 8px;
        margin: 0 16px;
        position: relative;
      "
    >
      <div style="height: 64px" />
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          flex-wrap: wrap;
        "
      >
        <template v-if="page_party_list.size">
          <template v-for="party in page_party_list" :key="party[0]">
            <PartyReleaseCard
              :eager="eager"
              style="margin: 4px"
              :party_release="PartyRelease.load(party[1])"
            />
          </template>
        </template>
      </div>
      <div style="height: 64px" />
    </v-card>
    <v-card
      style="position: absolute; bottom: 0; z-index: 1; border-radius: 16px"
      class="party-searcher-pagination-wrapper"
    >
      <v-pagination
        v-model="current_page"
        :length="Math.ceil(party_count / 12)"
        @update:model-value="get_data(current_page, search_content_applied)"
        class="party-searcher-pagination"
      />
    </v-card>
  </div>
</template>

<style scoped>
.party-searcher-wrapper {
  overflow-y: scroll;
  height: 100%;
}
.party-searcher-wrapper::-webkit-scrollbar {
  width: 0;
}

.party-searcher-pagination-wrapper {
  margin: 8px;
  display: flex;
  justify-content: center;
}

.party-searcher-pagination {
  width: 50%;
  min-width: 540px;
}
</style>
