<script setup lang="ts">
import table_data from './hlw.json'
import '@/components/table/elements/BasicElements'
import '@/components/table/elements/WorldflipperElements'
import { Table } from '@/components/table/table'
import SummaryTable from '@/components/table/SummaryTable.vue'
import { ref } from 'vue'
import TableEditorContent from '@/views/table/TableEditorContent'
import { useDefer } from "@/utils";
const table = ref(new Table(table_data))

const mixEdit = ref(false)

</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%; max-height: 100%">
    <v-toolbar style="padding: 0 16px; flex: 1">
      <div>
        <v-switch
          v-model="mixEdit"
          label="混合编辑"
          hide-details
          style="margin: 0 20px"
        />
      </div>
      <v-select hide-details density="compact" style="max-width: 150px"></v-select>
      <v-btn>aa</v-btn>
      <v-btn color="green" variant="flat" prepend-icon="mdi-plus"> 新建一图 </v-btn>
      <div>
        <v-switch label="公开" style="margin-left: 20px" hide-details color="success" />
      </div>
    </v-toolbar>
    <div style="display: flex; flex: 1; height: calc(100% - 64px)">
      <div class="table-editor-wrapper" style="max-width: 1036px; flex: 1">
        <v-card style="width: 100%">
          <v-card-item>
            <v-text-field v-model="table.property.title" label="标题" hide-details />
            <v-text-field v-model="table.property.main_color" label="主颜色" hide-details />
          </v-card-item>
        </v-card>
        <TableEditorContent :table="table as Table" />
        <!--        <div style="margin-top: 4px; display: flex; flex-wrap: wrap">-->
        <!--          <div v-for="element in table.content" :key="element" style="width: 50%; padding: 4px">-->
        <!--            <v-card style="width: 100%" class="elevation-4 on-debug-editor">-->
        <!--              <span style="color: red">{{ element.__type }}</span>-->
        <!--              <template v-html="element.editor()"/>-->
        <!--            </v-card>-->
        <!--          </div>-->
        <!--        </div>-->
        <div>{{ table_data }}</div>
      </div>
      <div v-if="mixEdit" class="table-preview-wrapper" style="background: red">
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
