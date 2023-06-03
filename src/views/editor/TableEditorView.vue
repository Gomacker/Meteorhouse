<script setup lang="ts">
import TableComponentEditor from '@/components/editor/TableComponentEditor.vue'
import { ref } from 'vue'
import axios from 'axios'
import { Table, TableElement, TableElementParty, TableElementTextArea } from '@/stores/table'
import SummaryTableCard from '@/components/card/SummaryTableCard.vue'
import { ElMessage } from 'element-plus'

const table_list = ref({})
const combine_view = ref(false)

axios.post('/api/v1/table_list/').then((r) => {
  table_list.value = r.data['tables']
})

const table_select = ref<string>('')
const table_selected = ref<string>('')
const table_data_debug = ref<object>()
const table = ref<Table>()
function load_table(table_id: string) {
  axios.post(`/api/v1/table/${table_id}/data/`).then((r) => {
    table_selected.value = table_id
    table_data_debug.value = r.data
    table.value = new Table(r.data)
  })
}
function save_table() {
  if (table.value instanceof Table) {
    axios
      .post(`/api/v1/table/${table_selected.value}/save/`, {
        table_data: JSON.stringify(table.value.data())
      })
      .then((r) => {
        console.log(r.data)
        if (r.data['result'] === 'success') {
          ElMessage.success('保存成功')
        } else {
          ElMessage.error('保存失败')
        }
      })
      .catch(() => {
        ElMessage.error('保存失败(连接失败)')
      })
  }
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
      <el-button @click="save_table" :disabled="!table_selected" type="primary" size="small"
        >保存</el-button
      >
      <el-select v-model="table_select" style="margin-left: 8px" size="small">
        <el-option v-for="(t, table_name) in table_list" :key="t" :value="t" :label="table_name">
          {{ table_name }}: <span style="color: lightgray">{{ t }}</span>
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 8px"
        type="warning"
        size="small"
        :disabled="!table_select"
        @click="load_table(table_select)"
      >
        读取
      </el-button>
      <div style="display: flex; align-items: center; margin-left: 8px">
        <div>独立视图</div>
        <el-switch style="margin: 0 8px" v-model="combine_view"></el-switch>
        <div>结合视图</div>
      </div>
      <a
        v-if="table_selected"
        style="margin-left: 8px; color: #58ffb7"
        target="_blank"
        :href="`/card/table/?table_id=${table_selected}`"
      >
        Card页
      </a>
      <a
        v-if="table_selected"
        style="margin-left: 8px; color: #58ffb7"
        target="_blank"
        :href="`/card/table/?table_id=${table_selected}&show_replacements=true`"
      >
        Card页（替换展开）
      </a>
    </div>
    <div
      v-if="table instanceof Table"
      style="display: flex; justify-content: center; height: calc(100% - 40px)"
    >
      <el-scrollbar :style="{ width: combine_view ? '50%' : '' }" view-style="height: 100%;">
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
            width: 1036px;
            /*max-width: 1036px;*/
          "
          :style="{
            '--main-color': table.property.get_color_main(1),
            '--sub-color': table.property.get_color_sub(1),
            '--main-background-color': table.property.get_color_main(0.8),
            '--sub-background-color': table.property.get_color_sub(0.45)
          }"
        >
          <el-card style="width: 99.5%; margin: 0.25%" body-style="padding: 8px;">
            <el-form label-width="50px" size="small" label-position="left">
              <el-form-item style="margin-bottom: 4px" label="标题">
                <el-input v-model="table.property.title"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 4px" label="颜色">
                <div style="display: flex">
                  <div style="display: flex; align-items: center">
                    <span style="margin: 0 2px">主颜色</span>
                    <el-color-picker
                      v-model="table.property.main_color"
                      show-alpha
                    ></el-color-picker>
                  </div>
                  <div style="display: flex; margin-left: 16px; align-items: center">
                    <span style="margin: 0 2px">副颜色</span>
                    <el-color-picker
                      v-model="table.property.sub_color"
                      show-alpha
                    ></el-color-picker>
                  </div>
                </div>
              </el-form-item>
              <el-form-item style="margin-bottom: 4px" label="时间">
                <el-date-picker
                  v-model="table.property.update_time"
                  format="YYYY/MM/DD"
                  value-format="YYYY/MM/DD"
                  clearable
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="margin-bottom: 4px" label="小标题">
                <el-input
                  v-model="table.property.little_about"
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 4px" label="横幅">
                <el-input
                  v-model="table.property.banner"
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  placeholder="(CSS)"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 4px" label="背景">
                <el-input
                  v-model="table.property.background"
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  placeholder="(CSS)"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <el-divider />
          <template v-for="(element, index) in table.content" :key="index">
            <TableComponentEditor
              :table_element="element"
              @refresh="table.content[index] = TableElement.load(element.data())"
              @move_pre="table.move_pre(index)"
              @move_next="table.move_next(index)"
              @insert_pre="table.insert_row(index)"
              @delete="table.delete(index)"
            ></TableComponentEditor>
          </template>
          <el-divider />
          <el-card style="width: 99.5%; margin: 0.25%" body-style="padding: 8px;">
            <el-form label-width="50px" size="small" label-position="left">
              <el-form-item style="margin-bottom: 4px" label="脚注">
                <el-input
                  v-model="table.property.footer"
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-scrollbar>
      <el-scrollbar style="width: 50%" v-if="combine_view">
        <SummaryTableCard :table="table" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
