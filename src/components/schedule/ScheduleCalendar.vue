<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const st = ref({})
axios.get('https://wf-calendar.miaowm5.com/data/info.json').then((r) => {
  st.value = r.data
  // calendar.schedule = schedule_it(st.value)
})
</script>

<template>
  <div>
    <div>ScheduleCalendar</div>
    <!--    <div>{{ st['list'][1]['flag'] }}</div>-->
    <template v-if="Object.keys(st).length">
      <template v-for="(row, id_) in st['list'][1]['list']" :key="id_">
        <div
          style="
            height: 63px;
            margin: 2px 0;
            width: 480px;
            background-color: white;
            border-radius: 6px;
            border: 2px solid red;
            overflow: hidden;
          "
        >
          <!--            {{ `https://wf-calendar.miaowm5.com/banner/ch/${row['id']}.${row['image']}?${row['edit']}` }}-->
          <el-image
            :src="`https://wf-calendar.miaowm5.com/banner/ch/${row['id']}.${row['image']}?${row['edit']}`"
            style="width: 100%; height: 100%"
            fit="cover"
          />
          {{ row }}
        </div>
      </template>
    </template>
    <div>{{ JSON.stringify(st) }}</div>
  </div>
</template>

<style scoped></style>
