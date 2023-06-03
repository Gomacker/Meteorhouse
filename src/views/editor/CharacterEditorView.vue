<script setup lang="ts">
import { Unit, ele_id2ele, type2zh } from '@/stores/manager'
import { onBeforeUnmount, onMounted, ref } from "vue";
import axios from 'axios'
import { ElMessage } from 'element-plus'
import UnitWikiCard from '@/components/card/UnitWikiCard.vue'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'

const unit_list = ref<Map<number, Unit>>(new Map<number, Unit>())
const selected_unit = ref<Unit | undefined>(undefined)
const drawer = ref<boolean>(false)
const source_select = ref<string>()
const selected_source = ref<string>()
const ra = () =>
  Array.from(unit_list.value.keys())[Math.round(Math.random() * unit_list.value.size)]

function save_quick(event: any) {
  if (event.keyCode === 83 && event.ctrlKey) {
    console.log('ctrl + s')
    event.preventDefault()
    event.returnValue = false
    if (selected_unit.value instanceof Unit && selected_source.value) {
      save_unit(selected_source.value, selected_unit.value.id, selected_unit.value)
    }
    if (event.ctrlKey && event.code === 'KeyS') return false
  }
}

onMounted(() => {
  window.addEventListener('keydown', save_quick)
})
onBeforeUnmount(() => {
  window.addEventListener('keydown', save_quick)
})

