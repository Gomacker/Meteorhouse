<script setup lang="ts">
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { PartyRelease } from '@/stores/manager'
import { useRoute } from 'vue-router'

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
      for (const party in r.data['parties']) {
        console.log(party)
      }
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
}
onMounted(() => {
  const route = useRoute()
  const query = route.query
  console.log(query)
  if (Object.hasOwn(query, 'q')) {
    search_content.value = String(query.q)
    search_content_applied.value = search_content.value
  }
  get_data(current_page.value, search_content_applied.value)
})
</script>

<template>
  <div style="overflow: hidden; display: flex; flex-direction: column; height: 100%">
    <!--    {{ page_party_list }}-->
    <div style="margin: 16px 32px 8px; display: flex">
      <el-input
        v-model="search_content"
        placeholder="搜索鸭"
        size="large"
        @keydown.enter="search_party(search_content)"
      ></el-input>
      <el-button style="margin-left: 16px" size="large" @click="search_party(search_content)">
        搜索
      </el-button>
    </div>
    <el-scrollbar ref="scrollbar_ref" v-loading="loading" style="margin: 0 16px;">
      <div style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap">
        <template v-for="party in page_party_list" :key="party[0]">
          <PartyReleaseCard style="zoom: 1" :party_release="PartyRelease.loads(party[1])" />
        </template>
      </div>
    </el-scrollbar>
    <div style="margin: 16px; display: flex; justify-content: center">
      <el-pagination
        v-model:current-page="current_page"
        background
        layout="prev, pager, next"
        :page-size="12"
        :total="party_count"
        @currentChange="
          () => {
            get_data(current_page, search_content_applied)
            scrollbar_ref.setScrollTop(0)
          }
        "
      ></el-pagination>
    </div>
    <!--    <div style="height: 100px; background-color: red">aa</div>-->
    <!--  <PartyReleaseCard-->
    <!--      :event="true"-->
    <!--      :party_release="(()=>{-->
    <!--        const pr = PartyRelease.empty()-->
    <!--        pr.title = '『春盘赏』 示例 '-->
    <!--        u = manager.unit_data.get(241007)-->
    <!--        if (u) {-->
    <!--            pr.party.union1.main = u-->
    <!--        }-->
    <!--        return pr-->
    <!--      })()"-->
    <!--  >-->
    <!--  </PartyReleaseCard>-->
  </div>
</template>

<style scoped></style>
