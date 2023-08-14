<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWorldflipperDataStore } from '@/stores/worldflipper'

const show_mainpage = ref([0])

const worldflipper = useWorldflipperDataStore()
const router = useRouter()
</script>

<template>
  <div
    style="
      overflow: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    "
  >
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, 180px);
        justify-content: center;
        margin: 8px;
        grid-gap: 16px;
      "
    >
      <v-card elevation="6" @click="router.push('/partyEditor')" class="main-page-button">
        <p style="font-size: 18px">组盘器</p>
        <p><v-icon size="42" icon="mdi-calculator" /></p>
      </v-card>
      <v-card elevation="6" @click="router.push('/partySearcher')" class="main-page-button">
        <p style="font-size: 18px">查盘器</p>
        <p><v-icon size="42" icon="mdi-magnify" /></p>
      </v-card>
      <v-card elevation="6" @click="router.push('/table')" class="main-page-button">
        <p style="font-size: 18px">一图流</p>
        <p><v-icon size="42" icon="mdi-table" /></p>
      </v-card>
      <a href="https://github.com/Gomacker/Anisebot" target="_blank">
        <v-card v-ripple elevation="6" class="main-page-button">
          <p style="font-size: 18px">Bot</p>
          <p><v-icon size="42" icon="mdi-github" /></p>
        </v-card>
      </a>
    </div>
    <v-expansion-panels v-if="false" v-model="show_mainpage">
      <v-expansion-panel title=" ">
        <v-expansion-panel-text>
          <div
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              padding: 20px;
            "
          >
            <div style="margin: 8px">
              <div style="font-weight: 700; font-size: 24px">当前活动</div>
              <v-img
                style="width: 480px; height: 270px; margin: 4px 0"
                class="elevation-4"
                cover=""
                :src="'/static/worldflipper/st/banner/青女公告配图2.png'"
              />
            </div>
            <div style="margin: 8px">
              <div style="font-weight: 700; font-size: 24px">当前卡池</div>
              <v-img
                style="width: 480px; height: 270px; margin: 4px 0"
                class="elevation-4"
                cover=""
                :src="'/static/worldflipper/st/banner/250b6fdcae1229fcd1d3efa245125c1e1365027097.jpg'"
              />
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.main-page-button {
  user-select: none;
  background: rgba(0 0 0 / 0.35);
  backdrop-filter: blur(4px);
  color: black;
  padding: 16px;
}
</style>
