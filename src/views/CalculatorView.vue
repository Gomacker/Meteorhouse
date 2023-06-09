<script setup lang="ts">
import { reactive, Ref, ref, watch } from 'vue'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import {
  Armament,
  ele2color,
  manager,
  PartyParamManaboard2,
  PartyRelease,
  Union,
  Unit
} from '@/stores/manager'
import ArmamentPicOrigin from '@/components/objects/armament/ArmamentPicOrigin.vue'
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'
import CalculatorResourcesView from '@/views/calculator/CalculatorResourcesView.vue'
import CalculatorWikiCardView from '@/views/calculator/CalculatorWikiCardView.vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { sum } from 'lodash-es'
import EmptyPicOrigin from "@/components/objects/EmptyPicOrigin.vue";

const user = useUserStore()

const selected_obj: Ref<Unit | Armament | null | undefined> = ref(undefined)
const selected_position = ref<{
  union: string | undefined
  position: number | undefined
}>({
  union: undefined,
  position: undefined
})

const showed_list = ref<Array<Unit | Armament | undefined>>(
  new Array<Unit | Armament | undefined>()
)
const filter_default = {
  text: '',
  element: [-1, 0, 1, 2, 3, 4, 5],
  rarity: [1, 2, 3, 4, 5],
  type: [0, 1, 2, 3, 4],
  race: [
    'Human',
    'Beast',
    'Mystery',
    'Element',
    'Dragon',
    'Machine',
    'Devil',
    'Plants',
    'Aquatic',
    'Undead'
  ]
}

const filter = reactive<{
  text: string
  element: Array<number>
  rarity: Array<number>
  type: Array<number>
  race: Array<string>
}>(JSON.parse(JSON.stringify(filter_default)))

function check_tag(text: string, obj: Unit | Armament) {
  return false
}

const list_filter = (obj: Unit | Armament | undefined) => {
  if (obj instanceof Unit) {
    let access_text = !filter.text
    const ft = filter.text.toLowerCase()
    if (
      obj.name_zh.toLowerCase().includes(ft) ||
      obj.name_sub.toLowerCase().includes(ft) ||
      obj.name_jp.toLowerCase().includes(ft) ||
      obj.skill_description.toLowerCase().includes(ft) ||
      obj.leader_ability_name.toLowerCase().includes(ft) ||
      obj.leader_ability.toLowerCase().includes(ft) ||
      obj.ability1.toLowerCase().includes(ft) ||
      obj.ability2.toLowerCase().includes(ft) ||
      obj.ability3.toLowerCase().includes(ft) ||
      obj.ability4.toLowerCase().includes(ft) ||
      obj.ability5.toLowerCase().includes(ft) ||
      obj.ability6.toLowerCase().includes(ft) ||
      obj.cv.toLowerCase() === ft ||
      obj.obtain.toLowerCase().includes(ft) ||
      check_tag(ft, obj)
    )
      access_text = true
    const access_element = filter.element.indexOf(obj.element_id) > -1
    const access_rarity = filter.rarity.indexOf(obj.rarity) > -1
    const access_type = filter.type.indexOf(obj.type_id) > -1
    let access_race = false
    for (const r of filter.race) if (obj.race_ids.includes(r)) access_race = true
    return access_text && access_element && access_rarity && access_type && access_race
  } else if (obj instanceof Armament) {
    const access_element = filter.element.indexOf(obj.element) > -1
    const access_rarity = filter.rarity.indexOf(obj.rarity) > -1
    let access_text = !filter.text
    const ft = filter.text.toLowerCase()
    if (
      obj.name_zh.toLowerCase().includes(ft) ||
      obj.name_jp.toLowerCase().includes(ft) ||
      obj.ability.toLowerCase().includes(ft) ||
      obj.ability_soul.toLowerCase().includes(ft) ||
      obj.ability_awaken3.toLowerCase().includes(ft) ||
      obj.ability_awaken5.toLowerCase().includes(ft) ||
      obj.ability_augment1.toLowerCase().includes(ft) ||
      obj.ability_augment70.toLowerCase().includes(ft) ||
      obj.ability_augment100.toLowerCase().includes(ft) ||
      obj.obtain.toLowerCase().includes(ft) ||
      check_tag(ft, obj)
    )
      access_text = true
    return access_text && access_element && access_rarity
  }
  return false
}

const selected_module = ref<string>('Editor')
const selected_type = ref<'Unit' | 'Armament'>('Unit')
const hidden_menu = ref<boolean>(false)
const hidden_filters = ref<boolean>(false)

