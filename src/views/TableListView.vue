<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

enum TableType {
  DEFAULT = 0
}

interface TableProfile {
  name: string
  img: string
  type: TableType
}

const table_list = ref<Map<string, TableProfile>>(new Map())

axios.post('/api/v1/table_list/').then((r) => {
  table_list.value = new Map(
    Object.entries(r.data['tables']).map((value: any) => {
      return [
        value[0],
        {
          name: value[1]['name'],
          img: value[1]['img'],
          type: TableType.DEFAULT
        }
      ]
    })
  )
})
</script>

<template>
  <div>
    <div
      style="
        margin: 32px 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, 320px);
        grid-gap: 16px;
        justify-content: center;
      "
    >
      <v-card
        class="table-card elevation-4"
        :key="table_profile[0]"
        v-for="table_profile in table_list.entries()"
        @click="$router.push(`/table/${table_profile[0]}`)"
      >
        <v-img
          style="min-height: 60px; height: 100%"
          @dragstart.prevent
          :aspect-ratio="16 / 9"
          :cover="true"
          :src="
            table_profile[1].img
              ? table_profile[1].img
              : '/static/worldflipper/st/banner/world_flipper-1609036650079981568-img1.png'
          "
        />
        <div
          style="
            text-align: center;
            margin-top: -24px;
            height: 24px;
            z-index: 1;
            background-color: rgba(255, 255, 255, 0.9);
            width: 100%;
          "
        >
          {{ table_profile[1].name }}
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TableListView'
}
</script>

<style scoped>
.table-card {
  user-select: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  max-width: 320px;
  transition: transform 0.4s ease;
}
.table-card:hover {
  transform: scale(1.05);
  z-index: 1;
}
</style>
