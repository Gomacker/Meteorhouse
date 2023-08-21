<script setup lang="ts">
import { manager } from '@/stores/manager'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import { ref } from 'vue'
import axios from 'axios'

const roster_data = ref<{
  unit: Map<number, Array<string>>
  armament: Map<number, Array<string>>
}>({ obj: new Map(), armament: new Map() })
axios.post('/api/v1/data/roster/').then((r) => {
  roster_data.value.unit = new Map(
    Object.entries(r.data['unit']).map((value) => [parseInt(value[0]), <Array<string>>value[1]])
  )
  roster_data.value.armament = new Map(
    Object.entries(r.data['armament']).map((value) => [parseInt(value[0]), <Array<string>>value[1]])
  )
})
const page = ref(1)
const opp = ref(40)
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <v-toolbar density="comfortable">
      <v-btn variant="tonal" color="primary">保存</v-btn>
      <v-text-field label="搜索" hide-details style="margin: 16px;" density="compact"></v-text-field>
      <v-btn variant="tonal" color="primary">切换</v-btn>
    </v-toolbar>
    <div
      style="
        height: 100%;
        overflow: hidden scroll;
        display: flex;
        padding: 20px 0;
        align-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: center;
      "
    >
      <template v-if="roster_data">
        <v-card
          style="
            background-color: pink;
            margin: 2px;
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 200px;
          "
          v-for="(unit, index) in Array.from(manager.unit_data.values()).slice((page - 1) * opp, page * opp)"
          :key="unit.id"
        >
          <UnitPicOrigin :unit="unit" :size="90" style="margin: 4px" />
          <div style="display: flex; text-align: center; flex-direction: column; width: 100%">
            <div style="font-size: 9px">{{ unit.name_sub }}</div>
            <div style="font-size: 18px">{{ unit.name_zh }}</div>
            <div style="font-size: 9px">{{ unit.name_jp }}</div>
            <v-expansion-panels style="margin-top: 8px">
              <v-expansion-panel title="　">
                <v-expansion-panel-text>
                  <div
                    style="display: flex; margin: 2px 0"
                    v-for="(r, index) in roster_data.unit.get(unit.id)"
                    :key="index"
                  >
                    <v-text-field
                      density="compact"
                      hide-details
                      v-model="(<Array<string>>roster_data.unit.get(unit.id))[index]"
                    />
                    <v-btn
                      color="error"
                      size="x-small"
                      @click="roster_data.unit.get(unit.id).splice(index, 1)"
                      style="margin-left: 4px"
                    >
                      x
                    </v-btn>
                  </div>
                  <v-btn
                    @click="
                      roster_data.unit.get(unit.id) instanceof Array
                        ? roster_data.unit.get(unit.id).push('')
                        : roster_data.unit.set(unit.id, [''])
                    "
                    style="width: 100%; margin: 2px"
                    size="small"
                    color="blue"
                    rounded
                    density="comfortable"
                  >
                    <v-icon icon="mdi-plus" />
                  </v-btn>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-card>
      </template>
    </div>
    <v-pagination v-model="page" :length="Math.ceil(manager.unit_data.size / opp)"/>
  </div>
</template>

<style scoped></style>
