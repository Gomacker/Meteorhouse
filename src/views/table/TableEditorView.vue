<script setup lang="ts">
import '@/components/table/elements/BasicElements'
import '@/components/table/elements/WorldflipperElements'
import { Table } from '@/components/table/table'
import SummaryTable from '@/components/table/SummaryTable.vue'
import { ref } from 'vue'
import TableEditorContent from '@/views/table/TableEditorContent'
import axios from 'axios'
import type { TableProfile } from '@/components/table/table'

const table = ref<Table | undefined>(undefined)
const tableIdSelect = ref<string>()
const tableIdLoaded = ref<string>()

async function getTableData() {
  if (!tableIdSelect.value) return
  const response = await axios.post(`/api/v2/worldflipper/table/get/${tableIdSelect.value}`)
  if (response.status !== 200) return
  table.value = new Table(response.data)
  tableIdLoaded.value = tableIdSelect.value
}

async function saveTableData() {
  if (!tableIdLoaded.value) return
  if (!table.value) return
  const response = await axios.post(`/api/v2/worldflipper/table/save/${tableIdLoaded.value}`, {
    table: table.value.data()
  })
  if (response.status == 200) savedTooltip.value = true
}

const mixEdit = ref(false)

async function getTableList() {
  const response = await axios.post(
    '/api/v2/worldflipper/table/list',
    {},
    { params: { show_hidden: true } }
  )
  return (response.data['tables'] as Array<TableProfile>).sort((a, b) => b.weight - a.weight)
}

const tableList = ref<any>([])
getTableList().then((value) => (tableList.value = value as Array<TableProfile>))


const savedTooltip = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%; max-height: 100%">

    <v-snackbar
      v-model="savedTooltip"
      color="green-lighten-4"
      location="top"
      style="top: 72px"
      close-on-content-click=''
    >
      <v-icon icon="mdi-check-circle-outline" color="green" />
      已保存
    </v-snackbar>
    <v-toolbar style="height: min-content; padding: 0 16px">
      <div>
        <v-switch
          v-model="mixEdit"
          :disabled="!table"
          label="混合编辑"
          hide-details
          style="margin: 0 20px"
        />
      </div>
      <v-select
        hide-details
        v-model="tableIdSelect"
        density="compact"
        style="max-width: 150px"
        :items="tableList"
        item-title="name"
        item-value="id"
      >
        <template v-slot:item="{ item, props }">
          <v-list-item
            :style="{
              background: `linear-gradient(0, #ffffff80, #ffffff80), url(${item['raw']['image']})`
            }"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              aspect-ratio: 16/7;
              background-size: 100%;
              background-repeat: no-repeat;
              max-width: 150px;
              width: 150px;
              border: #333 1px solid;
            "
            v-bind="props"
          >
            <span style="display: flex; justify-content: center; color: #333">
              {{ item['raw']['id'] }}
            </span>
          </v-list-item>
        </template>
      </v-select>
      <v-btn :disabled="!tableIdSelect || tableIdSelect == tableIdLoaded" @click="getTableData" style="margin-left: 8px" color="primary" variant="elevated">
        读取
      </v-btn>
      <v-btn :disabled="!tableIdLoaded" @click="saveTableData" style="margin-left: 8px" color="warning" variant="elevated">
        保存
      </v-btn>
<!--      <v-btn style="margin-left: 8px" color="success" variant="elevated" prepend-icon="mdi-plus">-->
<!--        新建一图-->
<!--      </v-btn>-->
      <a :href="`/card/table?table_id=${tableIdLoaded}`" target="_blank">
        <v-btn :disabled="!tableIdLoaded" style="margin-left: 8px" variant="elevated">独立Card页</v-btn>
      </a>
    </v-toolbar>
    <div style="display: flex; flex: 1; height: calc(100% - 64px)">
      <div class="table-editor-wrapper" style="max-width: 1036px; flex: 1">
        <template v-if="table">
          <v-card style="width: 100%">
            <v-card-title> 基本信息 </v-card-title>
            <v-card-item>
              <v-text-field v-model="table.property.name" label="显示名称" hide-details />
              <v-text-field v-model="table.property.image" label="图片" hide-details />
              <v-switch
                v-model="table.property.public"
                label="公开"
                style="margin-left: 20px"
                hide-details
                color="success"
              />
              <v-slider
                v-model="table.property.weight"
                :step="1"
                :min="0"
                :max="20"
                show-ticks="always"
                thumb-label
                label="权重"
                style="margin-left: 20px"
                hide-details
                color="red"
              />
            </v-card-item>
            <v-card-item>
              <v-text-field v-model="table.property.title" label="标题" hide-details />
              <v-text-field v-model="table.property.main_color" label="主颜色" hide-details />
              <v-text-field v-model="table.property.sub_color" label="副颜色" hide-details />
              <v-text-field
                v-model="table.property.update_time"
                label="更新时间(----/--/--)"
                hide-details
              />
              <v-text-field v-model="table.property.little_about" label="小关于" hide-details />
              <v-switch v-model="table.property.hideBanner" label="隐藏banner" hide-details />
              <v-text-field v-model="table.property.banner" label="banner Css" hide-details />
              <v-text-field
                v-model="table.property.background"
                label="background Css"
                hide-details
              />
            </v-card-item>
          </v-card>
          <TableEditorContent :table="table as Table" />
          <v-card>
            <v-card-item>
              <v-textarea :rows="12" v-model="table.property.footer" label="Footer" />
            </v-card-item>
          </v-card>
        </template>
      </div>
      <div v-if="mixEdit" class="table-preview-wrapper">
        <SummaryTable :table="table as Table" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-editor-wrapper {
  overflow-y: scroll;
  height: 100%;
}
.table-editor-wrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.table-preview-wrapper {
  zoom: 0.65;
  overflow-y: scroll;
  height: 100%;
}
.table-preview-wrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.on-debug-editor div {
  border: 1px black solid;
}
</style>