const source_input = ref<string>('')
const url_formats = [
  /(https:\/\/)?ecrire-bot\.herokuapp\.com\/\S+(?=\/\?)?/,
  /(https:\/\/)?twitter\.com\/\S+\/status\/\S+(?=\/\?)?/,
  /(https:\/\/)?wasuku\.gamewiki\.jp\/\S+\/\S+(?=\/\?)?/,

  /(https:\/\/)?t\.bilibili\.com\/\S+(?=\/\?)?/,
  /(https:\/\/)?www\.bilibili\.com\/opus\/\S+(?=\/\?)?/,
  /(https:\/\/)?www\.bilibili\.com\/video\/BV\S{10}\/?/,
  /(https:\/\/)?www\.bilibili\.com\/read\/cv\S+(?=\/\?)?/,
  /(https:\/\/)?wiki\.biligame\.com\/worldflipper\/\S+(?=\/\?)?/,
  /(https:\/\/)?nga\.178\.com\/read\.php\?tid=\S+(?=\/\?)?/,
  /(https:\/\/)?bbs\.nga\.cn\/read\.php\?tid=\S+(?=\/\?)?/,
  /(https:\/\/)?tieba\.baidu\.com\/p\/\S+(?=\/\?)?/,
  /(https:\/\/)?www\.gamer\.cn\/sjtswy\/article\/\S+(?=\/\?)?/
]

function update_show_list() {
  if (selected_type.value === 'Unit') {
    showed_list.value = Array.from(manager.unit_data)
      .map((item) => item[1])
      .filter((u) => list_filter(u))
  } else if (selected_type.value === 'Armament') {
    showed_list.value = Array.from(manager.armament_data)
      .map((item) => item[1])
      .filter((u) => list_filter(u))
  } else showed_list.value = []
  manager.need_update.value = false
}

watch(
  [manager.need_update, filter],
  async () => {
    if (manager.need_update) {
      await update_show_list()
    }
  },
  { deep: true }
)
const quest_cascader = ref('')

if (!showed_list.value.length) {
  update_show_list()
}

const party = ref<PartyRelease>(PartyRelease.empty())

function select_module(key: string) {
  selected_module.value = key
}
function get_pic_url(obj: Unit | Armament, awakened_or_soul = false) {
  return obj ? obj.pic_url(awakened_or_soul) : '/static/worldflipper/unit/blank.png'
}

function select_party(union: string, position: number) {
  if (selected_obj.value !== undefined) {
    if (union != undefined && position != undefined) {
      if (party.value.party.set_by_position(selected_obj.value === null ? undefined : selected_obj.value, union, position)) {
        selected_obj.value = undefined
      }
    }
  } else {
    if (
      selected_position.value.union != undefined &&
      selected_position.value.position != undefined
    ) {
      if (
        selected_position.value.union === union &&
        selected_position.value.position === position
      ) {
        selected_position.value = { union: undefined, position: undefined }
      } else {
        const obj_on_position = party.value.party.get_by_position(
          selected_position.value.union,
          selected_position.value.position
        )
        const obj_on_select_position = party.value.party.get_by_position(union, position)
        if (!obj_on_position && !obj_on_select_position) {
          selected_position.value = { union: union, position: position }
        } else {
          if (party.value.party.can_exchange(selected_position.value.position, position)) {
            party.value.party.set_by_position(
              obj_on_select_position,
              selected_position.value.union,
              selected_position.value.position
            )
            party.value.party.set_by_position(obj_on_position, union, position)
            selected_position.value = { union: undefined, position: undefined }
          }
        }
      }
    } else {
      selected_position.value = { union: union, position: position }
    }
  }
}

function select_object(obj: Unit | Armament | null) {
  if (selected_position.value.union != undefined && selected_position.value.position != undefined) {
    if (
      party.value.party.set_by_position(
        obj === null ? undefined : obj,
        selected_position.value.union,
        selected_position.value.position
      )
    ) {
      selected_position.value = { union: undefined, position: undefined }
    }
  } else {
    if (selected_obj.value === obj) {
      selected_obj.value = undefined
    } else {
      selected_obj.value = obj
    }
  }
}
const border_color = ref('#000000')
const show_name = ref(false)
const show_awaken = ref(false)
function get_show_text(unit: Unit | undefined, union: string, main_slot: boolean) {
  if (show_name.value) {
    if (unit) return unit.name_zh
  }
  return main_slot ? (union === 'union1' ? '队长' : '主要角色') : '辅助角色'
}

