<script setup lang="ts">
import {
  Table,
  TableElement,
  TableElementHtml,
  TableElementParty,
  TableElementPartyUnion,
  TableElementRow,
  TableElementSubTitle,
  TableElementTextArea,
  TableElementWikiCard
} from '@/stores/table'
import PartyCardEliya from '@/components/party/PartyCardEliya.vue'
import { Armament, Unit } from '@/stores/manager'
import TableComponentTextContent from '@/views/table/TableComponentTextContent.vue'
import UnitLiteCard from '@/components/card/UnitLiteCard.vue'
import UnitWikiCard from '@/components/card/UnitWikiCard.vue'
import ArmamentWikiCard from '@/components/card/ArmamentWikiCard.vue'

const props = defineProps<{
  table: Table | undefined
  party_style?: {
    show_name?: boolean
    show_awaken?: boolean
    show_replacements?: boolean
  }
}>()

function get_replacements_data(element: TableElement) {
  // console.log(element instanceof TableElementParty)
  if (element instanceof TableElementParty) {
    // console.log(JSON.parse(element.party_data)['params'])
    try {
      const params = JSON.parse(element.party_data)['params']
      if (params) {
        return params['replacements']
      }
    } catch (e) {
      return {}
    }
  }
}
</script>

<template>
  <div
    v-if="props.table instanceof Table"
    class="table"
    style="width: 1036px; overflow: hidden; height: fit-content"
    :style="{
      '--main-color': props.table.property.get_color_main(1),
      '--sub-color': props.table.property.get_color_sub(1),
      '--main-background-color': props.table.property.get_color_main(0.8),
      '--sub-background-color': props.table.property.get_color_sub(0.45),
      '--little-about-color': props.table.property.get_color_sub(0.75)
    }"
  >
    <div class="table-header" style="background-color: white">
      <div
        style="height: 540px; display: flex; flex-direction: column; align-items: center"
        :style="'' + props.table.property.banner"
      >
        <div
          class="title"
          style="
            /*background: linear-gradient(to bottom, var(--sub-color), transparent);*/
            background: var(--sub-color);
            box-shadow: 0 0 16px var(--main-color);
            width: 100%;
            display: flex;
            justify-content: center;
            border-radius: 0 0 16px 16px;
          "
        >
          <TableComponentTextContent
            style="padding-top: 4px; padding-bottom: 6px; font-weight: 700; font-size: 64px"
            :content="props.table.property.title"
          />
        </div>
        <div style="position: absolute; font-size: 32px; padding: 0 4px; left: 0; bottom: 0">
          <TableComponentTextContent
            style="font-weight: bolder"
            :content="props.table.property.update_time"
          />
        </div>
        <div
          style="
            position: absolute;
            background: var(--little-about-color);
            font-size: 28px;
            padding: 8px 16px 4px;
            right: 0;
            bottom: 0;
            border-top-left-radius: 16px;
          "
        >
          <TableComponentTextContent :content="props.table.property.little_about" />
        </div>
      </div>
    </div>
    <div :style="'' + props.table.property.background">
      <div style="image-rendering: auto; background: var(--sub-background-color)">
        <div class="table-container" style="display: flex; flex-direction: row; flex-wrap: wrap">
          <template v-for="(c, key) in props.table.content" :key="key">
            <div
              v-if="c instanceof TableElementRow"
              style="
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                /*justify-content: space-evenly;*/
                justify-content: center;
                padding: 16px 0;
              "
            >
              <template v-for="(element, key) in c.elements" :key="key">
                <template v-if="element instanceof TableElementHtml">
                  <div style="margin: -16px 0" v-html="element.content" />
                </template>
                <template v-else-if="element instanceof TableElementPartyUnion">
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
                      "
                    >
                      <div style="display: flex; align-items: flex-start">
                        <span
                          style="
                            color: white;
                            background: linear-gradient(
                              240deg,
                              transparent 12px,
                              rgb(234, 53, 75) 13px
                            );
                            padding: 2px 16px 2px 20px;
                            margin-left: -12px;
                          "
                          v-show="element.label"
                        >
                          {{ element.label }}
                        </span>
                        <TableComponentTextContent
                          style="
                            font-size: 18px;
                            margin: 4px;
                            font-weight: bold;
                            color: rgb(79, 79, 79);
                          "
                          :text_border="false"
                          :content="element.title"
                        />
                      </div>
                      <div style="display: flex; margin: 4px 0">
                        <PartyCardEliya :party="element.party"> </PartyCardEliya>

                        <div style="padding: 0 24px">
                          <TableComponentTextContent
                            :text_border="false"
                            style="color: rgb(79, 79, 79); font-size: 21px"
                            :content="element.content"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else-if="element instanceof TableElementParty">
                  <div style="padding: 0; margin: 0 6px 12px">
                    <PartyCardEliya
                      :show_name="props.party_style?.show_name || element.show_name"
                      :show_awaken="props.party_style?.show_awaken || element.show_awaken"
                      :always_show_replacements="props.party_style?.show_replacements"
                      :party="element.party"
                      :replacements="get_replacements_data(element)"
                      style="
                        border: 6px solid var(--main-color);
                        background-color: #fff;
                        border-radius: 8px;
                      "
                    >
                    </PartyCardEliya>
                  </div>
                </template>
                <template v-else-if="element instanceof TableElementTextArea">
                  <TableComponentTextContent
                    style="
                      margin: 0 6px;
                      box-sizing: content-box;
                      padding: 0 6px;
                      /*background-color: rgba(255, 255, 255, 0.6);*/
                      /*border-radius: 8px;*/
                      /*border: 4px transparent solid;*/
                      /*background-color: blue;*/
                    "
                    :style="
                      (() => {
                        const s = {}
                        if (element instanceof TableElementTextArea) {
                          s['width'] = element.full ? '992px' : '480px'
                          s['margin-bottom'] = element.little_title ? '' : '12px'
                          s['font-size'] = element.little_title ? '28px' : '22px'
                          s['margin-top'] = element.little_title ? '8px' : ''
                        }
                        return s
                      })()
                    "
                    :content="element.content"
                  />
                </template>
                <template v-else-if="element instanceof TableElementWikiCard">
                  <template v-if="element.lite">
                    <UnitLiteCard
                      style="margin: 10px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                      v-if="element.object instanceof Unit"
                      :unit="element.object"
                    />
                    <ArmamentWikiCard
                      style="margin: 10px; width: 480px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                      v-else-if="element.object instanceof Armament"
                      :armament="element.object"
                    />
                  </template>
                  <template v-else>
                    <template v-if="element instanceof TableElementWikiCard">
                      <UnitWikiCard
                        style="margin: 10px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                        v-if="element.object instanceof Unit"
                        :unit="element.object"
                      />
                      <ArmamentWikiCard
                        style="margin: 10px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.6)"
                        v-else-if="element.object instanceof Armament"
                        :armament="element.object"
                      />
                    </template>
                  </template>
                </template>
                <div v-else>未解析的组件: {{ element.data() }}</div>
              </template>
            </div>
            <div
              style="
                background: var(--main-background-color);
                backdrop-filter: blur(2px);
                box-shadow: 0 0 16px black;
                color: white;
                font: 38px Arial, '黑体';
                width: 100%;
                padding: 6px 16px;
                display: flex;
                align-items: center;
                z-index: 1;
                /*margin-bottom: 16px;*/
              "
              v-else-if="c instanceof TableElementSubTitle"
            >
              <img
                style="width: 36px; margin: 0 4px"
                :src="`/static/worldflipper/icon/${c.element}.png`"
                alt=""
              />
              <TableComponentTextContent
                style="font-weight: bold"
                :text_border="false"
                :content="c.content"
              />
            </div>
            <template v-else>
              <div style="color: red">{{ key }} {{ JSON.stringify(c) }}</div>
            </template>
          </template>
        </div>
        <div
          class="table-footer"
          style="display: flex; align-items: center; flex-direction: column"
          :style="{
            background: `linear-gradient(to bottom, transparent,
            ${props.table.property.get_color_main(0.8)} 65%,
            ${props.table.property.get_color_main(1)} 100%)`
          }"
        >
          <v-divider
            style="width: 95%; margin: 8px 0; border-top-color: var(--sub-color)"
            class="border-opacity-100"
          ></v-divider>
          <TableComponentTextContent
            style="
              font-size: 22px;
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              padding: 16px;
              color: white;
            "
            html_access
            :text_border="false"
            :content="props.table.property.footer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  line-height: normal;
  font-family: Arial, '黑体', '华文细黑', sans-serif;
  --main-color: #333;
  --sub-color: #ccc;
  --main-background-color: rgba(51, 51, 51, 0.8);
  --sub-background-color: rgba(204, 204, 204, 0.8);
  --little-about-color: rgba(204, 204, 204, 0.75);
}
</style>
