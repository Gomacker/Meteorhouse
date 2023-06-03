<script setup lang="ts">
import { manager } from '@/stores/manager'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import { ref } from 'vue'
import axios from 'axios'

const roster_data = ref<{
  unit: Map<number, Array<string>>
  armament: Map<number, Array<string>>
}>({ unit: new Map(), armament: new Map() })
axios.post('/api/v1/data/roster/').then((r) => {
  roster_data.value.unit = new Map(
    Object.entries(r.data['unit']).map((value) => [parseInt(value[0]), <Array<string>>value[1]])
  )
  roster_data.value.armament = new Map(
    Object.entries(r.data['armament']).map((value) => [parseInt(value[0]), <Array<string>>value[1]])
  )
})
const page = ref(1)
const opp = ref(12)
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <el-scrollbar style="height: 80%">
      <div
        style="
          display: flex;
          padding: 20px 0;
          align-items: flex-start;
          flex-wrap: wrap;
          justify-content: center;
        "
      >
        <template v-if="roster_data">
          <div
            style="
              background-color: pink;
              margin: 2px;
              display: flex;
              align-items: center;
              flex-direction: column;
              width: 160px;
              padding: 4px;
              border-radius: 4px;
            "
            v-for="(unit, index) in manager.unit_data.values()"
            :key="index"
          >
            <UnitPicOrigin :unit="unit" :size="90" style="margin: 4px" />
            <div style="display: flex; text-align: center; flex-direction: column; width: 100%">
              <div style="font-size: 9px">{{ unit.name_sub }}</div>
              <div style="font-size: 18px">{{ unit.name_zh }}</div>
              <div style="font-size: 9px">{{ unit.name_jp }}</div>
              <div
                style="display: flex; margin: 2px 0"
                v-for="(r, index) in roster_data.unit.get(unit.id)"
                :key="index"
              >
                <el-input
                  size="small"
                  v-model="(<Array<string>>roster_data.unit.get(unit.id))[index]"
                ></el-input>
                <el-button
                  size="small"
                  @click="roster_data.unit.get(unit.id).splice(index, 1)"
                  style="margin-left: 4px"
                  type="danger"
                >
                  x
                </el-button>
              </div>
              <el-button
                @click="
                  roster_data.unit.get(unit.id) instanceof Array
                    ? roster_data.unit.get(unit.id).push('')
                    : roster_data.unit.set(unit.id, [''])
                "
                style="margin: 2px"
                size="small"
                type="primary"
                plain
                round
              >
                +
              </el-button>
            </div>
          </div>
        </template>
      </div>
    </el-scrollbar>
    <el-pagination layout="prev, pager, next" :total="manager.unit_data.size" :page-size="opp"></el-pagination>
  </div>
</template>

<style scoped></style>