function upload_party() {
  axios
    .post('/api/v1/party/upload/', party.value.data_for_upload())
    .then((r) => {
      console.log(r.data)
      if (r.data['result'] === 'success') {
        ElMessage.success('上传成功')
        party.value = PartyRelease.empty()
      } else {
        ElMessage.error('上传失败')
      }
    })
    .catch(() => {
      ElMessage.error('上传失败(连接失败)')
    })
}

function input_mb2(party: PartyRelease, value: number, i: number, j: number, unison: boolean) {
  let ppm = party._params.get('manaboard2')
  if (!(ppm instanceof PartyParamManaboard2)) {
    ppm = new PartyParamManaboard2()
    party._params.set('manaboard2', ppm)
  }
  if (value === -1) ppm[`union${i}${unison ? 'unison' : 'main'}`][`manaboard${j + 3}`] = undefined
  else ppm[`union${i}${unison ? 'unison' : 'main'}`][`manaboard${j + 3}`] = value
}

function get_skill_weight(union: Union) {
  const mlength = union.main ? union.main.skill_weight : 0
  const ulength = union.unison ? union.unison.skill_weight : 0
  const vailds = [mlength, ulength].filter((x) => x)

  return vailds.length ? Math.round(sum(vailds) / vailds.length) : 0
}
</script>

