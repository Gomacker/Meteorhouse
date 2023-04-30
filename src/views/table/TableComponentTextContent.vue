<script setup lang="ts">
import { manager } from '@/stores/manager'
import ArmamentPicOrigin from '@/components/objects/armament/ArmamentPicOrigin.vue'
import { reactive } from 'vue'

function splitByBrackets(str: string) {
  str = str.replaceAll('\n', '</span><span style="padding-bottom: 5px;">')
  str = str.replaceAll(
    '[biliicon]',
    '<img style="width: 24px; vertical-align: text-bottom; margin: 0 4px;" src="https://www.bilibili.com/favicon.ico" alt=""/>'
  )

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
  novice: false
}
const props = defineProps({
  content: String
})
</script>
<template>
  <div>
    <template v-if="typeof props.content == 'string'">
      <div :key="row_index" class="table-row" v-for="(row, row_index) in props.content.split('\n')">
        <template :key="s_index" v-for="(s, s_index) in splitByBrackets(row)">
          <UnitPicOrigin
            v-if="
              s.startsWith('[bigicon:u') &&
              manager.unit_data.get(parseInt(s.substring(10, s.length - 1)))
            "
            style="filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.6))"
            :size="90"
            :unit="manager.unit_data.get(parseInt(s.substring(10, s.length - 1)))"
          />
          <UnitPicOrigin
            v-else-if="
              s.startsWith('[icon:u') &&
              manager.unit_data.get(parseInt(s.substring(7, s.length - 1)))
            "
            style="filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.6))"
            :size="60"
            :unit="manager.unit_data.get(parseInt(s.substring(7, s.length - 1)))"
          />
          <ArmamentPicOrigin
            v-else-if="
              s.startsWith('[bigicon:a') &&
              manager.armament_data.get(parseInt(s.substring(10, s.length - 1)))
            "
            style="filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.6))"
            :size="90"
            :armament="manager.armament_data.get(parseInt(s.substring(10, s.length - 1)))"
          />
          <ArmamentPicOrigin
            v-else-if="
              s.startsWith('[icon:a') &&
              manager.armament_data.get(parseInt(s.substring(7, s.length - 1)))
            "
            style="filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.6))"
            :size="60"
            :armament="manager.armament_data.get(parseInt(s.substring(7, s.length - 1)))"
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
          <template v-else-if="s === '[end]'">
            {{
              (() => {
                status.highlight = false
                status.novice = false
                return undefined
              })()
            }}
          </template>
          <template v-else>
            <div
              class="table-text"
              :class="[status.highlight ? 'highlight' : '', status.novice ? 'novice' : '']"
            >
              {{ s }}
            </div>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'

export default {
  name: 'TableComponentTextContent',
  components: { UnitPicOrigin }
}
</script>

<style scoped>
.table-text {
  display: inline-block;
  background-color: var(--main-color);
  padding: 4px;
  margin: -4px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
  -webkit-text-stroke: 0.12em transparent;
  font-family: Arial, '黑体', serif;
}
.highlight {
  color: #ffad49;
  -webkit-text-fill-color: rgb(255 173 73);
  position: initial;
}
.novice {
  color: #58ffb7;
  -webkit-text-fill-color: rgb(88, 255, 183);
  position: initial;
}
</style>
