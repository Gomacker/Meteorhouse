<script setup lang="ts">
import ArmamentWikiCard from '@/components/card/ArmamentWikiCard.vue'
import { Armament, ele_id2ele, manager } from '@/stores/manager'
import { ref } from 'vue'
import ArmamentPicOrigin from '@/components/objects/armament/ArmamentPicOrigin.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const armament = ref()
const drawer = ref(false)
const ra = () =>
  Array.from(manager.armament_data.keys())[Math.round(Math.random() * manager.armament_data.size)]

function save_armament(source_id: string, id: number, armament: Armament) {
  axios
    .post(`/api/v1/origin/${source_id}/armament/update/`, { id: id, data: armament._data })
    .then(() => {
      ElMessage.success(`已保存 ${armament.id}`)
    })
    .catch(e => {
      console.log(e)
      ElMessage.error('保存失败')
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
            :disabled="!(armament instanceof Armament)"
            @click="
              () => {
                if (armament instanceof Armament) {
                  save_armament('sc', armament.id, armament)
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
              () => {
                armament = new Armament(
                  JSON.parse(JSON.stringify(manager.armament_data.get(ra())._data))
                )
              }
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
          v-if="armament instanceof Armament"
          style="width: 100%; border-radius: 0; zoom: 75%"
          :armament="armament"
        />
        <div v-else>Select a Object</div>
      </el-scrollbar>
      <el-drawer :modal="false" direction="rtl" style="" v-model="drawer">
        <div style="display: flex; flex-direction: column">
          <div style="display: flex; align-items: center">
            <span>数据源</span>
            <el-select style="margin-left: 8px"></el-select>
            <el-button style="margin-left: 8px">加载</el-button>
          </div>
          <el-scrollbar>
            <div style="display: flex; flex-wrap: wrap; justify-content: center">
              <div v-for="arma in manager.armament_data" :key="arma[0]">
                <ArmamentPicOrigin
                  style="margin: 2px; filter: drop-shadow(0 0 2px rgba(0 0 0 / 0.5))"
                  :size="60"
                  :armament="arma[1]"
                />
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-drawer>
      <el-scrollbar
        always
        style="background-color: rgba(255, 127, 255, 0.5); width: 100%; padding: 16px; height: 70%"
      >
        <template v-if="armament instanceof Armament">
          <el-form label-width="40px">
            <el-form-item label="ID"> {{ armament.id }} {{ armament.extraction_id }} </el-form-item>
            <el-form-item label="属性">
              <el-select v-model="armament._data['element']">
                <el-option style="display: flex; align-items: center;" v-for="(ele, i) in ele_id2ele" :label="ele" :value="parseInt(i)" :key="i">
                  <img style="width: 18px;" :src="`/static/worldflipper/icon/${ele}.png`" alt=""/>
                  <span style="margin-left: 12px;">{{ ele }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="星级">
              <el-select v-model="armament._data['rarity']">
                <el-option v-for="i in 5" :label="i" :value="parseInt(i)" :key="i">
                  {{ i }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="armament._data['name'][0]"></el-input>
              <el-input v-model="armament._data['name'][1]"></el-input>
            </el-form-item>
            <el-form-item label="白值">
              <el-input v-model="armament._data['status_data']"></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="能力">
              <el-input type="textarea" autosize v-model="armament._data['ability']"></el-input>
            </el-form-item>
            <el-form-item label="魂珠">
              <el-input
                type="textarea"
                autosize
                v-model="armament._data['ability_soul']"
              ></el-input>
            </el-form-item>
            <el-form-item label="觉醒">
              <el-input
                type="textarea"
                autosize
                v-model="armament._data['ability_awaken3']"
              ></el-input>
              <el-input
                type="textarea"
                autosize
                v-model="armament._data['ability_awaken5']"
              ></el-input>
            </el-form-item>
            <el-form-item label="强化">
              <el-input
                type="textarea"
                autosize
                v-model="armament._data['ability_augment1']"
              ></el-input>
              <el-input
                type="textarea"
                autosize
                v-model="armament._data['ability_augment70']"
              ></el-input>
              <el-input
                type="textarea"
                autosize
                v-model="armament._data['ability_augment100']"
              ></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="描述">
              <el-input type="textarea" autosize v-model="armament._data['description']"></el-input>
            </el-form-item>
            <el-form-item label="获取">
              <el-input type="textarea" autosize v-model="armament._data['obtain']"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