<template>
  <div>
    <el-menu
      mode="horizontal"
      @select="select_module"
      :default-active="selected_module"
      :active-text-color="'rgba(200,0,255,0.8)'"
      style="display: flex; justify-content: center"
    >
      <el-menu-item index="Calculator" disabled>计算器</el-menu-item>
      <el-menu-item index="WikiCard">资料卡</el-menu-item>
      <el-menu-item index="Editor">编队</el-menu-item>
      <el-menu-item index="Upload" @click="hidden_menu = true">上传器</el-menu-item>
      <el-menu-item index="Resources">资源站</el-menu-item>
    </el-menu>
    <el-scrollbar
      style="
        height: calc(100% - 60px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
      "
      view-style="height: 100%;"
      wrap-style="width: 100%;"
    >
      <CalculatorWikiCardView
        :obj="selected_obj === null ? undefined : selected_obj"
        style="height: 100%; min-height: 100%"
        v-if="selected_module === 'WikiCard'"
      >
      </CalculatorWikiCardView>
      <div
        v-if="selected_module === 'Editor'"
        style="display: flex; flex-direction: column; align-items: center"
      >
        <div style="margin-top: 16px">
          裁剪框
          <el-color-picker
            show-alpha
            v-model="border_color"
            :predefine="Object['values'](ele2color)"
          />
          显示名称
          <el-switch v-model="show_name" />
          显示觉醒
          <el-switch v-model="show_awaken" />
        </div>
        <template v-if="party instanceof PartyRelease">
          <div
            class="party-body"
            style="background: white; margin: 20px"
            :style="{ border: `6px solid ${border_color}` }"
          >
            <div class="party-union" :key="union" v-for="union in ['union1', 'union2', 'union3']">
              <div
                class="party-wfo-slot party-main"
                :class="[
                  selected_position.union == union && selected_position.position === 0
                    ? 'selected'
                    : '',
                  party.party[union].main ? `ele-${party.party[union].main.element}` : ''
                ]"
                @click="select_party(union, 0)"
              >
                <img
                  :src="get_pic_url(party.party[union].main, show_awaken)"
                  alt=""
                  @dragstart.prevent
                />
                <div
                  style="
                    position: absolute;
                    display: flex;
                    background-color: rgba(0, 0, 0, 0.55);
                    color: white;
                    left: 0;
                    bottom: 16px;
                    border-top-right-radius: 6px;
                  "
                  v-if="(() => {
                  const ppm = party._params.get('manaboard2')
                  return ppm instanceof PartyParamManaboard2 ? !ppm[`${union}main`].is_empty() : false
                })()"
                >
                  <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
                    {{
                      (() => {
                        // if (true) {
                        const m =
                          party._params.get('manaboard2')[`${union}main`][`manaboard${i + 3}`]
                        return typeof m === 'number' ? m : '-'
                      })()
                    }}
                  </div>
                </div>
                <div>
                  <div style="text-align: center">
                    {{ get_show_text(party.party[union].main, union, true) }}
                  </div>
                </div>
              </div>
              <div
                class="party-wfo-slot party-armament"
                :class="[
                  selected_position.union == union && selected_position.position === 1
                    ? 'selected'
                    : '',
                  party.party[union].armament ? `ele-${party.party[union].armament.element}` : ''
                ]"
                @click="select_party(union, 1)"
              >
                <img :src="get_pic_url(party.party[union].armament)" alt="" @dragstart.prevent />
                <div>
                  <div style="text-align: center">装备</div>
                </div>
              </div>
              <div
                class="party-wfo-slot party-unison"
                :class="[
                  selected_position.union == union && selected_position.position === 2
                    ? 'selected'
                    : '',
                  party.party[union].unison ? `ele-${party.party[union].unison.element}` : ''
                ]"
                @click="select_party(union, 2)"
              >
                <img
                  :src="get_pic_url(party.party[union].unison, show_awaken)"
                  alt=""
                  @dragstart.prevent
                />
                <div
                  style="
                    position: absolute;
                    display: flex;
                    background-color: rgba(0, 0, 0, 0.55);
                    color: white;
                    left: 0;
                    bottom: 16px;
                    border-top-right-radius: 6px;
                  "
                  v-if="(() => {
                  const ppm = party._params.get('manaboard2')
                  return ppm instanceof PartyParamManaboard2 ? !ppm[`${union}unison`].is_empty() : false
                })()"
                >
                  <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
                    {{
                      (() => {
                        // if (true) {
                        const m =
                          party._params.get('manaboard2')[`${union}unison`][`manaboard${i + 3}`]
                        return typeof m === 'number' ? m : '-'
                      })()
                    }}
                  </div>
                </div>
                <div>
                  <div style="text-align: center">
                    {{ get_show_text(party.party[union].unison, union, false) }}
                  </div>
                </div>
              </div>
              <div
                class="party-wfo-slot party-core"
                :class="[
                  selected_position.union == union && selected_position.position === 3
                    ? 'selected'
                    : '',
                  party.party[union].core ? `ele-${party.party[union].core.element}` : ''
                ]"
                @click="select_party(union, 3)"
              >
                <img :src="get_pic_url(party.party[union].core, true)" alt="" @dragstart.prevent />
                <div>
                  <div style="text-align: center">魂珠</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: 480px;
            margin: 16px;
            /*padding: 16px 0;*/
            box-sizing: content-box;
            user-select: none;
            /*border: red 6px solid;*/
            /*background-color: #0f0;*/
          "
        >
          <div v-for="i in 3" :key="i" style="display: flex; width: 20%; flex-direction: column">
            <div>
              {{ '技能条长' }}
            </div>
            <div>
              <el-progress
                :percentage="(get_skill_weight(party.party.union(i)) * 100) / 800"
                text-inside
                :stroke-width="20"
                :show-text="false"
                style="background: gray; border-radius: 100px; padding: 2px"
              >
                <span style="color: black">{{ get_skill_weight(party.party.union(i)) }}</span>
              </el-progress>
            </div>
          </div>
        </div>
        <div>
          <el-button
            type="warning"
            @click="
              () => {
                const unit_length = manager.unit_data.size
                const armament_length = manager.armament_data.size
                const ru = () =>
                  Array.from(manager.unit_data.keys())[Math.round(Math.random() * unit_length)]
                const ra = () =>
                  Array.from(manager.armament_data.keys())[
                    Math.round(Math.random() * armament_length)
                  ]
                party = PartyRelease.loads({
                  party: {
                    union1: [ru(), ru(), ra(), ra()],
                    union2: [ru(), ru(), ra(), ra()],
                    union3: [ru(), ru(), ra(), ra()]
                  }
                })
              }
            "
          >
            Random
          </el-button>
          <el-button type="danger" @click="party = PartyRelease.empty()"> Clear </el-button>
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: 480px;
            margin: 16px;
            /*padding: 16px 0;*/
            box-sizing: content-box;
            user-select: none;
          "
        >
          <div v-for="i in 3" :key="i" style="display: flex; width: 20%; flex-direction: column">
            <div>
              <div>{{ i === 1 ? '队长' : '主要角色' }}</div>
              <el-slider
                v-for="j in 3"
                :key="j"
                placement="left"
                :model-value="
                  (() => {
                    const ppm = party._params.get('manaboard2')
                    if (ppm instanceof PartyParamManaboard2) {
                      const v = ppm[`union${i}main`][`manaboard${j + 3}`]
                      return v === undefined ? -1 : v
                    }
                    return -1
                  })()
                "
                @input="(value) => input_mb2(party, value, i, j, false)"
                :format-tooltip="
                  (value) => {
                    if (value === -1) return '无'
                    else return value
                  }
                "
                :min="-1"
                :max="5"
                size="small"
              ></el-slider>
            </div>
            <div style="margin-top: 16px">
              <div>辅助角色</div>
              <el-slider
                v-for="j in 3"
                :key="j"
                placement="left"
                :model-value="
                  (() => {
                    const ppm = party._params.get('manaboard2')
                    if (ppm instanceof PartyParamManaboard2) {
                      const v = ppm[`union${i}unison`][`manaboard${j + 3}`]
                      return v === undefined ? -1 : v
                    }
                    return -1
                  })()
                "
                @input="(value) => input_mb2(party, value, i, j, true)"
                :format-tooltip="
                  (value) => {
                    if (value === -1) return '无'
                    else return value
                  }
                "
                :min="-1"
                :max="5"
                size="small"
              ></el-slider>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="selected_module === 'Upload'"
        style="display: flex; align-items: center; flex-direction: column; padding: 16px"
      >
        <div
          style="
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 16px;
            border-radius: 16px;
          "
        >
          <span>上传预览</span>
          <PartyReleaseCard v-if="party instanceof PartyRelease" :party_release="party" />
          <el-form label-width="70px" label-position="left" style="width: 100%; padding: 16px">
            <!--            <el-form-item v-if="false" label="自动Tag">-->
            <!--              <div style="display: flex; flex-wrap: wrap">-->
            <!--                <GameTag content="暗" />-->
            <!--              </div>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item v-if="false" label="已选Tag">-->
            <!--              <div style="display: flex; flex-wrap: wrap">-->
            <!--                <GameTag v-for="(tag, index) in tag_selected" :key="index" :content="tag" />-->
            <!--              </div>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item v-if="false" label="选择tag">-->
            <!--              <div style="display: flex; flex-wrap: wrap">-->
            <!--                <GameTag v-for="(tag, index) in tag_list" :key="index" :content="tag" />-->
            <!--              </div>-->
            <!--            </el-form-item>-->
            <!--            {{ quest_cascader }}-->
            <!--            <el-form-item v-if="false" label="副本Tag">-->
            <!--              <el-cascader-->
            <!--                v-model="quest_cascader"-->
            <!--                :options="[-->
            <!--                  {-->
            <!--                    value: 'normal',-->
            <!--                    label: '常驻',-->
            <!--                    children: [-->
            <!--                      {-->
            <!--                        value: 101,-->
            <!--                        label: '猫头鹰',-->
            <!--                        children: [-->
            <!--                          {-->
            <!--                            value: 1,-->
            <!--                            label: '初级'-->
            <!--                          }-->
            <!--                        ]-->
            <!--                      },-->
            <!--                      {-->
            <!--                        value: 102,-->
            <!--                        label: '废墟魔像',-->
            <!--                        children: [-->
            <!--                          {-->
            <!--                            value: 1,-->
            <!--                            label: '中级'-->
            <!--                          },-->
            <!--                          {-->
            <!--                            value: 2,-->
            <!--                            label: '高级'-->
            <!--                          },-->
            <!--                          {-->
            <!--                            value: 3,-->
            <!--                            label: '高级+'-->
            <!--                          },-->
            <!--                          {-->
            <!--                            value: 4,-->
            <!--                            label: '超级'-->
            <!--                          }-->
            <!--                        ]-->
            <!--                      }-->
            <!--                    ]-->
            <!--                  }-->
            <!--                ]"-->
            <!--                filterable-->
            <!--              >-->
            <!--              </el-cascader>-->
            <!--              <el-button style="margin-left: 8px" type="primary">添加</el-button>-->
            <!--            </el-form-item>-->
            <el-form-item label="标题">
              <el-input
                v-model="party.title"
                placeholder="注意：投稿标题与上传标题可能不同，未来将会弃用"
              ></el-input>
            </el-form-item>
            <el-form-item label="来源">
              <el-input v-model="source_input" placeholder="可选，上传后添加"></el-input>
            </el-form-item>
          </el-form>
          <div style="display: flex">
            <!--            <el-button type="primary">投稿</el-button>-->
            <el-popover v-if="!user.is_login()" placement="top">
              <span style="text-align: center">没有上传权限</span>
              <template #reference>
                <div style="margin-left: 16px">
                  <el-button disabled type="warning">上传</el-button>
                </div>
              </template>
            </el-popover>
            <div v-else style="margin-left: 16px">
              <el-button @click="upload_party" type="warning">上传</el-button>
            </div>
          </div>
        </div>
      </div>

      <CalculatorResourcesView
        :selected_obj="selected_obj === null ? undefined : selected_obj"
        v-else-if="selected_module === 'Resources'"
      >
      </CalculatorResourcesView>
    </el-scrollbar>
    <div
      style="
        position: absolute;
        /*bottom: 50vh;*/
        /*left: -20px;*/
        /*width: calc(100% + 40px);*/
        width: 100%;
        /*background-color: red;*/
        z-index: 5;
        display: flex;
        justify-content: space-between;
        transition: bottom 0.3s ease;
      "
      :style="{
        bottom: hidden_menu ? '0' : '45vh'
      }"
    >
      <div style="flex: 1; text-align: left">
        <el-button
          style="border-radius: 0; margin: 0"
          :color="'rgba(155, 79, 211, 0.8)'"
          @click="
            () => {
              selected_type = 'Unit'
              update_show_list()
            }
          "
        >
          角色
        </el-button>
        <el-button
          style="border-radius: 0 8px 0 0; margin: 0"
          :color="'rgba(155, 79, 211, 0.8)'"
          @click="
            () => {
              selected_type = 'Armament'
              update_show_list()
            }
          "
        >
          装备
        </el-button>
      </div>
      <div style="flex: 1; text-align: center">
        <el-button
          style="border-radius: 8px 8px 0 0; width: 60%; margin: 0"
          :color="'rgba(17,134,132,0.8)'"
          @click="hidden_menu = !hidden_menu"
        >
          {{ hidden_menu ? '展开' : '收起' }}
        </el-button>
      </div>
      <div style="flex: 1; text-align: right">
        <el-button
          style="border-radius: 8px 0 0 0; margin: 0"
          :color="'rgba(17,134,132,0.8)'"
          @click="hidden_filters = !hidden_filters"
        >
          切换筛选
        </el-button>
      </div>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        background: linear-gradient(
            21deg,
            rgba(204, 32, 142, 0.05) 0%,
            rgba(103, 19, 210, 0.66) 68%,
            #1abc9c 91%
          ),
          radial-gradient(
            ellipse 100% 100% at 0% 50%,
            rgba(232, 25, 139, 0.69) 0%,
            rgba(199, 234, 253, 0.58) 100%
          );
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
        margin: 0;
        width: 100%;
        z-index: 6;
        transition: height 0.3s ease;
      "
      :style="{
        height: hidden_menu ? '0' : '45vh'
      }"
    >
      <el-scrollbar
        style="
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4),
            rgba(140, 140, 140, 0.25) 50%,
            transparent
          );
          border-radius: 12px 12px 0 0;
          margin: 8px;
          /*height: auto;*/
        "
      >
        <div style="padding-top: 16px; display: flex; flex-wrap: wrap; justify-content: center">
          <template v-if="showed_list">
            <div
              class="wfo"
              :style="{
                  '--element-color': ele2color[-1],
                  filter:
                    selected_obj === null ? `drop-shadow(0 0 8px var(--element-color))` : '',
                  'background-color': selected_obj === null ? 'rgba(52,255,201,0.8)' : ''
                }"
            >
              <EmptyPicOrigin
                @click="select_object(null)"
                :size="90"
              />
            </div>
            <template v-for="element in showed_list" :key="element">
              <div
                class="wfo"
                v-if="element instanceof Unit || element instanceof Armament"
                :style="{
                  '--element-color':
                    ele2color[
                      element instanceof Unit
                        ? element.element_id
                        : element instanceof Armament
                        ? element.element
                        : -1
                    ],
                  filter:
                    selected_obj === element ? `drop-shadow(0 0 8px var(--element-color))` : '',
                  'background-color': selected_obj === element ? 'rgba(52,255,201,0.8)' : ''
                }"
              >
                <UnitPicOrigin
                  v-if="element instanceof Unit"
                  @click="select_object(element)"
                  :unit="element"
                  :size="90"
                />
                <ArmamentPicOrigin
                  v-if="element instanceof Armament"
                  @click="select_object(element)"
                  :armament="element"
                  :size="90"
                />
              </div>
            </template>
          </template>
          <template v-else>
            <el-empty>
              <template #description>
                <span style="color: rgba(255, 255, 255, 0.9)"> Oops...该筛选下无匹配内容 </span>
              </template>
            </el-empty>
          </template>
        </div>
      </el-scrollbar>
      <div
        style="padding: 8px; color: rgba(255, 255, 255, 0.9); display: initial"
        :style="{ display: hidden_menu || hidden_filters ? 'none' : '' }"
      >
        <div style="margin: 4px; display: flex">
          <span style="margin: 4px; display: inline-block; width: 50px">搜索</span>
          <el-input v-model="filter.text" clearable></el-input>
        </div>
        <div
          style="display: flex; flex-wrap: wrap; --button-active-color: rgba(189, 255, 235, 0.8)"
        >
          <div style="margin: 4px">
            <span style="margin: 4px; display: inline-block; width: 50px">属性</span>
            <el-button
              size="small"
              type="primary"
              plain
              style="margin: 0 8px 0 0"
              @click="
                () => {
                  if (filter_default.element.length === filter.element.length) filter.element = []
                  else filter.element = JSON.parse(JSON.stringify(filter_default.element))
                }
              "
            >
              {{ filter_default.element.length !== filter.element.length ? '全部' : '清空' }}
            </el-button>
            <el-checkbox-group
              fill="var(--button-active-color)"
              v-model="filter.element"
              style="display: inline; vertical-align: middle"
              size="small"
            >
              <el-checkbox-button
                v-for="(ele, id_) in {
                  [-1]: 'none',
                  0: 'fire',
                  1: 'water',
                  2: 'thunder',
                  3: 'wind',
                  4: 'light',
                  5: 'dark'
                }"
                :key="id_"
                :label="parseInt(id_)"
                @change="
                  () => {
                    if (filter.element.length === filter_default.element.length) {
                      filter.element.splice(0, filter.element.length)
                      filter.element.push(parseInt(id_))
                    }
                  }
                "
              >
                <img
                  style="width: 14px; height: 14px"
                  :src="`/static/worldflipper/icon/${ele}.png`"
                  alt=""
                />
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div style="margin: 4px">
            <span style="margin: 4px; display: inline-block; width: 50px">稀有度</span>
            <el-button
              size="small"
              type="primary"
              plain
              style="margin: 0 8px 0 0"
              @click="
                () => {
                  if (filter_default.rarity.length === filter.rarity.length) filter.rarity = []
                  else filter.rarity = JSON.parse(JSON.stringify(filter_default.rarity))
                }
              "
            >
              {{ filter_default.rarity.length !== filter.rarity.length ? '全部' : '清空' }}
            </el-button>
            <el-checkbox-group
              fill="var(--button-active-color)"
              v-model="filter.rarity"
              style="display: inline; vertical-align: middle"
              size="small"
            >
              <el-checkbox-button
                v-for="(rarity, id_) in { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }"
                :key="id_"
                :label="parseInt(id_)"
                @change="
                  () => {
                    if (filter.rarity.length === filter_default.rarity.length) {
                      filter.rarity.splice(0, filter.rarity.length)
                      filter.rarity.push(parseInt(id_))
                    }
                  }
                "
              >
                <img
                  style="height: 14px"
                  :src="`/static/worldflipper/icon/star${rarity}.png`"
                  alt=""
                />
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div v-if="selected_type === 'Unit'" style="margin: 4px">
            <span style="margin: 4px; display: inline-block; width: 50px">类型</span>
            <el-button
              size="small"
              type="primary"
              plain
              style="margin: 0 8px 0 0"
              @click="
                () => {
                  if (filter_default.type.length === filter.type.length) filter.type = []
                  else filter.type = JSON.parse(JSON.stringify(filter_default.type))
                }
              "
            >
              {{ filter_default.type.length !== filter.type.length ? '全部' : '清空' }}
            </el-button>
            <el-checkbox-group
              text-color="rgba(0, 0, 0, 0.85)"
              fill="var(--button-active-color)"
              v-model="filter.type"
              style="display: inline; vertical-align: middle"
              size="small"
            >
              <el-checkbox-button
                v-for="(name, id_) in { 0: '剑士', 1: '格斗', 2: '射击', 3: '辅助', 4: '特殊' }"
                :key="id_"
                :label="parseInt(id_)"
                @change="
                  () => {
                    if (filter.type.length === filter_default.type.length) {
                      filter.type.splice(0, filter.type.length)
                      filter.type.push(parseInt(id_))
                    }
                  }
                "
              >
                {{ name }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div v-if="selected_type === 'Unit'" style="margin: 4px">
            <span style="margin: 4px; display: inline-block; width: 50px">种族</span>
            <el-button
              size="small"
              type="primary"
              plain
              style="margin: 0 8px 0 0"
              @click="
                () => {
                  if (filter_default.race.length === filter.race.length) filter.race = []
                  else filter.race = JSON.parse(JSON.stringify(filter_default.race))
                }
              "
            >
              {{ filter_default.race.length !== filter.race.length ? '全部' : '清空' }}
            </el-button>
            <el-checkbox-group
              text-color="rgba(0, 0, 0, 0.85)"
              fill="var(--button-active-color)"
              v-model="filter.race"
              style="display: inline; vertical-align: middle"
              size="small"
            >
              <el-checkbox-button
                v-for="(name, id_) in {
                  Human: '人',
                  Beast: '兽',
                  Mystery: '妖',
                  Element: '精灵',
                  Dragon: '龙',
                  Machine: '机械',
                  Devil: '魔',
                  Plants: '植物',
                  Aquatic: '水栖',
                  Undead: '不死'
                }"
                :key="id_"
                :label="id_"
                @change="
                  () => {
                    if (filter.race.length === filter_default.race.length) {
                      filter.race.splice(0, filter.race.length)
                      filter.race.push(id_)
                    }
                  }
                "
              >
                {{ name }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CalculatorView',
  data: () => {
    return {}
  }
}
</script>
<style scoped>
.wfo {
  /*margin: 4px;*/
  margin: 1px;
  padding: 3px;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  filter: none;
  box-shadow: none;
  transition: background-color 0.2s ease, scale 0.4s ease;
}

