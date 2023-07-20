<script setup lang="ts">

import TableComponentTextContent from "@/views/table/TableComponentTextContent.vue";
import QuestEventBanner, { QuestEvent } from "@/components/worldflipper/event/QuestEventBanner.vue";
import moment from "moment";
export interface QuestEventSet {
  time: moment.Moment | undefined
  time_legacy: moment.Moment | undefined
  description: string
  quest: QuestEvent
}
defineProps<{
  event_set: QuestEventSet
}>()
</script>

<template>
  <div
    class="elevation-6"
    style="border-radius: 6px; background: #fff; margin: 16px"
  >
    <div style="background: url('/static/worldflipper/dialog_deco2.png') 100% 100% no-repeat">
      <div
        style="
            display: grid;
            padding: 8px;
            grid-template-columns: 12.5% 12.5% 50% 25%;
            margin: 4px;
            border-radius: 16px;
          "
      >
        <div
          style="
              align-self: center;
              font-size: 20px;
              font-family: 'UD Digi Kyokasho NP-B', sans-serif;
              text-align: center;
              -webkit-background-clip: text;
              -webkit-text-fill-color: white;
              -webkit-text-stroke: 0.25em transparent;
              background-color: blueviolet;
            "
        >
          <template v-if="!event_set.time">
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
              {{ event_set?.time.year() }}
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
              {{ event_set?.time.month() + 1 }}/{{ event_set?.time.date() }}
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
          <template v-if="!event_set.time_legacy">
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
              {{ event_set?.time_legacy.year() }}
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
              {{ event_set?.time_legacy.month() + 1 }}/{{ event_set?.time_legacy.date() }}
            </div>
          </template>
        </div>
        <QuestEventBanner style="max-width: 480px; border-radius: 8px" :event="event_set.quest" />
        <TableComponentTextContent style="padding: 4px 8px; font-size: 18px" :content="event_set.description" :text_border="false"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>