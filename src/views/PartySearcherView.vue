<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from 'vue-router'
import worldflipperService from "@/services/worldflipperService";
import PartyReleaseCardV2 from "@/components/card/PartyReleaseCardV2.vue"
import type { PartyRelease } from "@/anise/worldflipper/party2"

const partyPageList = ref<PartyRelease[]>([])

const searchContent = ref('')
const searchContentApplied = ref('')
const maxPage = ref(0)
const currentPage = ref(1)
const isLoading = ref(true)

defineProps<{ eager?: boolean }>()

async function search(pageIndex: number, searchText = ''): Promise<PartyRelease[]> {
  isLoading.value = true
  // console.log('loading', pageIndex, searchText)
  const result = await worldflipperService.fetchPartyPage(pageIndex, searchText)
  // console.log('loaded', pageIndex, searchText)
  maxPage.value = result.maxPage
  isLoading.value = false
  return result.parties
}
function searchParty(search_content: string) {
  searchContentApplied.value = search_content
  search(
    currentPage.value,
    searchContentApplied.value
  ).then(
    value => {
      partyPageList.value = value
    }
  )
  currentPage.value = 1
}
onMounted(() => {
  const route = useRoute()
  const query = route.query
  if (query['q']) {
    searchContent.value = String(query.q)
    searchContentApplied.value = searchContent.value
  }
  if (query['page']) {
    const page = parseInt(String(query.page))
    if (page) currentPage.value = page
  }
  search(currentPage.value, searchContentApplied.value).then(
    value => {
      partyPageList.value = value
    }
  )
  currentPage.value = 1
})

// const pageMax = computed(() => Math.ceil(partyCount.value / 12))

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
        v-model="searchContent"
        @keydown.enter="searchParty(searchContent)"
      />
      <v-btn
        :color="'rgba(163,56,220,0.75)'"
        style="margin-left: 16px"
        size="large"
        @click="searchParty(searchContent)"
      >
        搜索
      </v-btn>
    </div>
    <v-card
      v-if="!isLoading"
      class="elevation-0 party-searcher-wrapper"
      style="
        background: transparent;
        height: 100%;
        padding: 8px 0;
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
        <template v-if="partyPageList.length">
          <template v-for="party in partyPageList">
            <PartyReleaseCardV2
              :party-style="{eagerLoading: eager}"
              style="margin: 4px"
              :model-value="party"
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
        v-model="currentPage"
        :length="maxPage"
        @update:model-value="search(currentPage, searchContentApplied).then(value => partyPageList = value)"
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
