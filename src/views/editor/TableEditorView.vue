<script setup lang="ts">
import TableComponentEditor from '@/components/editor/TableComponentEditor.vue'
import { ref } from 'vue'
import axios from 'axios'

const table_list = ref({})

axios.post('/api/v1/table_list/').then((r) => {
  table_list.value = r.data['tables']
})

const table_select = ref({})
const table_selected = ref({})
class Table {}
const table = ref<Table>()
function load_table(table_id: string) {
  table_selected.value = table_select.value
}
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div
      style="
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        background-color: rgba(0 0 0 / 0.5);
        color: white;
        padding: 0 8px;
      "
    >
      <el-button type="primary" size="small">保存</el-button>
      <el-select v-model="table_select" style="margin-left: 8px" size="small">
        <el-option v-for="(t, table_name) in table_list" :key="t" :value="t" :label="table_name">
          {{ table_name }}: <span style="color: lightgray">{{ t }}</span>
        </el-option>
      </el-select>
      <el-button style="margin-left: 8px" type="warning" size="small">读取</el-button>
      <div style="margin-left: 8px">this is header bar</div>
    </div>
    <el-scrollbar view-style="height: 100%; display: flex; justify-content: center;">
      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-start;
          align-content: flex-start;
          justify-content: center;
          padding: 8px;
          height: 100%;
          max-width: 1036px;
        "
      >
        <el-card style="width: 99.5%; margin: 0.25%" body-style="padding: 8px;">
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item style="margin-bottom: 4px" label="标题">
              <el-input></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 4px" label="颜色">
              <div v-if="false" style="display: flex">
                <div style="display: flex; align-items: center">
                  <span>主颜色</span>
                  <el-color-picker color-format="hex" show-alpha></el-color-picker>
                </div>
                <div style="display: flex; margin-left: 16px; align-items: center">
                  <span>副颜色 </span>
                  <el-color-picker></el-color-picker>
                </div>
              </div>
            </el-form-item>
            <el-form-item style="margin-bottom: 4px" label="时间">
              <el-date-picker></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-bottom: 4px" label="小标题">
              <el-input type="textarea" :autosize="{ minRows: 2 }"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 4px" label="横幅">
              <el-input type="textarea" :autosize="{ minRows: 2 }" placeholder="(CSS)"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 4px" label="背景">
              <el-input type="textarea" :autosize="{ minRows: 2 }" placeholder="(CSS)"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <el-divider />
        <el-card
          style="width: 99.5%; margin: 0.25%; background-color: rgba(0 127 255 / 0.1)"
          body-style="padding: 0;"
        >
          <div>aa</div>
          <el-divider style="margin: 4px" />
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <TableComponentEditor type="TextArea" />
            <TableComponentEditor type="PartyRelease" />
            <TableComponentEditor type="Html" />
            <TableComponentEditor type="PartyCombine" />
            <TableComponentEditor type="EventCard" />
            <TableComponentEditor type="WikiCard" />
            <TableComponentEditor type="ObjectMap" />
          </div>
        </el-card>
        <el-divider />
        <el-card style="width: 99.5%; margin: 0.25%" body-style="padding: 8px;">
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item style="margin-bottom: 4px" label="脚注">
              <el-input type="textarea" :autosize="{ minRows: 4 }"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
