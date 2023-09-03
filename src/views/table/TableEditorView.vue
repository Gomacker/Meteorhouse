<script setup lang="ts">
import table_data from './hlw.json'
import '@/components/table/elements/BasicElements'
import '@/components/table/elements/WorldflipperElements'
import { Table } from '@/components/table/table'
import SummaryTable from '@/components/table/SummaryTable.vue'
import { ref } from 'vue'
import TableEditorContent from '@/views/table/TableEditorContent'
import axios from 'axios'
const table = ref(new Table(table_data))

const mixEdit = ref(false)

async function getTableList() {
  const response = await axios.post('/api/v1/table_list/')
  const tables = response.data['tables']
  return Object.keys(tables).map((key) => {
    return { index: key, ...tables[key] }
  })
}

const tableList = ref<any>([])
getTableList().then((value) => (tableList.value = value))
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%; max-height: 100%">
    <v-toolbar style="padding: 0 16px; flex: 1">
      <div>
        <v-switch v-model="mixEdit" label="混合编辑" hide-details style="margin: 0 20px" />
      </div>
      <v-select
        hide-details
        density="compact"
        style="max-width: 150px"
        :items="tableList"
        item-title="name"
      >
        <template v-slot:item="{ item, props }">
          <v-list-item
            :style="{
              background: `linear-gradient(0, #ffffff80, #ffffff80), url(${item['raw']['img']})`
            }"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              aspect-ratio: 16/9;
              background-size: 100%;
              background-repeat: no-repeat;
              max-width: 150px;
              width: 150px;
            "
            v-bind="props"
          >
          </v-list-item>
        </template>
      </v-select>
      <v-btn color="primary" variant="flat">读取</v-btn>
      <v-btn color="success" variant="flat" prepend-icon="mdi-plus"> 新建一图 </v-btn>
    </v-toolbar>
    <div style="display: flex; flex: 1; height: calc(100% - 64px)">
      <div class="table-editor-wrapper" style="max-width: 1036px; flex: 1">
        <v-card style="width: 100%">
          <v-card-title> 基本信息 </v-card-title>
          <v-card-item>
            <v-text-field v-model="table.property.name" label="显示名称" hide-details />
            <v-text-field v-model="table.property.image" label="图片" hide-details />
            <v-switch v-model="table.property.public" label="公开" style="margin-left: 20px" hide-details color="success" />
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
            <v-text-field v-model="table.property.banner" label="banner Css" hide-details />
            <v-text-field v-model="table.property.background" label="background Css" hide-details />
          </v-card-item>
        </v-card>
        <TableEditorContent :table="table as Table" />
        <div>{{ table.data() }}</div>
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
