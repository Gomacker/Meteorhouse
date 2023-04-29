<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import RoomCard from '@/components/card/RoomCard.vue'

const emotion_click_count = ref(0)
const emotion = ref('>w<')
const emotion_list = ['>w<', '>.<', '0.0', '^_^', '( •̀ ω •́ )✧', 'ヾ(≧へ≦)〃', 'இ௰இ']

const room_number = ref('')

const room_data = ref()
const debug_data = ref()

function check_room_number(s: string) {
  const tempf = (v: string) => {
    const exec = /\d{0,6}/.exec(v)
    return exec ? exec[0] : ''
  }
  const new_value = tempf(s)
    if (new_value && new_value.length <= 6) {
        room_number.value = new_value
    }
}

function get_room() {
  axios.post('/api/v1/query/room/', { room_id: room_number.value }).then((r) => {
    if (r.data['result'] === 'success') {
      room_data.value = r.data['content']
    } else {
      room_data.value = {}
    }
    debug_data.value = r.data
    // room_number.value = r.data['room_number']
  })
}
</script>
<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <div style="display: flex; flex-direction: column; align-items: center">
      <template v-if="room_data && room_data['exists']">
        <RoomCard
          :quest_name="room_data['name']"
          :room_number="room_data['room_number']"
          :background_url="room_data['background_url']"
          :image_url="room_data['image_url']"
        />
      </template>
      <template v-else>
        <div
          style="
            width: 480px;
            height: 160px;
            margin: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          房间不存在惹~
        </div>
      </template>
      <div style="color: red;">[DEBUG]{{ JSON.stringify(debug_data) }}</div>
      <div style="display: flex; flex-direction: row">
        <el-input
          maxlength="6"
          v-model="room_number"
          :formatter="
            (v) => {
              const exec = /\d{0,6}/.exec(v)
              return exec ? exec[0] : ''
            }
          "
        ></el-input>
        <el-button style="margin-left: 16px" type="primary" @click="get_room">查询</el-button>
      </div>
      <div style="width: 360px; display: flex; flex-wrap: wrap; justify-content: space-between">
        <div v-for="i in 9" :key="i" style="flex: 33.33%; padding: 4px">
          <div @click="check_room_number(`${room_number}${i}`)" class="room-keyboard-button" style="font: 28px Arial, sans-serif">
            {{ i }}
          </div>
        </div>
        <div @click="room_number = ''" style="flex: 33.33%; padding: 4px">
          <div class="room-keyboard-button" style="font: 20px Arial, sans-serif">清空</div>
        </div>
        <div @click="check_room_number(`${room_number}0`)" style="flex: 33.33%; padding: 4px">
          <div class="room-keyboard-button" style="font: 28px Arial, sans-serif">0</div>
        </div>
        <div style="flex: 33.33%; padding: 4px">
          <div
            class="room-keyboard-button"
            @click="
              () => {
                if (emotion_click_count >= 4)
                  emotion = emotion_list[Math.round(Math.random() * emotion_list.length)]
                else emotion_click_count++
              }
            "
            style="font: 20px Arial, sans-serif"
          >
            {{ emotion }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*#container {*/
/*    zoom: 0.75;*/
/*}*/
.room-keyboard-button {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  height: 60px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px black;
  filter: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.room-keyboard-button:active {
  background-color: rgba(135, 223, 255, 0.83);
  transform: scale(1.05, 1.05);
  transform-origin: center center;
}
</style>