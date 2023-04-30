<script setup lang="ts">
import { Unit, ele_id2ele, type2zh, manager } from '@/stores/manager'
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import UnitWikiCard from "@/components/card/UnitWikiCard.vue";
import UnitPicOrigin from "@/components/objects/unit/UnitPicOrigin.vue";

const unit = ref()
const drawer = ref(false)
const ra = () =>
    Array.from(manager.unit_data.keys())[Math.round(Math.random() * manager.unit_data.size)]

function save_unit(source_id: string, id: number, unit: Unit) {
  axios
      .post(`/api/v1/origin/${source_id}/unit/update/`, { id: id, data: unit._data })
      .then(() => {
        ElMessage.success(`已保存 ${unit.id}`)
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
              :disabled="!(unit instanceof Unit)"
              @click="
              () => {
                if (unit instanceof Unit) {
                  save_unit('sc', unit.id, unit)
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
                unit = new Unit(
                  JSON.parse(JSON.stringify(manager.unit_data.get(ra())._data))
                )
              }
            "
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
            v-if="unit instanceof Unit"
            style="width: 100%; border-radius: 0; zoom: 75%"
            :unit="unit"
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
              <div v-for="u in manager.unit_data" :key="u[0]">
                <UnitPicOrigin
                    style="margin: 2px; filter: drop-shadow(0 0 2px rgba(0 0 0 / 0.5))"
                    :size="60"
                    :unit="u[1]"
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
        <template v-if="unit instanceof Unit">
          <el-form inline label-width="40px">
            <el-form-item label="ID"> {{ unit.id }} {{ unit.extraction_id }} </el-form-item>
          </el-form>
          <el-form inline label-width="40px">
            <el-form-item label="属性">
              <el-select v-model="unit._data['element']">
                <el-option style="display: flex; align-items: center;" v-for="(ele, i) in ele_id2ele" :label="ele" :value="parseInt(i)" :key="i">
                  <img style="width: 18px;" :src="`/static/worldflipper/icon/${ele}.png`" alt=""/>
                  <span style="margin-left: 12px;">{{ ele }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="星级">
              <el-select v-model="unit._data['rarity']">
                <el-option v-for="i in 5" :label="i" :value="parseInt(i)" :key="i">
                  {{ i }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="unit._data['pf_type']">
                <el-option v-for="(type, i) in type2zh" :label="type" :value="parseInt(i)" :key="i">
                  {{ type }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="种族">
              <el-input v-model="unit._data['race']"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="unit._data['gender']"></el-input>
            </el-form-item>
            <el-form-item label="CV">
              <el-input v-model="unit._data['cv']"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="40px">
            <el-form-item label="名称">
              <el-input v-model="unit._data['name'][0]"></el-input>
              <el-input v-model="unit._data['name'][1]"></el-input>
              <el-input v-model="unit._data['name'][2]"></el-input>
            </el-form-item>
            <el-form-item label="白值">
              <el-input disabled v-model="unit._data['status_data']"></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="队长">
              <el-input v-model="unit._data['leader_ability_name']"></el-input>
              <el-input type="textarea" autosize v-model="unit._data['leader_ability']"></el-input>
            </el-form-item>
            <el-form-item label="技能">
              <el-input v-model="unit._data['skill_name']"></el-input>
              <el-input-number v-model="unit._data['skill_weight']"></el-input-number>
              <el-input type="textarea" autosize v-model="unit._data['skill_description']"></el-input>
            </el-form-item>
            <el-form-item label="能力">
              <el-input type="textarea" autosize v-model="unit._data['ability1']"></el-input>
              <el-input type="textarea" autosize v-model="unit._data['ability2']"></el-input>
              <el-input type="textarea" autosize v-model="unit._data['ability3']"></el-input>
              <el-input type="textarea" autosize v-model="unit._data['ability4']"></el-input>
              <el-input type="textarea" autosize v-model="unit._data['ability5']"></el-input>
              <el-input type="textarea" autosize v-model="unit._data['ability6']"></el-input>
            </el-form-item>
            <el-divider style="margin: 8px 0" />
            <el-form-item label="描述">
              <el-input type="textarea" autosize v-model="unit._data['description']"></el-input>
            </el-form-item>
            <el-form-item label="获取">
              <el-input type="textarea" autosize v-model="unit._data['obtain']"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