function save_unit(source_id: string, id: number, unit: Unit) {
  axios
    .post(`/api/v1/origin/${source_id}/unit/update/`, { id: id, data: unit._data })
    .then(() => {
      ElMessage.success(`已保存 ${unit.id}`)
      unit_list.value.set(id, unit)
    })
    .catch((e) => {
      console.log(e)
      ElMessage.error('保存失败')
    })
}
function load_source(source_id: string) {
  unit_list.value.clear()
  axios.post(`/api/v1/origin/${source_id}/unit/get/`).then((r) => {
    console.log(r)
    for (const unit in r.data) {
      unit_list.value.set(parseInt(unit), new Unit(r.data[unit]))
      // console.log(data['unit'][unit])
    }
    // unit_list.value = new Map<number, Unit>(
    //   Array.from(unit_list.value).sort(
    //     (a, b) => parseInt(b[1].anise_id) - parseInt(a[1].anise_id)
    //   )
    // )
    selected_source.value = source_id
  })
}
</script>
<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <div style="display: flex; flex-direction: column; height: 100%; width: 100%">
      <div
        style="
          display: flex;
          flex-direction: row;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div style="flex: 33%">
          <el-button
            type="primary"
            :disabled="!(selected_unit instanceof Unit)"
            @click="
              () => {
                if (selected_unit instanceof Unit) {
                  if (typeof selected_source === 'string') {
                    save_unit(selected_source, selected_unit.id, selected_unit)
                  }
                }
              }
            "
          >
            保存
          </el-button>
        </div>
        <div style="flex: 33%; display: flex; justify-content: center">
          <el-button
            @click="
              selected_unit = Unit.load(JSON.parse(JSON.stringify(unit_list.get(ra())._data)))
            "
            :disabled="unit_list.size <= 0"
          >
            debug random
          </el-button>
        </div>
        <div style="flex: 33%">
          <el-button @click="drawer = true" style="float: right" type="primary">
            选择角色
          </el-button>
        </div>
      </div>
      <el-scrollbar always style="box-shadow: 0 0 4px black; width: 100%; height: 30%">
        <UnitWikiCard
          v-if="selected_unit instanceof Unit"
          style="width: 100%; border-radius: 0; zoom: 75%"
          :unit="selected_unit"
        />
        <div v-else>Select an Object</div>
      </el-scrollbar>
      <el-drawer size="50%" direction="rtl" style="" v-model="drawer">
        <div style="display: flex; flex-direction: column">
          <div style="display: flex; align-items: center">
            <span>数据源</span>
            <el-select style="margin-left: 8px" v-model="source_select">
              <el-option value="sc"></el-option>
              <el-option value="jp"></el-option>
              <el-option value="mh"></el-option>
            </el-select>
            <el-button
              style="margin-left: 8px"
              :disabled="typeof source_select !== 'string'"
              @click="
                () => {
                  if (typeof source_select === 'string') load_source(source_select)
                }
              "
            >
              加载
            </el-button>
          </div>
          <el-scrollbar>
            <div style="display: flex; flex-wrap: wrap; justify-content: center">
              <template v-for="u in unit_list" :key="u[0]">
                <UnitPicOrigin
                  style="
                    margin: 2px;
                    filter: drop-shadow(0 0 2px rgba(0 0 0 / 0.5));
                    cursor: pointer;
                  "
                  :size="90"
                  :unit="u[1]"
                  @click="selected_unit = Unit.load(JSON.parse(JSON.stringify(u[1]._data)))"
                />
              </template>
            </div>
          </el-scrollbar>
        </div>
      </el-drawer>
      <el-scrollbar
        always
        style="background-color: rgba(255 127 255 / 0.5); width: 100%; padding: 16px; height: 70%"
      >
        <template v-if="selected_unit instanceof Unit">
          <el-form inline label-width="40px">
            <el-form-item label="ID">
              {{ selected_unit.id }} {{ selected_unit.extraction_id }}</el-form-item
            >
          </el-form>
          <el-form inline label-width="40px">
            <el-form-item label="属性">
              <el-select v-model="selected_unit._data['element']">
                <el-option
                  style="display: flex; align-items: center"
                  v-for="(ele, i) in ele_id2ele"
                  :label="ele"
                  :value="typeof i === 'string' ? parseInt(i) : i"
                  :key="i"
                >
                  <img style="width: 18px" :src="`/static/worldflipper/icon/${ele}.png`" alt="" />
                  <span style="margin-left: 12px">{{ ele }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="星级">
              <el-select v-model="selected_unit._data['rarity']">
                <el-option v-for="i in 5" :label="i" :value="parseInt(String(i))" :key="i">
                  {{ i }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="selected_unit._data['pf_type']">
                <el-option
                  v-for="(type, i) in type2zh"
                  :label="type"
                  :value="typeof i === 'string' ? parseInt(i) : i"
                  :key="i"
                >
                  {{ type }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="种族">
              <el-input v-model="selected_unit._data['race']"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="selected_unit._data['gender']"></el-input>
            </el-form-item>
            <el-form-item label="CV">
              <el-input v-model="selected_unit._data['cv']"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="40px">
            <el-form-item label="名称">
              <el-input v-model="selected_unit._data['name'][0]"></el-input>
              <el-input v-model="selected_unit._data['name'][1]"></el-input>
              <el-input v-model="selected_unit._data['name'][2]"></el-input>
            </el-form-item>
            <el-form-item label="白值">
              <el-input v-model="selected_unit._data['status_data']"></el-input>
            </el-form-item>
            <el-form-item label="Tags">
              <el-input v-model="selected_unit._data['tags']"></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="队长">
              <el-input v-model="selected_unit._data['leader_ability_name']"></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['leader_ability']"
              ></el-input>
            </el-form-item>
            <el-form-item label="技能">
              <el-input v-model="selected_unit._data['skill_name']"></el-input>
              <el-input-number v-model="selected_unit._data['skill_weight']"></el-input-number>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['skill_description']"
              ></el-input>
            </el-form-item>
            <el-form-item label="能力">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['ability1']"
              ></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['ability2']"
              ></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['ability3']"
              ></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['ability4']"
              ></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['ability5']"
              ></el-input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['ability6']"
              ></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="selected_unit._data['description']"
              ></el-input>
            </el-form-item>
            <el-form-item label="获取">
              <el-input type="textarea" autosize v-model="selected_unit._data['obtain']"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
