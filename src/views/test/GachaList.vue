<script setup lang="ts">
import { ref } from 'vue'
import { Character } from '@/anise/worldflipper/object'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import QuestEventBanner, { QuestEvent } from '@/components/worldflipper/event/QuestEventBanner.vue'
import moment from "moment";
import TableComponentTextContent from "@/components/table/elements/TableComponentTextContent.vue";

interface GachaEvent {
  id: string
  characters: Array<Character>
}

interface Event {
  id: string
}

interface EventSet {
  time: number
  main_event: Event
  gacha_events: Array<GachaEvent>
}
interface EventSet2 {
  time: moment.Moment | undefined
  time_legacy: moment.Moment | undefined
  description: string
  quest: QuestEvent
}
const worldflipper = useWorldflipperDataStore()
const event_list = ref<Array<EventSet2>>([])

// const theme_color = {
//   0: '#FF4500',
//   1: '#1E90FF',
//   2: '#008000',
//   3: '#8A2BE2'
// }

event_list.value.push(
  {
    time: moment('2023/7/10'),
    time_legacy: undefined,
    description: '[icon:new]凉宫春日的跳跃\n　\n[icon:desc_fire]有利 降临讨伐',
    quest: {
      id: 'advent_event/advent_scollab_event_banner',
      table_id: 'event_suzumiya'
    }
  },
  {
    time: moment('2023/8/9'),
    time_legacy: moment('2021/10/12'),
    description: '[icon:new]土俑嘉年华\n　\n[icon:desc_dark]有利 竞分活动',
    quest: {
      id: 'haniwa_carnival/haniwa_carnival_03',
      table_id: ''
    }
  },
  {
    time: moment('2023/7/26'),
    time_legacy: moment('2021/10/12'),
    description: '为你奏响的镇魂歌\n　\n[icon:desc_dark]有利 降临讨伐',
    quest: {
      id: 'advent_event/event_advent_hw20',
      table_id: ''
    }
  },
  {
    time: moment('2023/8/9'),
    time_legacy: moment('2021/11/11'),
    description: '祈愿吧，光之继承者们。\n　\n[icon:desc_light]有利 剧情活动',
    quest: {
      id: 'world_story_event/anv_story_01/prequel',
      table_id: ''
    }
  },
  {
    time: moment('2023/8/17'),
    time_legacy: moment('2021/11/11'),
    description: '[icon:new]赤之女王\n　\n[icon:desc_water]有利 领主特选',
    quest: {
      id: 'boss_battle_31_empress_01',
      table_id: ''
    }
  },
  {
    time: undefined,
    time_legacy: moment('2021/11/27'),
    description: '[icon:new]前进吧，暗之梦旅人们。\n　\n[icon:desc_dark]有利 剧情活动',
    quest: {
      id: 'world_story_event/anv2/anv2',
      table_id: ''
    }
  },
  {
    time: undefined,
    time_legacy: moment('2021/11/27'),
    description: '[icon:new]战阵之宴',
    quest: {
      id: 'raid_event/raid_event_banner_01_001',
      table_id: ''
    }
  },
  {
    time: undefined,
    time_legacy: moment('2021/12/17'),
    description: '[icon:new]聖夜の暴れん坊\n　\n[icon:desc_fire]有利 降临讨伐',
    quest: {
      id: 'advent_event/event_advent_xm21',
      table_id: ''
    }
  },
  {
    time: undefined,
    time_legacy: moment('2021/12/17'),
    description: '[icon:new]土俑嘉年华\n　\n[icon:desc_thunder]有利 竞分活动',
    quest: {
      id: 'haniwa_carnival/haniwa_carnival_04',
      table_id: ''
    }
  },
  {
    time: undefined,
    time_legacy: moment('2021/12/31'),
    description: '赤之女王\n　\n[icon:desc_water]有利 领主特选',
    quest: {
      id: 'boss_battle_31_empress_01',
      table_id: ''
    }
  },
  {
    time: undefined,
    time_legacy: moment('2022/1/11'),
    description: '共誓黎明\n　\n[icon:desc_water]有利 剧情活动',
    quest: {
      id: 'world_story_event/desert_bonds_01/prequel',
      table_id: 'event_gslm'
    }
  },
  {
    time: undefined,
    time_legacy: moment('2022/1/16'),
    description: '异界漂泊谭\n　\n[icon:desc_water]有利 降临讨伐',
    quest: {
      id: 'advent_event/advent_Rcollab_event_banner',
      table_id: ''
    }
  },
  {
    time: undefined,
    time_legacy: moment('2022/1/24'),
    description: '摇曳的迷宫 崩坏域\n深渊之兽\n[highlight]常驻化[end]',
    quest: {
      id: 'challenge_dungeon_event/challenge_dungeon_banner_campaign_01',
      table_id: 'abs'
    }
  }
)
event_list.value.sort((v1, v2) => {
  const v1_ = v1.time_legacy ? v1.time_legacy.valueOf() : 10000000000000
  const v2_ = v2.time_legacy ? v2.time_legacy.valueOf() : 10000000000000
  return v1_ - v2_
})
event_list.value.sort((v1, v2) => {
  const v1_ = v1.time ? v1.time.valueOf() : 10000000000000
  const v2_ = v2.time ? v2.time.valueOf() : 10000000000000
  return v1_ - v2_
})
</script>