.wfo:hover {
  z-index: 1;
  filter: drop-shadow(0 0 16px var(--element-color));
  scale: 1.025;
}

.party-body {
  user-select: none;
  width: 480px;
  height: 205px;
  background: transparent;
  display: flex;
  border: 6px solid var(--main-color);
  box-sizing: content-box;
  border-radius: 6px;
  transition: box-shadow 0.2s linear;
  box-shadow: none;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  /* font-family: 'Courier New', Courier, monospace; */
  /* font-family: "黑体"; */
  font-size: 13px;
  color: black;
}

.party-union {
  width: 150px;
  height: 195px;
  margin: 5px;
  position: relative;
  /* background-color: crimson; */
}

.party-union img {
  display: block;
}

.party-wfo {
  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 0 0 4px black;
  margin: 2px 0;
  width: 62px;
  cursor: pointer;
}

.ele-none:before {
  background-image: url('/static/worldflipper/icon/none.png');
}

.ele-fire:before {
  background-image: url('/static/worldflipper/icon/fire.png');
}

.ele-water:before {
  background-image: url('/static/worldflipper/icon/water.png');
}

.ele-thunder:before {
  background-image: url('/static/worldflipper/icon/thunder.png');
}

.ele-wind:before {
  background-image: url('/static/worldflipper/icon/wind.png');
}

