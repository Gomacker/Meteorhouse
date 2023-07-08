<script setup lang="ts">
import PartySearcherView from '@/views/PartySearcherView.vue'
import { ref } from 'vue'

const show_mainpage = ref([0])
</script>

<template>
  <div style="overflow: auto; display: flex; flex-direction: column">

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
    <PartySearcherView v-if="false"></PartySearcherView>
  </div>
</template>

<style scoped>
</style>
