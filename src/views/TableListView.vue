<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";

const table_list = ref({})

axios.post(
    '/api/v1/table_list/'
).then(r => {
      table_list.value = r.data['tables']
    }
)
</script>

<template>
  <div>
    <div style="display: flex; color: green; flex-direction: column; width: 100%;">
      <div>
        // TODO 后端接口：图像、事件ID/副本ID绑定、类型、版本管理及更改回溯
      </div>
      <div>
        // TODO 前端优化：把布局和字体调一下啊 konoyaro
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-evenly;">
      <el-card
          class="table-card"
          shadow="hover"
          body-style="padding: 0; display: flex; flex-direction: column; align-items: center;"
          :key="id"
          v-for="(id, table) in table_list"
          @click="$router.push(`/table/${id}`)"
      >
        <el-image
            style="width: 200px; height: 115px;"
            src="/static/worldflipper/st/banner/world_flipper-1609036650079981568-img1.png"
            fit="contain"
            draggable="false"
        />
        <div style="text-align: center; margin-top: -24px; height: 24px; z-index: 1; background-color: rgba(255, 255, 255, 0.9); width: 100%;">
          {{ table }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TableListView"
}
</script>

<style scoped>
.table-card {
  user-select: none;
  width: fit-content;
  margin: 8px;
  cursor: pointer;
}
/*.table-card:hover {*/
/*  box-shadow: 0 0 4px black;*/
/*}*/
</style>