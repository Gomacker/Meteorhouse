<script setup lang="ts">
import PartyCardEliya from '@/components/party/PartyCardEliya.vue'
import { PartyRelease } from '@/stores/manager'
import { ref } from 'vue'
import axios from 'axios'
import OriginRequestEditor from '@/components/editor/OriginRequestEditor.vue'

const type_select = ref<string>()

const origin_request_data = ref<Map<string, object>>(new Map())

function load_data() {
  if (type_select.value === 'origin') {
    axios.post('/api/v1/origin/request/origin/data/').then((r) => {
      origin_request_data.value = new Map(Object.entries(r.data['data']))
    })
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div
      style="display: flex; align-items: center; background-color: gray; color: white; padding: 8px"
    >
      <span>类型</span>
      <el-select v-model="type_select" style="margin-left: 8px" size="small">
        <el-option label="盘子源提交" value="origin"></el-option>
      </el-select>
      <el-button @click="load_data" size="small" style="margin-left: 8px" type="warning">
        加载
      </el-button>
    </div>
    <el-scrollbar>
      <div
        style="
          padding: 8px;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          justify-content: center;
        "
      >
        <OriginRequestEditor
          v-for="(req, index) in origin_request_data"
          :key="index"
          style="margin: 8px"
          :request_url="req[1]['url']"
          :party_id="req[1]['party_id']"
        ></OriginRequestEditor>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
