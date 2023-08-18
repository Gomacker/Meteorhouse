<script setup lang="ts">
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import { computed } from 'vue'
import type { Party } from '@/anise/worldflipper/party'

export interface PlayerProfile {
  player_id: number
  rank: number
  name: string
  comment: string
  leader_show_awaken: boolean
  leader_character_id: string
  last_login: number
  degree_id: number
  party?: Party
}
const props = defineProps<{ modelValue: PlayerProfile }>()

const worldflipper = useWorldflipperDataStore()
const character = computed(() => worldflipper.characters.get(props.modelValue.leader_character_id))
const last_login_string = computed(() => {
  const date = new Date(props.modelValue.last_login * 1000)
  const now = new Date()
  const timeDifference = now.getTime() - date.getTime()

  const minutes = Math.floor(timeDifference / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return '--'
  }
})
</script>

<template>
  <div
    style="
      width: 480px;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: row;
      background: white url(/static/worldflipper/dialog_deco2.png) no-repeat;
      background-position-x: 100%;
      background-position-y: 100%;
    "
  >
    <CharacterIcon :size="120" :obj="character" :awakened="modelValue.leader_show_awaken" />
    <div
      style="
        padding: 4px 12px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <div style="display: flex; flex-direction: column">
        <div style="font-size: 22px">RANK {{ modelValue.rank }} {{ modelValue.name }}</div>
        <v-divider style="margin: 4px"></v-divider>
        <div style="font-size: 16px">
          {{ modelValue.comment }}
        </div>
      </div>
      <div style="font-size: 16px; color: grey; display: flex; justify-content: space-between">
        <div>ID: {{ modelValue.player_id }}</div>
        <div>上次登录: {{ last_login_string }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
