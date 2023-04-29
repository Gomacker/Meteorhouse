<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref} from "vue";
// import st from '@/assets/worldflipper/schedule_test.json'
import moment from "moment";
import axios from "axios";
const st = ref({})
axios.get(
    'https://wf-calendar.miaowm5.com/data/info.json'
).then(r => {
  st.value = r.data
  calendar.schedule = schedule_it(st.value)
})
class ScheduleObject {
  public readonly data: any;

  constructor(data: any) {
    this.data = data
  }

  get title() {
    return this.data['title']
  }

  get tag() {
    return this.data['tag']
  }

  get id() {
    return this.data['id']
  }

  get pic_url() {
    return `https://wf-calendar.miaowm5.com/banner/ch/${this.id}.${this.data['image']}?${this.data['edit']}`
  }

  get timeStart() {
    // return moment('timeStart' in this.data ? this.data['timeStart'] : undefined)
    if ('timeStart' in this.data) {
      return moment(this.data['timeStart'])
    } else {
      return moment().date(1).hours(0).minutes(0).seconds(0)
    }
  }

  get timeEnd() {
    return moment(this.data['timeEnd'])
  }
}

function schedule_it(st: any): Array<ScheduleObject> {
  const r = []
  for (let s of st.list[1].list) {
    r.push(new ScheduleObject(s))
  }
  return r
}

function filter_schedules(future: boolean) {

  const schs = future ? calendar.schedule.filter(value => value.tag === '千里眼') : calendar.schedule.filter(value => value.tag !== '千里眼')

  return schs.sort((x, y) => {
    return x.timeEnd.valueOf() - y.timeEnd.valueOf()
  })
}

const calendar = reactive({
  now: moment().add(0, 'd'),
  schedule: []
})

function get_days(): Array<moment.Moment> {
  const basic_day = calendar.now.clone()
  const day_list = []
  for (let i = 0; i < 90; i++) {
    day_list.push(basic_day.clone().add(i - 1, 'd'))
  }
  // pre_day = pre_day.to() + 1
  return day_list
}

let timer: any
onMounted(() => {
  timer = setInterval(() => {
    calendar.now = moment().add(0, 'd')
  }, 1500)
})
onUnmounted(() => {
  clearInterval(timer)
})
const sc_height = 192
const sc_width = 96
const sc_margin = 2
const props = defineProps({
  future: {
    type: Boolean,
    require: false,
    default: false
  }
})
const sheet_height = ref(filter_schedules(props.future).length * (sc_height + sc_margin + 8) + sc_margin)
const position_left = ref(sc_width)
</script>
<template>
  <div style="width: fit-content;">
    {{ st }}
    <el-slider v-model="position_left" :min="sc_width * -90" :max="sc_width * 4" style="width: 100vw;"></el-slider>
    <div style="overflow: hidden;">
      <div :style="{'margin-left': `${position_left}px`}">
        <div
            :style="{height: `${sheet_height + sc_height}px`}"
            style="position: absolute; width: 2px; z-index: 5; box-shadow: -4px 0 8px red; background-color: rgba(255, 0, 0, 1);"
        />
        <div
            style="display: flex; flex-direction: row;"
            :style="{'margin-left': `${-96 + (-96 * ((calendar.now.valueOf() - calendar.now.clone().hours(0).minutes(0).seconds(0).milliseconds(0).valueOf()) / 86400000))}px`}"
        >
          <div style="position:absolute; z-index: 1;" :style="{'margin-top': `${sc_height}px`}">
            <div
                :key="s"
                v-for="s in filter_schedules(props.future)"
                :style="{
                width: `${96 * ((s.timeEnd - s.timeStart) / 86400000)}px`,
                margin: `${sc_margin}px 0`,
                height: `${sc_height}px`,
                left: `${96 + 96 * ((s.timeStart - calendar.now.valueOf()) / 86400000)}px`
              }"
                style="opacity: 0.8; border: 4px white solid; border-radius: 8px; box-sizing: content-box; box-shadow: 0 0 4px black;"
            >
<!--              {{ calendar.now - s.timeStart }}-->
              <div
                  style="height: 0;"
                  :style="{left: `${Math.max(96 * ((calendar.now - s.timeStart) / 86400000), 0)}px`}"
              >
                <div
                    style="display: flex; z-index: 2; background-color: rgba(255, 255, 255, 0.85); width: fit-content; margin-right: -1000px; padding: 0 4px; font-size: 22px; color: black">
                  <div style="min-width: 420px;">{{ s.title }}</div>
                  <span>
                  {{ s.timeStart.format('MM月DD日 hh:mm') }}
                  ~
                  {{ s.timeEnd.format('MM月DD日 hh:mm') }}
                </span>
                </div>
              </div>
              <el-image :src="s.pic_url" style="width: inherit; height: inherit;" fit="cover"></el-image>
            </div>
          </div>
          <div v-for="(i, key) in get_days()" :key="key">
            <div
                style="flex: 1; border: 1px rgba(0, 0, 255, 0.25) dashed; box-sizing: border-box;"
                :style="{width: `${sc_width}px`, background: i.day() === 4 ? 'rgb(255, 0, 255, 0.2)' : (i.day() === 6 || i.day() === 0 ? 'rgb(135,223,255,0.5)' : '')}"
            >
              <div style="background-color: rgba(0, 255, 255, 0.2);" :style="{height: `${sc_height}px`}">
                <div>
                  {{ i.format('MM月DD日') }}
                </div>
                <div>
                  {{
                    {0: '星期日', 1: '星期一', 2: '星期二', 3: '星期三', 4: '星期四', 5: '星期五', 6: '星期六'}[i.day()]
                  }}
                </div>
              </div>
              <div :style="{height: `${sheet_height}px`}"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "ScheduleCalender",
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>