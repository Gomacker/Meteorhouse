<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import moment from 'moment/moment'
import chroma from 'chroma-js'

const st = ref([])
axios.get('https://wf-calendar.miaowm5.com/data/info.json').then((r) => {
  st.value = r.data['list'][1]['list']
  // calendar.schedule = schedule_it(st.value)
})

class ScheduleEntries {

}

class Schedule {

}

const debug_items = [
  '大型活动',
  '竞速活动',
  '降临讨伐',
  'Pick Up',
  '卡池',
  '卡池',
  '任务活动',
  '福利活动'
]
const calendar = reactive({
  now: moment().add(0, 'd'),
  schedule: []
})

function get_days(): Array<moment.Moment> {
  const basic_day = calendar.now.clone()
  const day_list = []
  for (let i = 0; i < 60; i++) {
    day_list.push(basic_day.clone().add(i - 1, 'd'))
  }
  // pre_day = pre_day.to() + 1
  return day_list
}

const render_info = {
  month: 0,
  day_width: 48
}
const color = {
  main: '#8effcd',
  sub: '#b1f1ff'
}
</script>

<template>
  <div>
<!--    <div>ScheduleCalendar</div>-->
    <div style="display: flex; width: fit-content; align-items: flex-start">
      <div
        style="
          display: flex;
          flex-direction: column;
          z-index: 1;
          box-shadow: 0 0 3px black;
          margin-top: 36px;
        "
      >
        <template v-for="(i, index) in debug_items" :key="index">
          <div
            style="
              height: 65px;
              border-right: 1px rgba(127 127 127 / 0.5) dashed;
              background: gray;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              /*text-align: center;*/
            "
            :style="{
              width: `${render_info.day_width * 2}px`
            }"
          >
            {{ i }}
          </div>
        </template>
      </div>
      <div>
        <div style="z-index: 1; filter: drop-shadow(0 0 2px black)">
          <div style="display: flex; width: fit-content">
            <div
              v-for="(day, index) in get_days()"
              :key="index"
              style="text-align: center"
              :style="{ width: `${render_info.day_width}px` }"
            >
              <div
                v-if="render_info.month !== day.month()"
                style="border-radius: 0 6px 0 0; font-size: 12px; background: gray; color: white"
              >
                {{
                  (() => {
                    render_info.month = day.month()
                    return `${day.month() + 1}月`
                  })()
                }}
              </div>
            </div>
          </div>
          <div style="display: flex; width: fit-content">
            <template v-for="(day, index) in get_days()" :key="index">
              <div
                style="
                  /*width: 48px;*/
                  border-right: 1px gray dashed;
                  /*border-left: 1px gray dashed;*/
                  text-align: center;
                "
                :style="{
                  width: `${render_info.day_width}px`,
                  background: day.day() == 4 ? chroma(color.sub) : chroma(color.main)
                }"
              >
                {{ day.date() }}
              </div>
            </template>
          </div>
        </div>
        <div style="overflow: hidden;">
          <div style="position: absolute; margin-top: 1px">
            <div
              style="display: flex"
              v-for="i in st ? st.length : 0"
              :key="i"
            >
              <template v-for="(day, index) in get_days()" :key="index">
                <div
                  style="
                  /*width: 48px;*/
                  height: 65px;
                  border-right: 1px rgba(127 127 127 / 0.5) dashed;
                  /*margin: 1px 0;*/
                  /*border: 2px solid gray;*/
                  /*border-right: 1px gray dashed;*/
                  /*border-left: 1px gray dashed;*/
                  text-align: center;
                "
                  :style="{
                  width: `${render_info.day_width}px`,
                  background:
                    day.day() == 4
                      ? chroma(color.sub).alpha(i % 2 ? 0.25 : 0.5)
                      : chroma(color.main).alpha(i % 2 ? 0.25 : 0.5)
                }"
                ></div>
              </template>
            </div>
          </div>
          <div v-if="st">
            <template
              v-for="(row, id_) in Array.from(st).sort(
              (a, b) => a['timeStart'] - b['timeStart']
            )"
              :key="id_"
            >
              <div
                style="
                /*height: 63px;*/
                height: 62px;
                margin: 3px 0;
                /*width: 480px;*/
                background-color: white;
                border-radius: 8px;
                border: 2px solid white;
                box-shadow: 0 0 2px black;
                overflow: hidden;
                transition: all 0.4s ease;
              "
                :style="{
                left: `${
                  render_info.day_width +
                  (row['timeStart']
                    ? ((moment(row['timeStart']) - moment()) / 1000 / 60 / 60 / 24) *
                      render_info.day_width
                    : 0)
                }px`,
                width: `${
                  ((moment(row['timeEnd']) - moment(row['timeStart'])) / 1000 / 60 / 60 / 24) *
                  render_info.day_width
                }px`
              }"
              >
                <!--          {{ moment(row['timeStart']).format('YYYY/MM/DD hh:mm:ss') }}-->
                <!--          {{ (moment(row['timeStart']) - moment()) / 1000 / 60 / 60 / 24 }}-->
                <!--          {{ (moment(row['timeEnd']) - moment(row['timeStart'])) / 1000 / 60 / 60 / 24 }}-->
                <!--            {{ `https://wf-calendar.miaowm5.com/banner/ch/${row['id']}.${row['image']}?${row['edit']}` }}-->
                <el-image
                  :src="`https://wf-calendar.miaowm5.com/banner/ch/${row['id']}.${row['image']}?${row['edit']}`"
                  style="width: 100%; height: 100%"
                  fit="cover"
                />
                <!--          {{ row }}-->
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!--    <div>{{ JSON.stringify(st) }}</div>-->
  </div>
</template>

<style scoped></style>