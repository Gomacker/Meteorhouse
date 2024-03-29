<script setup lang="ts">
import GameTag from '@/components/party/GameTag.vue'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import EquipmentIcon from '@/components/worldflipper/equipment/EquipmentIcon.vue'

function splitByBrackets(str: string) {
  // str = str.replaceAll('\n', '</span><span style="padding-bottom: 5px;">')
  // str = str.split('\n')
  // str = str.replaceAll(
  //   '[biliicon]',
  //   '<img style="width: 24px; vertical-align: text-bottom; margin: 0 4px;" src="https://www.bilibili.com/favicon.ico" alt=""/>'
  // )

  let result = []
  let bracketed = str.match(/\[.*?]/g) || []
  let unbracketed = str.split(/\[.*?]/g)
  for (let i = 0; i < unbracketed.length; i++) {
    if (unbracketed[i]) result.push(unbracketed[i])
    if (i < bracketed.length) result.push(bracketed[i])
  }
  return result
}
const status = {
  highlight: false,
  novice: false,
  del_line: false,
  bold: false,
  tag: false
}

function init_status() {
  status.highlight = false
  status.novice = false
  status.del_line = false
  status.tag = false
  return undefined
}

const props = defineProps({
  content: String,
  text_border: {
    type: Boolean,
    default: true
  },
  html_access: {
    type: Boolean,
    default: false
  }
})

const worldflipper = useWorldflipperDataStore()
</script>
<template>
  <div>
    <template
      v-if="
        (() => {
          init_status()
          return typeof props.content == 'string'
        })()
      "
    >
      <div
        style="font-weight: inherit"
        :key="row_index"
        class="table-text-row"
        v-for="(row, row_index) in typeof props.content === 'string'
          ? props.content.split('\n')
          : []"
      >
        <template :key="s_index" v-for="(s, s_index) in splitByBrackets(row)">
          <CharacterIcon
            v-if="s.match(/^\[bigicon:u/)"
            class="icon-wfo-obj"
            :size="90"
            :obj="worldflipper.characters.get(s.substring(10, s.length - 1))"
            eager
          />
          <CharacterIcon
            v-else-if="s.startsWith('[icon:u')"
            class="icon-wfo-obj"
            :size="60"
            :obj="worldflipper.characters.get(s.substring(7, s.length - 1))"
            eager
          />
          <EquipmentIcon
            v-else-if="s.startsWith('[bigicon:a')"
            class="icon-wfo-obj"
            :size="90"
            :obj="worldflipper.equipments.get(s.substring(10, s.length - 1))"
            eager
          />
          <EquipmentIcon
            v-else-if="s.startsWith('[icon:a')"
            :size="60"
            :obj="worldflipper.equipments.get(s.substring(7, s.length - 1))"
            eager
          />
          <img
            @dragstart.prevent
            v-else-if="s.startsWith('[icon:') && s.substring(6, s.length - 1).length > 0"
            style="height: 1em; margin: 0 0.075em; display: inline; vertical-align: text-bottom"
            :src="`/static/worldflipper/icon/${s.substring(6, s.length - 1)}.png`"
            alt=""
          />
          <img
            v-else-if="s === '[biliicon]'"
            style="
              height: 1em;
              vertical-align: text-bottom;
              filter: drop-shadow(0 0 2px rgba(0 0 0 / 0.6));
              margin: 0 4px;
            "
            src="https://www.bilibili.com/favicon.ico"
            alt=""
          />
          <img
            v-else-if="s === '[ngaicon]'"
            style="
              height: 1em;
              vertical-align: text-bottom;
              filter: drop-shadow(0 0 2px rgba(0 0 0 / 0.6));
              margin: 0 4px;
            "
            src="https://bbs.nga.cn/favicon.ico"
            alt=""
          />
          <template v-else-if="s === '[highlight]'">
            {{
              (() => {
                status.highlight = true
                return undefined
              })()
            }}
          </template>
          <template v-else-if="s === '[novice]'">
            {{
              (() => {
                status.novice = true
                return undefined
              })()
            }}
          </template>
          <template v-else-if="s === '[del]'">
            {{
              (() => {
                status.del_line = true
                return undefined
              })()
            }}
          </template>
          <template v-else-if="s === '[bold]'">
            {{
              (() => {
                status.bold = true
                return undefined
              })()
            }}
          </template>
          <template v-else-if="s === '[tag]'">
            {{
              (() => {
                status.tag = true
                return undefined
              })()
            }}
          </template>
          <template v-else-if="s === '[end]'">
            {{ init_status() }}
          </template>
          <template v-else-if="status.tag">
            <GameTag style="margin-bottom: 4px" :content="s" />
          </template>
          <template v-else-if="props.html_access">
            <div
              style="font-weight: inherit"
              :class="[
                props.text_border ? 'table-text-bordered' : 'table-text',
                status.highlight ? 'highlight' : '',
                status.novice ? 'novice' : '',
                status.del_line ? 'del' : '',
                status.bold ? 'bold' : ''
              ]"
              v-html="s"
            ></div>
          </template>
          <template v-else>
            <div
              style="font-weight: inherit"
              :class="[
                props.text_border ? 'table-text-bordered' : 'table-text',
                status.highlight ? 'highlight' : '',
                status.novice ? 'novice' : '',
                status.del_line ? 'del' : '',
                status.bold ? 'bold' : ''
              ]"
            >
              {{ s }}
            </div>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>


<style scoped>
.table-text-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  //margin-bottom: 4px;
}

.table-text-bordered {
  display: inline;
  word-wrap: break-word;
  --stroke-width: 0.136em;
  padding: var(--stroke-width);
  margin: calc(-1 * var(--stroke-width));
  background-color: var(--main-color);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
  -webkit-text-stroke: 0.136em transparent;
  font-family: Arial, '黑体', serif;
}
.table-text {
  display: inline;
  word-wrap: break-word;
  color: inherit;
  font-family: Arial, '黑体', serif;
}
.table-text.highlight {
  color: orangered;
  -webkit-text-fill-color: orangered;
}
.highlight {
  color: rgb(255, 159, 28);
  -webkit-text-fill-color: rgb(255, 159, 28);
}
.novice {
  color: #58ffb7;
  -webkit-text-fill-color: #58ffb7;
}
.del {
  text-decoration: line-through;
}
.bold {
  font-weight: bold;
}

.icon-wfo-obj {
  margin: 0 4px;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.8));
}
</style>
