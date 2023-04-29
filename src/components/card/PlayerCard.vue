<script setup lang="ts">
import { manager, Unit } from '@/stores/manager'
import { ref } from 'vue'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'

// const test_data = {
//   viewer_id: 282925735,
//   role: 1,
//   name: 'Kranca@流星屋',
//   last_login_time: 1682592662,
//   rank: 157,
//   leader_character_evolution_img_level: 1,
//   comment: '一般路过流星屋主催 / 我要玩Arcaea口也！',
//   degree_id: 1211007,
//   leader_character_id: 151013,
//   follow_state: 0,
//   profile_image_url: null
// }

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

// function get_awaken_status(unit_id: number) {
//   for (const chara of test_data.user_character_list) {
//     if (chara.character_id === unit_id) {
//       if (chara.evolution_level) return true
//     }
//   }
//   return false
// }

// const main_unit = ref()
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
      <!--          <div>{{ test_data.target_user_info }}</div>-->
    </div>
  </div>
</template>

<style scoped></style>
