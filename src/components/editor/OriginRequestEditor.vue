<script setup lang="ts">
import PartyCardEliya from '@/components/party/PartyCardEliya.vue'
import { PartyRelease } from '@/stores/manager'
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps<{
  party_id: string
  request_url: string
}>()

const party = ref<PartyRelease>()

if (props.party_id) {
  axios.post(`/api/v1/party/release/${props.party_id}/`).then((r) => {
    party.value = PartyRelease.loads(r.data['data'])
  })
}

function access_request() {
  console.log('access')
}
function reject_request() {
  console.log('reject')
}
</script>

<template>
  <el-card body-style="padding: 8px" style="width: 498px">
    <template v-if="party instanceof PartyRelease">
      <div>
        <span style="font-weight: 600; font-size: 18px">
          {{ party.title }}
        </span>
        <span style="color: gray"> ({{ party.id }}) </span>
      </div>
      <PartyCardEliya :party="party" />
      <el-form size="small">
        <el-form-item style="margin-bottom: 0; align-items: center" label="新增源">
          <a target="_blank" :href="request_url" style="cursor: pointer">{{ request_url }}</a>
        </el-form-item>
      </el-form>
      <div style="margin: 4px; display: flex; justify-content: space-between">
        <div />
        <div>
          <el-button @click="access_request" type="primary" size="small"> 通过 </el-button>
          <el-button @click="reject_request" type="danger" size="small"> 拒绝 </el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped></style>
