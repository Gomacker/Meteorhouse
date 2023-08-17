<script setup lang="ts">
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import CharacterIcon from "@/components/worldflipper/character/CharacterIcon.vue";
import { computed } from "vue";

interface PlayerCard {
  player_id: number
  rank: number
  name: string
  comment: string
  leader_show_awaken: boolean
  leader_character_id: string
}

const props = defineProps<PlayerCard>()

const worldflipper = useWorldflipperDataStore()
const character = computed(() => worldflipper.characters.get(props.leader_character_id))
</script>

<template>
  <div
    style="
      width: 480px;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 0 8px rgba(0 0 0 / 0.6);
      margin: 16px;
      display: flex;
      flex-direction: row;
      background: white url(/static/worldflipper/dialog_deco2.png) no-repeat;
      background-position-x: 100%;
      background-position-y: 100%;
    "
  >
    <CharacterIcon
      :size="120"
      :obj="character"
      :awakened="leader_show_awaken"
    />
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
        <div style="font-size: 22px">RANK {{ rank }} {{ name }}</div>
        <v-divider style="margin: 4px"></v-divider>
        <div style="font-size: 16px">
          {{ comment }}
        </div>
      </div>
      <div style="font-size: 16px; color: grey">ID: {{ player_id }}</div>
    </div>
  </div>
</template>

<style scoped></style>
