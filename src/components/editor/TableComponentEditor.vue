<script setup lang="ts">
import {
  TableElement,
  TableElementHtml,
  TableElementParty2,
  TableElementPartyUnion,
  TableElementWikiCard
} from '@/components/table/table'
import {
  TableElementParty,
  TableElementRow,
  TableElementSubTitle,
  TableElementTextArea
} from '@/components/table/table'
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'

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
      style="width: 99.5%; margin: 1% 0.25%; border: 1px black solid"
      :style="{
        background: $props.table_element instanceof TableElementRow ? '#fff' : '#ddd'
      }"
      class="elevation-6"
      body-style="padding: 0"
    >
      <div style="display: flex; margin: 4px; align-items: center; justify-content: space-between">
        <v-select
          v-model="$props.table_element.type"
          :items="['Row', 'SubTitle']"
          density="compact"
          hide-details
          style="max-width: 360px"
          label="类型"
          @update:model-value="$emit('refresh')"
        />
        <v-btn-group color="blue" variant="tonal" density="compact">
          <v-btn icon="mdi-menu-left" @click="$emit('move_pre')" />
          <v-btn icon="mdi-menu-right" @click="$emit('move_next')" />
          <v-btn icon="mdi-plus" @click="$emit('insert_pre')" />
          <v-btn icon="mdi-close" @click="$emit('delete')" color="red" />
        </v-btn-group>
      </div>
      <v-divider style="margin: 4px" />
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
        <v-btn
          @click="$props.table_element.insert_textarea($props.table_element.elements.length)"
          style="width: 49.5%; margin: 4px"
          rounded
          color="blue"
        >
          ➕添加组件
        </v-btn>
      </div>
      <div style="margin: 4px" v-else>
        <v-text-field
          label="图标"
          v-model="$props.table_element.element"
          density="compact"
          hide-details
        />
        <v-text-field
          label="内容"
          v-model="$props.table_element.content"
          density="compact"
          hide-details
        />
      </div>
    </v-card>
  </template>
  <template v-else>
    <v-card
      class="table-component-card"
      style="background: #eee"
      :class="$props.table_element.isFull ? ['full'] : undefined"
      body-style="padding: 8px;"
    >
      <div style="display: flex; margin: 4px; align-items: center; justify-content: space-between">
        <v-select
          v-model="$props.table_element.type"
          :items="component_types"
          density="compact"
          hide-details
          style="max-width: 360px"
          label="类型"
          @update:model-value="$emit('refresh')"
        />
        <v-btn-group color="blue" variant="tonal" density="compact">
          <v-btn icon="mdi-menu-left" @click="$emit('move_pre')" />
          <v-btn icon="mdi-menu-right" @click="$emit('move_next')" />
          <v-btn icon="mdi-plus" @click="$emit('insert_pre')" />
          <v-btn icon="mdi-close" @click="$emit('delete')" color="red" />
        </v-btn-group>
      </div>
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
              <v-text-field label="标签" v-model="$props.table_element.label" density="compact" />
              <v-text-field label="标题" v-model="$props.table_element.title" density="compact" />
            </div>
            <div style="display: flex">
              <div style="width: 49%; margin: 0 1% 0 0">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, 160px)">
                  <v-switch
                    label="显示名称"
                    density="compact"
                    hide-details
                    v-model="$props.table_element.show_name"
                  />
                  <v-switch
                    label="显示觉醒"
                    density="compact"
                    hide-details
                    v-model="$props.table_element.show_awaken"
                  />
                </div>
                <v-card>
                  <v-textarea
                    v-model="$props.table_element.party_data"
                    hide-details
                    label="队伍"
                    style="font-family: Consolas, serif; background: rgb(54, 54, 54); color: white"
                  />
                  <div style="display: flex; justify-content: center">
                    <PartyCardEliya
                      :party="$props.table_element.party"
                      :replacements="get_replacements_data($props.table_element)"
                      :show_name="$props.table_element.show_name"
                      :show_awaken="$props.table_element.show_awaken"
                      always_show_replacements
                    />
                  </div>
                </v-card>
              </div>
              <div style="width: 49%; margin: 0 0 0 1%">
                <v-textarea
                  v-model="$props.table_element.content"
                  label="内容"
                  density="compact"
                  hide-details
                />
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
              label="显示名称"
            />
            <v-switch
              v-model="$props.table_element.show_awaken"
              density="compact"
              hide-details
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
          <v-textarea
            v-model="$props.table_element.party_data"
            hide-details
            label="队伍"
            style="font-family: Consolas, serif; background: rgb(54, 54, 54); color: white"
          />
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
          <div style="display: flex">
            <v-switch
              v-model="$props.table_element.show_name"
              density="compact"
              hide-details
              label="显示名称"
            />
            <v-switch
              v-model="$props.table_element.show_awaken"
              density="compact"
              hide-details
              label="显示觉醒"
            />
          </div>
          <v-textarea
            v-model="$props.table_element.party_data"
            hide-details
            label="队伍"
            style="font-family: Consolas, serif; background: rgb(54, 54, 54); color: white"
          />
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
          <v-textarea
            label="内容"
            v-model="$props.table_element.content"
            style="font-family: Consolas, serif; background: rgb(54, 54, 54); color: white"
            :rows="20"
          />
        </template>
        <template v-else-if="$props.table_element instanceof TableElementWikiCard">
          <v-switch
            label="Lite"
            v-model="$props.table_element.lite"
            hide-details
            density="compact"
          />
          <v-radio-group
            v-model="$props.table_element.object_type"
            density="compact"
            :inline="true"
          >
            <v-radio label="角色" value="Unit" />
            <v-radio label="武器" value="Armament" />
          </v-radio-group>
          <v-text-field label="ID" v-model="$props.table_element.object_id" />
        </template>
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
  background: linear-gradient(to bottom, var(--sub-color) 4px, rgba(255 255 255 / 0.65) 4px);
}
.table-component-card.full {
  width: 99.5%;
}
</style>
