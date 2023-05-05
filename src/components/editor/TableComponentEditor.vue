<script setup lang="ts">
import type { TableElement } from '@/stores/table'

const props = defineProps<{
  table_element: TableElement
}>()
function is_full_row_component(table_element: TableElement) {
  const type = table_element.type
  if (['PartyCombine', 'Html'].indexOf(type) > -1) {
    return true
  }
  if (['EventCard', 'WikiCard', 'TextArea'].indexOf(type) > -1) {
    return !'TODO'
    // TODO
  }
  return false
}
const component_types = [
  'TextArea',
  'PartyRelease',
  'Html',
  'PartyCombine',
  'EventCard',
  'WikiCard',
  'ObjectMap'
]
</script>

<template>
  <el-card
    class="table-component-card"
    :class="is_full_row_component(props.table_element) ? ['full'] : undefined"
    body-style="padding: 8px;"
  >
    <el-form label-width="50px" size="small" label-position="left">
      <el-form-item label="类型">
        <el-select v-model="$props.table_element.type">
          <el-option v-for="c in component_types" :key="c" :value="c"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider style="margin: 4px" />

    <template v-if="props.table_element.type === 'TextArea'">
      <el-form label-width="50px" size="small" inline label-position="left">
        <el-form-item label-width="60px" label="占据整行">
          <el-switch></el-switch>
        </el-form-item>
        <el-form-item label-width="50px" label="字号">
          <el-select></el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item label="内容">
          <el-input type="textarea" :autosize="{ minRows: 2 }"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.table_element.type === 'PartyRelease'">
      <el-form label-width="50px" size="small" inline label-position="left">
        <el-form-item label-width="60px" label="显示名称">
          <el-switch></el-switch>
        </el-form-item>
        <el-form-item label-width="60px" label="显示觉醒">
          <el-switch></el-switch>
        </el-form-item>
      </el-form>
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item label="队伍ID">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="替换">
          <div style="width: 100%; height: 60px; background-color: rgb(0 255 0)"></div>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.table_element.type === 'Html'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item label="内容">
          <el-input type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.table_element.type === 'EventCard'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item label="事件ID">
          <el-input></el-input>
          <el-select></el-select>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.table_element.type === 'WikiCard'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item label="类型">
          <el-radio-group>
            <el-radio label="Unit">角色</el-radio>
            <el-radio label="Armament">武器</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="ID">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.table_element.type === 'PartyCombine'">
      <div style="display: flex; flex-direction: column">
        <div>
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item label="标签">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="display: flex">
          <div style="width: 49%; margin: 0 1% 0 0">
            <el-form label-width="50px" size="small" inline label-position="left">
              <el-form-item label-width="60px" label="显示名称">
                <el-switch></el-switch>
              </el-form-item>
              <el-form-item label-width="60px" label="显示觉醒">
                <el-switch></el-switch>
              </el-form-item>
            </el-form>
            <el-form label-width="50px" size="small" label-position="left">
              <el-form-item label="队伍ID">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="替换">
                <div style="width: 100%; height: 60px; background-color: rgb(0 255 0)"></div>
              </el-form-item>
            </el-form>
          </div>
          <div style="width: 49%; margin: 0 0 0 1%">
            <el-form label-width="50px" size="small" inline label-position="left">
              <el-form-item label-width="60px" label="占据整行">
                <el-switch></el-switch>
              </el-form-item>
              <el-form-item label-width="50px" label="字号">
                <el-select></el-select>
              </el-form-item>
            </el-form>
            <el-form label-width="50px" size="small" label-position="left">
              <el-form-item label="内容">
                <el-input type="textarea" :autosize="{ minRows: 2 }"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="props.table_element.type === 'ObjectMap'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item label="属性">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="属性">
          <el-switch></el-switch>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group>
            <el-radio label="Unit">角色</el-radio>
            <el-radio label="Armament">武器</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="ID List">
          <el-input type="textarea" :autosize="{ minRows: 2 }"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </el-card>
</template>

<style scoped>
.el-form-item {
  margin-bottom: 4px;
}
.table-component-card {
  border-radius: 0;
  width: 49.5%;
  margin: 0.25%;
  background-color: rgba(255 255 255 / 0.6);
}
.table-component-card.full {
  width: 99.5%;
}
</style>
