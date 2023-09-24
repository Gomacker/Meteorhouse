<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import { Element } from '@/anise/worldflipper/object'
import EquipmentIcon from "@/components/worldflipper/equipment/EquipmentIcon.vue";
import { useRouter } from "vue-router";

const characterStatistics = ref({})
const equipmentStatistics = ref({})

async function getStatistics() {
  const response = await axios.get('/api/v2/worldflipper/data/party/statistics')
  characterStatistics.value = response.data['character']
  equipmentStatistics.value = response.data['equipment']
}

onMounted(() => {
  getStatistics()
})

const cst = computed(() =>
  (Object.entries(characterStatistics.value as object) as Array<Array<any>>)
    .map((value) => [characters.get(value[0]), value[1]])
    .sort((a, b) => b[1] - a[1])
)
const est = computed(() =>
  (Object.entries(equipmentStatistics.value as object) as Array<Array<any>>)
    .map((value) => [equipments.get(value[0]), value[1]])
    .sort((a, b) => b[1] - a[1])
)
const worldflipper = useWorldflipperDataStore()
const characters = worldflipper.characters
const equipments = worldflipper.equipments
function t() {
  return new Date()
}

const router = useRouter()
</script>

<template>
  <div style="margin-top: 18px">
    <div style="display: flex; flex-direction: column; align-items: center; font-size: 20px">
      <p>{{ t() }}</p>
      <p>数据仅捕获自 <span style="color: red">六废龙超本 与 六属地狱本</span></p>
    </div>
    <div style="display: flex">
      <div
        v-for="ele in [
          Element.Fire,
          Element.Water,
          Element.Thunder,
          Element.Wind,
          Element.Light,
          Element.Dark
        ]"
        :key="ele"
      >
        <template
          v-for="(c, index) in cst.filter((value) => value[0].element === ele).slice(0, 100)"
          :key="c"
        >
          <v-card
            style="
              display: flex;
              padding: 8px;
              margin: 4px;
              width: 320px;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
            "
            @click="router.push(`/lab/character?id=${c[0].id}`)"
          >
            <div style="display: flex; align-items: center">
              <div style="width: 30px; display: flex">
                {{ index + 1 }}
              </div>
              <CharacterIcon :obj="c[0]" :size="90" />
            </div>
            <div
              style="margin-left: 8px; display: flex; flex-direction: column; align-items: center"
            >
              <p style="font-size: 20px; font-weight: bold">{{ c[0].names[0] }}</p>
              <p>{{ c[1] }} 次记录</p>
            </div>
          </v-card>
        </template>
      </div>
      <div>
        <template
          v-for="(e, index) in est.slice(0, 100)"
          :key="e"
        >
          <v-card
            style="
              display: flex;
              padding: 8px;
              margin: 4px;
              width: 320px;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div style="display: flex; align-items: center">
              <div style="width: 30px; display: flex">
                {{ index + 1 }}
              </div>
              <EquipmentIcon :obj="e[0]" :size="90" />
            </div>
            <div
              style="margin-left: 8px; display: flex; flex-direction: column; align-items: center"
            >
              <p style="font-size: 20px; font-weight: bold">{{ e[0].names[0] }}</p>
              <p>{{ e[1] }} 次记录</p>
            </div>
          </v-card>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
