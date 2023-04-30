<script setup lang="ts">
import { ref } from 'vue'
import PlayerCard from '@/components/card/PlayerCard.vue'
import axios from 'axios'

interface PlayerData {
  player_id: number
  name: string
  rank: number
  comment: string
  leader_show_awaken: boolean
  leader_character_id: number
}

const player_id = ref('')
const player_data = ref<PlayerData | undefined>(undefined)

function get_data(pid: string) {
  axios
    .post('/api/v1/query/player/', {
      player_id: pid
    })
    .then((r) => {
      console.log(r.data)
      const ctt = r.data['content']
      player_data.value = {
        player_id: ctt['player_id'],
        name: ctt['name'],
        rank: ctt['rank'],
        comment: ctt['comment'],
        leader_show_awaken: ctt['leader_show_awaken'],
        leader_character_id: ctt['leader_character_id']
      }
    })
}
</script>

<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div style="display: flex; flex-direction: column; align-items: center">
      {{ player_data }}
      <div style="display: flex; flex-direction: column; align-items: center" v-if="player_data">
        <PlayerCard
          :player_id="player_data.player_id"
          :name="player_data.name"
          :rank="player_data.rank"
          :comment="player_data.comment"
          :leader_show_awaken="player_data.leader_show_awaken"
          :leader_character_id="player_data.leader_character_id"
        ></PlayerCard>
        <span style="color: red"
          >[DEBUG]*ps: Large版的PlayerCard后续写一个比较好看的队伍模版再补</span
        >
      </div>
      <div style="text-align: center" v-else>玩家不存在哦~</div>
      <div style="display: flex; flex-direction: row">
        <el-input
          :maxlength="9"
          v-model="player_id"
          :formatter="
            (v) => {
              const exec = /\d{0,9}/.exec(v)
              return exec ? exec[0] : ''
            }
          "
        ></el-input>
        <el-button style="margin-left: 16px" type="primary" @click="get_data(player_id)">
          查询
        </el-button>
      </div>
        <div>
            282925735
        </div>
    </div>
  </div>
</template>

<style scoped></style>
