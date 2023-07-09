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

class ScheduleType {

}

class Schedule {}

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
  <div style="min-width: max-content">
    <div
      class="elevation-8"
      style="
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: #444;
        color: white;
        display: flex;
      "
    >
      <div v-ripple class="event-column" style="width: 500px">
        <v-img
          @dragstart.prevent
          :src="'/static/worldflipper/logo/world_story_event/crown_beasts/crown_beasts_logo.png'"
        />
      </div>
      <div v-ripple class="event-column">
        <v-img
            @dragstart.prevent
            :src="'/static/worldflipper/logo/advent_event/advent_event_logo_01.png'"
        />
      </div>
      <div v-ripple class="event-column">
        <v-img
          @dragstart.prevent
          :src="'/static/worldflipper/logo/advent_event/advent_event_logo_01.png'"
        />
      </div>
      <div v-ripple class="event-column" v-for="c in ['卡池A', '卡池B']" :key="c">
        {{ c }}
      </div>
      <div
        v-ripple
        class="event-column"
        style="width: 7.5%; font-size: 22px"
        v-for="c in ['小活动1', '小活动2', '小活动3', '小活动4']"
        :key="c"
      >
        {{ c }}
      </div>
    </div>
    <div
      style="
        display: flex;
        background: repeating-linear-gradient(
          to bottom,
          rgba(0, 255, 127, 0.2) 0,
          rgba(0, 255, 127, 0.2) 158px,
          black 160px
        );
      "
    >
      <div style="padding: 2px; border: 1px white solid; right: 0; height: 2400px; width: 500px">
        <div
          v-ripple
          style="
            width: 100%;
            height: 100%;
            border: 4px white solid;
            border-radius: 2.5vh;
            overflow: hidden;
          "
        >
          <div style="position: absolute">
            <v-img
              style="position: relative; left: 0; z-index: 1; height: 90vh"
              @dragstart.prevent
              cover=""
              :src="'/static/worldflipper/unit/full/awakened/alk.png'"
            />
          </div>
          <v-parallax
            @dragstart.prevent
            style="width: 100%; height: 100%; image-rendering: pixelated"
            :src="'/static/worldflipper/st/background/beast_king.png'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-column {
  border: 1px red dashed;
//width: 10%;
  width: 200px;
  height: 64px;
  flex-shrink: 0;
  font-family: Arial, '黑体', serif;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style>
