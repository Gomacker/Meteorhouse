<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'TextArea',
    required: true
  }
})
function is_full_row_component(table_component: any) {
  const type = props.type
  if (typeof type === 'string') {
    if (['PartyCombine', 'Html'].indexOf(type) > -1) {
      return true
    }
    if (['EventCard', 'WikiCard', 'TextArea'].indexOf(type) > -1) {
      return !'TODO'
    }
    return false
  }
}

const component_types = [
    'TextArea'
]
</script>

<template>
  <el-card
    class="table-component-card"
    :class="is_full_row_component('') ? ['full'] : undefined"
    body-style="padding: 8px;"
  >
    <el-form label-width="50px" size="small" label-position="left">
      <el-form-item style="margin-bottom: 4px" label="类型">
        <el-select v-model="props.type">
          <el-option value="TextArea"></el-option>
          <el-option value="PartyRelease"></el-option>
          <el-option value="Html"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider style="margin: 4px" />

    <template v-if="props.type === 'TextArea'">
      <el-form label-width="50px" size="small" inline label-position="left">
        <el-form-item style="margin-bottom: 4px" label-width="60px" label="占据整行">
          <el-switch></el-switch>
        </el-form-item>
        <el-form-item style="margin-bottom: 4px" label-width="50px" label="字号">
          <el-select></el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item style="margin-bottom: 4px" label="内容">
          <el-input type="textarea" :autosize="{ minRows: 2 }"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.type === 'PartyRelease'">
      <el-form label-width="50px" size="small" inline label-position="left">
        <el-form-item style="margin-bottom: 4px" label-width="60px" label="显示名称">
          <el-switch></el-switch>
        </el-form-item>
        <el-form-item style="margin-bottom: 4px" label-width="60px" label="显示觉醒">
          <el-switch></el-switch>
        </el-form-item>
      </el-form>
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item style="margin-bottom: 4px" label="队伍ID">
          <el-input></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 4px" label="替换">
          <div style="width: 100%; height: 60px; background-color: rgb(0 255 0)"></div>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.type === 'Html'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item style="margin-bottom: 4px" label="内容">
          <el-input type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.type === 'EventCard'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item style="margin-bottom: 4px" label="事件ID">
          <el-input></el-input>
          <el-select></el-select>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.type === 'WikiCard'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item style="margin-bottom: 4px" label="类型">
                <el-radio-group>
                    <el-radio label="Unit">角色</el-radio>
                    <el-radio label="Armament">武器</el-radio>
                </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="props.type === 'PartyCombine'">
      <el-form label-width="50px" size="small" label-position="left">
        <el-form-item style="margin-bottom: 4px" label="类型">
                <el-radio-group>
                    <el-radio label="Unit">角色</el-radio>
                    <el-radio label="Armament">武器</el-radio>
                </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
  </el-card>
</template>

<style scoped>
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