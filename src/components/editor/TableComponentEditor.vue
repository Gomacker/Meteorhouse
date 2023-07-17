<script setup lang="ts">
import {
  TableElement,
  TableElementHtml,
  TableElementParty2,
  TableElementPartyUnion,
  TableElementWikiCard
} from '@/stores/table'
import {
  TableElementParty,
  TableElementRow,
  TableElementSubTitle,
  TableElementTextArea
} from '@/stores/table'
import PartyCardEliya from '@/components/party/PartyCardEliya.vue'
import { ArrowLeft, ArrowRight, DeleteFilled, Plus } from '@element-plus/icons-vue'

defineEmits<{
  refresh: any
  move_pre: any
  move_next: any
  insert_pre: any
  delete: any
}>()
defineProps<{
  table_element: TableElement
}>()
function refresh(row: TableElementRow, index: number, element: TableElement) {
  console.log(element)

  row.elements[index] = TableElement.load(element.data())
  console.log(row.elements)
}

const component_types = [
  'TextArea',
  'Party',
  'Party2',
  'Html',
  'PartyUnion',
  'EventCard',
  'WikiCard',
  'ObjectMap'
]
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
  <template
    v-if="
      $props.table_element instanceof TableElementRow ||
      $props.table_element instanceof TableElementSubTitle
    "
  >
    <v-card
      style="
        width: 99.5%;
        margin: 0.25%;
        /*background-color: var(--sub-background-color); !*rgba(0 127 255 / 0.1)*!*/
      "
      :style="{
        'background-color':
          $props.table_element instanceof TableElementRow
            ? 'var(--sub-background-color)'
            : 'var(--sub-color)'
      }"
      body-style="padding: 0;"
    >
      <el-form style="padding: 4px" label-width="50px" label-position="left">
        <el-form-item label="类型" style="margin-bottom: 0">
          <el-select v-model="$props.table_element.type" @change="$emit('refresh')">
            <el-option v-for="c in ['Row', 'SubTitle']" :key="c" :value="c"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider style="margin: 4px" />
      <div
        v-if="$props.table_element instanceof TableElementRow"
        style="display: flex; flex-direction: row; flex-wrap: wrap"
      >
        <TableComponentEditor
          v-for="(element, index) in $props.table_element.elements"
          :key="index"
          :table_element="element"
          @refresh="refresh($props.table_element, index, element)"
          @move_pre="$props.table_element.move_pre(index)"
          @move_next="$props.table_element.move_next(index)"
          @insert_pre="$props.table_element.insert_textarea(index)"
          @delete="$props.table_element.delete(index)"
        />
        <el-button
          round
          type="primary"
          @click="$props.table_element.insert_textarea($props.table_element.elements.length)"
          style="width: 49.5%; margin: 4px"
        >
          ➕添加组件
        </el-button>
      </div>
      <div style="margin: 4px" v-else>
        <el-form label-width="50px" size="small" label-position="left">
          <el-form-item label="图标">
            <el-input v-model="$props.table_element.element"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="$props.table_element.content"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-divider style="margin: 4px" />
      <div style="display: flex; margin: 4px; justify-content: space-between">
        <div />
        <div>
          <el-button-group size="small">
            <el-button type="primary" @click="$emit('move_pre')">
              <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <el-button type="primary" @click="$emit('move_next')">
              <el-icon><ArrowRight /></el-icon>
            </el-button>
            <el-button type="primary" @click="$emit('insert_pre')">
              <el-icon><Plus /></el-icon>
            </el-button>
            <el-popconfirm title="确认删除？" @confirm="$emit('delete')">
              <template #reference>
                <el-button type="danger">
                  <el-icon><DeleteFilled /></el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </el-button-group>
        </div>
      </div>
    </v-card>
  </template>
  <template v-else>
    <v-card
      class="table-component-card"
      :class="$props.table_element.full_row ? ['full'] : undefined"
      body-style="padding: 8px;"
    >
      <v-select
        v-model="$props.table_element.type"
        :items="component_types"
        density="compact"
        hide-details
        style="max-width: 360px"
        label="类型"
        @update:model-value="$emit('refresh')"
      />
      <v-divider style="margin: 4px" />
      <div>
        <template v-if="$props.table_element instanceof TableElementTextArea">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, 160px)">
            <v-switch
              label="占据整行"
              hide-details
              density="compact"
              v-model="$props.table_element.full"
            />
            <v-switch
              label="小标题"
              hide-details
              density="compact"
              v-model="$props.table_element.little_title"
            />
          </div>
          <v-textarea label="内容" density="compact" v-model="$props.table_element.content" />
        </template>
        <template v-else-if="$props.table_element instanceof TableElementPartyUnion">
          <div style="display: flex; flex-direction: column">
            <div>
              <el-form label-width="50px" size="small" label-position="left">
                <el-form-item label="标签">
                  <el-input v-model="$props.table_element.label"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                  <el-input v-model="$props.table_element.title"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="display: flex">
              <div style="width: 49%; margin: 0 1% 0 0">
                <el-form label-width="50px" size="small" inline label-position="left">
                  <el-form-item label-width="60px" label="显示名称">
                    <el-switch v-model="$props.table_element.show_name"></el-switch>
                  </el-form-item>
                  <el-form-item label-width="60px" label="显示觉醒">
                    <el-switch v-model="$props.table_element.show_awaken"></el-switch>
                  </el-form-item>
                </el-form>
                <el-form label-width="50px" size="small" label-position="left">
                  <el-form-item label="队伍">
                    <el-input
                      v-model="$props.table_element.party_data"
                      style="font-family: Consolas, serif"
                      input-style="background: rgba(0 0 0 / 0.5); color: white"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 6 }"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center">
                  <PartyCardEliya
                    :party="$props.table_element.party"
                    :replacements="get_replacements_data($props.table_element)"
                    :show_name="$props.table_element.show_name"
                    :show_awaken="$props.table_element.show_awaken"
                    always_show_replacements
                  />
                </div>
              </div>
              <div style="width: 49%; margin: 0 0 0 1%">
                <el-form label-width="50px" size="small" label-position="left">
                  <el-form-item label="内容">
                    <el-input
                      v-model="$props.table_element.content"
                      type="textarea"
                      :autosize="{ minRows: 2 }"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="$props.table_element instanceof TableElementParty2">
          <div style="display: flex">
            <v-switch
              v-model="$props.table_element.show_name"
              density="compact"
              hide-details
              :inline="true"
              label="显示名称"
            />
            <v-switch
              v-model="$props.table_element.show_awaken"
              density="compact"
              hide-details
              :inline="true"
              label="显示觉醒"
            />
          </div>
          <v-text-field
            label="标题"
            density="compact"
            hide-details
            v-model="$props.table_element.title"
          ></v-text-field>
          <v-text-field
            label="小标题"
            density="compact"
            hide-details
            v-model="$props.table_element.subtitle"
          ></v-text-field>
          <el-form label-width="50px" size="small" label-position="left">
            <v-textarea
              v-model="$props.table_element.party_data"
              hide-details
              label="队伍"
              style="font-family: Consolas, serif; background: rgb(54, 54, 54); color: white"
              :autosize="{ minRows: 2, maxRows: 6 }"
            ></v-textarea>
          </el-form>
          <div style="display: flex; justify-content: center">
            <PartyCardEliya
              :party="$props.table_element.party"
              :replacements="get_replacements_data($props.table_element)"
              :show_name="$props.table_element.show_name"
              :show_awaken="$props.table_element.show_awaken"
              always_show_replacements
            />
          </div>
        </template>
        <template v-else-if="$props.table_element instanceof TableElementParty">
          <el-form label-width="50px" size="small" inline label-position="left">
            <el-form-item label-width="60px" label="显示名称">
              <el-switch v-model="$props.table_element.show_name"></el-switch>
            </el-form-item>
            <el-form-item label-width="60px" label="显示觉醒">
              <el-switch v-model="$props.table_element.show_awaken"></el-switch>
            </el-form-item>
          </el-form>
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item label="队伍">
              <el-input
                v-model="$props.table_element.party_data"
                style="font-family: Consolas, serif"
                input-style="background: rgba(0 0 0 / 0.5); color: white"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="display: flex; justify-content: center">
            <PartyCardEliya
              :party="$props.table_element.party"
              :replacements="get_replacements_data($props.table_element)"
              :show_name="$props.table_element.show_name"
              :show_awaken="$props.table_element.show_awaken"
              always_show_replacements
            />
          </div>
        </template>
        <template v-else-if="$props.table_element instanceof TableElementHtml">
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item label="内容">
              <el-input
                v-model="$props.table_element.content"
                type="textarea"
                :autosize="{ minRows: 4 }"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else-if="$props.table_element.type === 'EventCard'">
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item label="事件ID">
              <el-input></el-input>
              <el-select></el-select>
            </el-form-item>
          </el-form>
        </template>
        <template v-else-if="$props.table_element instanceof TableElementWikiCard">
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item label="Lite">
              <el-switch v-model="$props.table_element.lite"></el-switch>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="$props.table_element.object_type">
                <el-radio label="Unit">角色</el-radio>
                <el-radio label="Armament">武器</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="ID">
              <el-input-number v-model="$props.table_element.object_id"></el-input-number>
            </el-form-item>
          </el-form>
        </template>
        <template v-else-if="$props.table_element.type === 'ObjectMap'">
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
      </div>
      <v-divider style="margin: 4px" />
      <div style="display: flex; margin: 4px; justify-content: space-between">
        <div />
        <div>
          <v-btn-group color="blue" variant="tonal" density="compact">
            <v-btn icon="mdi-menu-left" @click="$emit('move_pre')"/>
            <v-btn icon="mdi-menu-right" @click="$emit('move_next')"/>
            <v-btn icon="mdi-plus" @click="$emit('insert_pre')"/>
            <v-btn icon="mdi-delete" @confirm="$emit('delete')" color="red" />
          </v-btn-group>
        </div>
      </div>
    </v-card>
  </template>
</template>

<style scoped>
.el-form-item {
  margin-bottom: 4px;
}
.table-component-card {
  border-radius: 0;
  width: 49.5%;
  box-shadow: none;
  margin: 0.25%;
  padding: 8px;
  //background-color: rgba(255 255 255 / 0.65);
  background: linear-gradient(to bottom, var(--sub-color) 4px, rgba(255 255 255 / 0.65) 4px);
}
.table-component-card.full {
  width: 99.5%;
}
</style>
