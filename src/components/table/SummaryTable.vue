<script setup lang="ts">
import type { Table } from '@/components/table/table'
import TableComponentTextContent from '@/components/table/elements/TableComponentTextContent.vue'
import SummaryTableContent from '@/components/table/SummaryTableContent'
import './elements/BasicElements'
import './elements/WorldflipperElements'
import './table.css'

const props = defineProps<{ table: Table }>()
</script>

<template>
  <div
    class="table elevation-6"
    style="width: 1036px; overflow: hidden"
    :style="{
      '--main-color': table.property.get_color_main(1),
      '--sub-color': table.property.get_color_sub(1),
      '--main-background-color': table.property.get_color_main(0.8),
      '--sub-background-color': table.property.get_color_sub(0.45),
      '--little-about-color': table.property.get_color_sub(0.75)
    }"
  >
    <div class="table-header" style="background: white">
      <div
        :style="table.property.banner"
        style="height: 540px; display: flex; flex-direction: column; align-items: center"
      >
        <div class="table-title">
          <TableComponentTextContent class="table-title-text" :content="table.property.title" />
        </div>
        <div style="position: absolute; font-size: 32px; padding: 0 4px; left: 0; bottom: 0">
          <TableComponentTextContent
            style="font-weight: bolder"
            :content="table.property.update_time"
          />
        </div>
        <div class="table-little-about">
          <TableComponentTextContent :content="table.property.little_about" />
        </div>
      </div>
    </div>
    <div :style="table.property.background">
      <div style="image-rendering: auto; background: var(--sub-background-color)">
        <SummaryTableContent :content="table.content" />
        <div
          class="table-footer"
          :style="{
            background: `linear-gradient(to bottom, transparent,
            ${table.property.get_color_main(0.8)} 65%,
            ${table.property.get_color_main(1)} 100%)`
          }"
        >
          <v-divider
            style="width: 95%; margin: 8px 0; border-top-color: var(--sub-color)"
            class="border-opacity-100"
          />
          <TableComponentTextContent
            style="
              font-size: 22px;
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              padding: 16px;
              color: white;
            "
            html_access
            :text_border="false"
            :content="table.property.footer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
