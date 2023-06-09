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
  table_list.value = new Map(Object.entries(r.data['tables']).map((value) => {
    return [
      value[0],
      {
        name: value[1]['name'],
        img: value[1]['img'],
        type: TableType.DEFAULT
      }
    ]
  }))
})
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <el-scrollbar>
      <div
        style="
          margin: 32px 0;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-evenly;
        "
      >
        <el-card
          class="table-card"
          shadow="hover"
          body-style="padding: 0; display: flex; justify-content: center; align-items: center;"
          :key="table_profile[0]"
          v-for="table_profile in table_list.entries()"
          @click="$router.push(`/table/${table_profile[0]}`)"
        >
          <div style="display: flex; flex-direction: column; align-items: center">
            <el-image
              style="min-height: 60px"
              :src="table_profile[1].img ? table_profile[1].img : '/static/worldflipper/st/banner/world_flipper-1609036650079981568-img1.png'"
              fit="contain"
              draggable="false"
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
          </div>
        </el-card>
      </div>
    </el-scrollbar>
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
  margin: 8px;
  cursor: pointer;
  width: 45%;
  border-radius: 16px;
  font-size: 16px;
  //min-height: 60px;
  max-width: 320px;
}
.table-card:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 0 16px rgba(0 0 0 / 0.6);
}
</style>
