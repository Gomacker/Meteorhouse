<script setup lang="ts">
import ArmamentWikiCard from '@/components/card/ArmamentWikiCard.vue'
import { Armament, ele_id2ele, manager, Unit } from "@/stores/manager";
import { onBeforeUnmount, onMounted, ref } from "vue";
import ArmamentPicOrigin from '@/components/objects/armament/ArmamentPicOrigin.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const armament_list = ref<Map<number, Armament>>(new Map<number, Armament>())
const selected_armament = ref<Armament | undefined>(undefined)
const drawer = ref<boolean>(false)
const source_select = ref<string>()
const selected_source = ref<string>()
const ra = () =>
  Array.from(armament_list.value.keys())[Math.round(Math.random() * armament_list.value.size)]

function save_quick(event: any) {
  if (event.keyCode === 83 && event.ctrlKey) {
    console.log('ctrl + s')
    event.preventDefault()
    event.returnValue = false
    if (selected_armament.value instanceof Armament && selected_source.value) {
      save_armament(selected_source.value, selected_armament.value.id, selected_armament.value)
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

function save_armament(source_id: string, id: number, armament: Armament) {
  axios
    .post(`/api/v1/origin/${source_id}/armament/update/`, { id: id, data: armament._data })
    .then(() => {
      ElMessage.success(`已保存 ${armament.id}`)
      armament_list.value.set(id, armament)
    })
    .catch((e) => {
      console.log(e)
      ElMessage.error('保存失败')
    })
}
function load_source(source_id: string) {
  armament_list.value.clear()
  axios.post(`/api/v1/origin/${source_id}/armament/get/`).then((r) => {
    console.log(r)
    for (const armament in r.data) {
      armament_list.value.set(parseInt(armament), new Armament(r.data[armament]))
      // armament_list.value = new Map<number, Armament>(
      //   Array.from(armament_list.value).sort(
      //     (a, b) => parseInt(b[1].anise_id) - parseInt(a[1].anise_id)
      //   )
      // )
      selected_source.value = source_id
      // console.log(data['unit'][unit])
    }
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
            :disabled="!(selected_armament instanceof Armament)"
            @click="
              () => {
                if (selected_armament instanceof Armament) {
                  if (typeof selected_source === 'string') {
                    save_armament(selected_source, selected_armament.id, selected_armament)
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
              selected_armament = Armament.load(
                JSON.parse(JSON.stringify(manager.armament_data.get(ra())._data))
              )
            "
          >
            debug random
          </el-button>
        </div>
        <div style="flex: 33%">
          <el-button @click="drawer = true" style="float: right" type="primary">
            选择装备
          </el-button>
        </div>
      </div>
      <el-scrollbar always style="box-shadow: 0 0 4px black; width: 100%; height: 30%">
        <ArmamentWikiCard
          v-if="selected_armament instanceof Armament"
          style="width: 100%; border-radius: 0; zoom: 75%"
          :armament="selected_armament"
        />
        <div v-else>Select an Object</div>
      </el-scrollbar>
      <el-drawer direction="rtl" size="50%" v-model="drawer">
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
              <template v-for="a in armament_list" :key="a[0]">
                <ArmamentPicOrigin
                  style="
                    margin: 2px;
                    filter: drop-shadow(0 0 2px rgba(0 0 0 / 0.5));
                    cursor: pointer;
                  "
                  :size="90"
                  :armament="a[1]"
                  @click="selected_armament = Armament.load(JSON.parse(JSON.stringify(a[1]._data)))"
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
        <template v-if="selected_armament instanceof Armament">
          <el-form label-width="40px">
            <el-form-item label="ID">
              {{ selected_armament.id }} {{ selected_armament.extraction_id }}
            </el-form-item>
            <el-form-item label="属性">
              <el-select v-model="selected_armament._data['element']">
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
              <el-select v-model="selected_armament._data['rarity']">
                <el-option v-for="i in 5" :label="i" :value="parseInt(String(i))" :key="i">
                  {{ i }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="selected_armament._data['name'][0]"></el-input>
              <el-input v-model="selected_armament._data['name'][1]"></el-input>
            </el-form-item>
            <el-form-item label="白值">
              <el-input v-model="selected_armament._data['status_data']"></el-input>
            </el-form-item>
            <el-form-item label="Tags">
              <el-input v-model="selected_armament._data['tags']"></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="能力">
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['ability']"
              ></el-input>
            </el-form-item>
            <el-form-item label="魂珠">
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['ability_soul']"
              ></el-input>
            </el-form-item>
            <el-form-item label="觉醒">
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['ability_awaken3']"
              ></el-input>
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['ability_awaken5']"
              ></el-input>
            </el-form-item>
            <el-form-item label="强化">
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['ability_augment1']"
              ></el-input>
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['ability_augment70']"
              ></el-input>
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['ability_augment100']"
              ></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="描述">
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['description']"
              ></el-input>
            </el-form-item>
            <el-form-item label="获取">
              <el-input
                type="textarea"
                autosize
                v-model="selected_armament._data['obtain']"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
