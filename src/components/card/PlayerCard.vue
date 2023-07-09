<script setup lang="ts">
import { manager, Unit } from '@/stores/manager'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'

const props = defineProps({
    player_id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: ''
    },
    rank:  {
        type: Number,
        default: 0
    },
    leader_show_awaken: Boolean,
    comment: {
        type: String,
        default: ''
    },
    // degree: Degree,
    leader_character_id: {
        type: Number,
        default: 0
    },
})
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
    <UnitPicOrigin
      :size="120"
      v-if="typeof props.leader_character_id == 'number' && manager.unit_data.get(props.leader_character_id) instanceof Unit"
      :unit="manager.unit_data.get(props.leader_character_id)"
      :awakened="leader_show_awaken"
    ></UnitPicOrigin>
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
        <div style="font-size: 22px">RANK {{ props.rank }} {{ props.name }}</div>
        <el-divider style="margin: 4px"></el-divider>
        <div style="font-size: 16px">
            {{ props.comment }}
        </div>
      </div>
      <div style="font-size: 16px; color: gray;">ID: {{ props.player_id }}</div>
    </div>
  </div>
</template>

<style scoped></style>
