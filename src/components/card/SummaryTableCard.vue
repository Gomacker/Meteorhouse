<script setup lang="ts">
import { Table } from '@/stores/table'
import PartyCardEliya from '@/components/party/PartyCardEliya.vue'
import { manager, PartyRelease } from '@/stores/manager'
import TableComponentTextContent from '@/views/table/TableComponentTextContent.vue'
import UnitLiteCard from '@/components/card/UnitLiteCard.vue'
import UnitWikiCard from '@/components/card/UnitWikiCard.vue'
import ArmamentWikiCard from '@/components/card/ArmamentWikiCard.vue'

const props = defineProps({
  table: {
    type: Table,
    require: true,
    default: new Table({})
  }
})
</script>

<template>
  <div
    v-if="props.table instanceof Table"
    class="table"
    style="width: 1036px; overflow: hidden"
    :style="{
      '--main-color': props.table.property.get_color_main(1),
      '--sub-color': props.table.property.get_color_sub(1),
      '--main-background-color': props.table.property.get_color_main(0.6),
      '--sub-background-color': props.table.property.get_color_sub(0.6)
    }"
  >
    <div class="head" style="background-color: white">
      <div
        class="title"
        style="
          background: linear-gradient(to bottom, var(--sub-color), var(--sub-background-color));
          width: 100%;
          display: flex;
          justify-content: center;
        "
      >
        <div
          style="
            background: var(--main-color);
            padding: 8px;
            margin: -4px;
            -webkit-background-clip: text;
            -webkit-text-fill-color: white;
            -webkit-text-stroke: 0.12em transparent;
            font: 64px '黑体';
          "
        >
          {{ props.table.property.title }}
        </div>
      </div>
    </div>
    <div :style="'' + props.table.property.background.replace('/assets', '/static')">
      <div style="image-rendering: auto; background: var(--sub-background-color)">
        <div class="content-container" style="display: flex; flex-direction: row; flex-wrap: wrap">
          <template v-for="(c, key) in props.table.content" :key="key">
            <div
              v-if="c.type === 'Row'"
              style="
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                justify-content: space-evenly;
              "
            >
              <template v-for="(element, key) in c.data.elements" :key="key">
                <template v-if="element.type === 'Party'">
                  <div style="padding: 0; margin: 4px">
                    <PartyCardEliya
                      :party="PartyRelease.loads(element.data.party)"
                      style="
                        border: 6px solid var(--main-color);
                        background-color: #fff;
                        border-radius: 8px;
                      "
                    >
                    </PartyCardEliya>
                  </div>
                </template>
                <template v-else-if="element.type === 'PartyUnion'">
                  <div
                    style="
                      width: 998px;
                      /*background: blue;*/
                      margin: 8px;
                      border-radius: 16px;
                      background-color: rgb(250, 250, 250);
                      box-shadow: 0 0 16px rgb(0, 0, 0, 0.6);
                    "
                  >
                    <div
                      style="
                        width: 100%;
                        padding: 12px;
                        border-radius: inherit;
                        background: url('/static/worldflipper/dialog_deco2.png') no-repeat;
                        background-position-x: 100%;
                        background-position-y: 100%;
                        /*filter: drop-shadow(0 0 4px black);*/
                        /*background-size: 200px;*/
                      "
                    >
                      <div style="margin-left: -12px">
                        <span
                          style="
                            color: white;
                            background: linear-gradient(
                              240deg,
                              transparent 12px,
                              rgb(234, 53, 75) 13px
                            );
                            padding: 2px 16px 2px 8px;
                          "
                        >
                          {{ element.data['pre_title'] }}
                        </span>
                        <span
                          style="
                            font-size: 18px;
                            margin: 4px;
                            font-weight: bold;
                            color: rgb(79, 79, 79);
                          "
                        >
                          {{ element.data.title }}
                        </span>
                      </div>
                      <div style="display: flex; margin: 4px 0">
                        <PartyCardEliya :party="PartyRelease.loads(element.data.party)">
                        </PartyCardEliya>
                        <div
                          style="
                            font-size: 16px;
                            padding: 0 24px;
                            font-family: Arial, 华文细黑, serif;
                          "
                        >
                          {{ element.data.content }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else-if="element.type === 'TextRegion'">
                  <TableComponentTextContent
                    style="
                      margin: 0 4px;
                      box-sizing: content-box;
                      padding: 0 6px;
                      /*background-color: rgba(255, 255, 255, 0.6);*/
                      /*border-radius: 8px;*/
                      /*border: 4px transparent solid;*/
                      /*background-color: blue;*/
                    "
                    :style="{
                      width: element.data['full'] ? '992px' : '480px',
                      'font-size': element.data['little_title'] ? '26px' : '21px',
                      'margin-top': element.data['little_title'] ? '16px' : ''
                    }"
                    :content="element.data.content"
                  />
                </template>
                <template v-else-if="element.type === 'LiteCard'">
                  <UnitLiteCard
                    style="margin: 10px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                    v-if="element.data['unit']"
                    :unit="manager.unit_data.get(element.data['unit'])"
                  />
                  <ArmamentWikiCard
                    style="margin: 10px; width: 480px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                    v-else-if="element.data['armament']"
                    :armament="manager.armament_data.get(element.data['armament'])"
                  />
                </template>
                <template v-else-if="element.type === 'WikiCard'">
                  <UnitWikiCard
                    style="margin: 10px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                    v-if="element.data['unit']"
                    :unit="manager.unit_data.get(element.data['unit'])"
                  />
                  <ArmamentWikiCard
                    style="margin: 10px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                    v-else-if="element.data['armament']"
                    :armament="manager.armament_data.get(element.data['armament'])"
                  />
                </template>
                <div v-else>未解析的组件: {{ element }}</div>
              </template>
            </div>
            <div
              style="
                background: var(--main-background-color);
                backdrop-filter: blur(2px);
                box-shadow: 0 0 16px black;
                color: white;
                font: 36px Arial, '黑体';
                width: 100%;
                font-weight: bold;
                padding: 6px 16px;
                /*margin-bottom: 16px;*/
              "
              v-else-if="c.type === 'SubTitle'"
            >
              {{ c.data['content'] }}
            </div>
            <template v-else>
              <div style="color: red">{{ key }} {{ JSON.stringify(c) }}</div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SummaryTableCard'
}
</script>

<style scoped></style>
