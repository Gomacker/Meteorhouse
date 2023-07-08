<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import { Armament, manager, Unit } from '@/stores/manager'
import ArmamentPicOrigin from '@/components/objects/armament/ArmamentPicOrigin.vue'

const statistic_unit = ref<Map<Unit, number>>(new Map())
const statistic_armament = ref<Map<Armament, number>>(new Map())
// const statistic_armament = ref()
axios.post('/api/v1/party/statistic/').then((r) => {
  statistic_unit.value = new Map(
    Object.entries(r.data['unit'])
      .map((i) => [manager.unit_data.get(parseInt(i[0])), i[1]])
      .filter((r) => r[0] instanceof Unit)
  )
  statistic_armament.value = new Map(
    Object.entries(r.data['armament'])
      .map((i) => [manager.armament_data.get(parseInt(i[0])), i[1]])
      .filter((r) => r[0] instanceof Armament)
  )
})
</script>

<template>
  <div style="display: flex">
    <div v-if="statistic_unit.size">
      <v-card
        v-ripple
        style="display: flex; padding: 16px; margin: 16px; width: 360px"
        elevation="4"
        v-for="(unit, index) in new Map(
          Array.from(statistic_unit)
            .sort((a, b) => b[1] - a[1])
            .map((i) => [i[0], i[1]])
        )"
        :key="unit[0]"
      >
        <div
          style="display: flex; align-items: center; margin: 8px; font-size: 36px; min-width: 56px"
        >
          {{ index + 1 }}
        </div>
        <UnitPicOrigin :unit="unit[0]" :size="90" />
        <v-card-item>
          <div style="font-size: 24px">{{ unit[0].name_zh }}</div>
          <div>录入总计：{{ unit[1] }}</div>
        </v-card-item>
      </v-card>
    </div>
    <div v-if="statistic_armament.size">
      <v-card
        style="display: flex; padding: 16px; margin: 16px; width: 360px"
        elevation="4"
        v-for="(armament, index) in new Map(
          Array.from(statistic_armament)
            .sort((a, b) => b[1] - a[1])
            .map((i) => [i[0], i[1]])
        )"
        :key="armament[0]"
      >
        <div
          style="display: flex; align-items: center; margin: 8px; font-size: 36px; min-width: 56px"
        >
          {{ index + 1 }}
        </div>
        <ArmamentPicOrigin :armament="armament[0]" :size="90" />
        <v-card-item>
          <div style="font-size: 24px">{{ armament[0].name_zh }}</div>
          <div>录入总计：{{ armament[1] }}</div>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<style scoped></style>