<template>
  <div style="width: 1036px; background: #0f0; padding: 1px 0">
    <div
      class="elevation-6"
      style="border-radius: 6px; background: #fff; margin: 16px"
      v-for="e in event_list"
      :key="e"
    >
      <div style="background: url('/static/worldflipper/dialog_deco2.png') 100% 100% no-repeat">
        <div
          style="
            display: grid;
            padding: 8px;
            grid-template-columns: 110px 110px max-content auto;
            /*padding: 0 4px 4px 4px;*/
            margin: 4px;
            border-radius: 16px;
            /*align-items: center;*/
          "
        >
          <div
            style="
              align-self: center;
              font-size: 20px;
              font-family: 'UD Digi Kyokasho NP-B', sans-serif;
              text-align: center;
              /*background-clip: text;*/
              -webkit-background-clip: text;
              -webkit-text-fill-color: white;
              -webkit-text-stroke: 0.25em transparent;
              /*margin-right: 8px;*/
              background-color: blueviolet;
            "
          >
            <template v-if="e.time === undefined">
              <div
                style="
                font-size: 26px;
                background-color: inherit;
                /*background-clip: inherit;*/
                -webkit-background-clip: inherit;
                padding: 0.25em;
                margin: -0.25em;
              ">
                --
              </div>
            </template>
            <template v-else>
              <div
                style="
                font-size: 14px;
                background-color: inherit;
                /*background-clip: inherit;*/
                -webkit-background-clip: inherit;
                padding: 0.25em;
                margin: -0.25em;
              "
              >
                {{ e.time?.year() }}
              </div>
              <div
                style="
                font-size: 26px;
                background-color: inherit;
                /*background-clip: inherit;*/
                -webkit-background-clip: inherit;
                padding: 0.25em;
                margin: -0.25em;
              "
              >
                {{ e.time?.month() + 1 }}/{{ e.time?.date() }}
              </div>
            </template>
          </div>
          <div
            style="
              align-self: center;
              font-size: 20px;
              font-family: 'UD Digi Kyokasho NP-B', sans-serif;
              text-align: center;
              /*background-clip: text;*/
              -webkit-background-clip: text;
              -webkit-text-fill-color: white;
              -webkit-text-stroke: 0.25em transparent;
              /*margin-right: 8px;*/
              background-color: green;
            "
          >
            <template v-if="e.time_legacy === undefined">
              <div
                style="
                font-size: 26px;
                background-color: inherit;
                /*background-clip: inherit;*/
                -webkit-background-clip: inherit;
                padding: 0.25em;
                margin: -0.25em;
              ">
                --
              </div>
            </template>
            <template v-else>
              <div
                style="
                font-size: 14px;
                background-color: inherit;
                /*background-clip: inherit;*/
                -webkit-background-clip: inherit;
                padding: 0.25em;
                margin: -0.25em;
              "
              >
                {{ e.time_legacy?.year() }}
              </div>
              <div
                style="
                font-size: 26px;
                background-color: inherit;
                /*background-clip: inherit;*/
                -webkit-background-clip: inherit;
                padding: 0.25em;
                margin: -0.25em;
              "
              >
                {{ e.time_legacy?.month() + 1 }}/{{ e.time_legacy?.date() }}
              </div>
            </template>
          </div>
          <QuestEventBanner style="max-width: 480px; border-radius: 8px" :event="e.quest" />
          <TableComponentTextContent style="padding: 4px 8px; font-size: 18px" :content="e.description" :text_border="false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