.ele-light:before {
  background-image: url('/static/worldflipper/icon/light.png');
}

.ele-dark:before {
  background-image: url('/static/worldflipper/icon/dark.png');
}

.party-wfo-slot.party-main::before,
.party-wfo-slot.party-unison::before {
  content: '';
  background-size: 14px;
  background-position: 1px 1px;
  background-repeat: no-repeat;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -2px;
  right: -2px;
  border-radius: 3px;
  background-color: white;
  z-index: 10;
}

.party-wfo-slot {
  border: 3px solid white;
  border-radius: 3px;
  margin: 2px;
  position: absolute;
  /*background-color: aqua;*/
  background-color: white;
  transition: border 0.2s ease;
  box-shadow: 0 0 2px black;
  /*cursor: pointer;*/
  cursor: auto;
}

.party-wfo-slot.selected {
  border: 3px solid rgba(177, 105, 252, 0.8);
}

.party-main {
  z-index: 3;
  width: 88px;
  height: 104px;
  left: 0;
  top: 0;
}

.party-main > img {
  width: 82px;
  height: 82px;
}

.party-armament {
  z-index: 5;
  width: 60px;
  height: 76px;
  top: 16px;
  right: 0;
}

.party-armament > img {
  width: 54px;
  height: 54px;
}

.party-unison {
  z-index: 2;
  width: 75px;
  height: 91px;
  bottom: 0;
  right: 0;
}

.party-unison > img {
  width: 69px;
  height: 69px;
}

.party-core {
  box-shadow: none;
  width: 60px;
  height: 76px;
  bottom: 3px;
  left: 5px;
}

.party-core > img {
  width: 54px;
  height: 54px;
}
.wiki-card {
  zoom: 100%;
}
@media (max-width: 1080px) {
  .wiki-card {
    zoom: 75%;
  }
}
.el-form-item {
  margin-bottom: 4px;
}
</style>
