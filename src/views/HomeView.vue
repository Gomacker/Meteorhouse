<script setup lang="ts">
import PartySearcherView from '@/views/PartySearcherView.vue'
import {ref} from "vue";

const show_mainpage = ref([0]);
</script>

<template>
  <div style="overflow: auto; display: flex; flex-direction: column">
    <div v-if="false" style="min-width: max-content">
      <div
        class="elevation-8"
        style="
          position: sticky;
          top: 0;
          z-index: 2;
          background-color: #444;
          color: white;
          display: flex;
        "
      >
        <div v-ripple class="event-column" style="width: 500px">
          <v-img
            @dragstart.prevent
            :src="'/static/worldflipper/logo/world_story_event/crown_beasts/crown_beasts_logo.png'"
          />
        </div>
        <div v-ripple class="event-column">活动A</div>
        <div v-ripple class="event-column">
          <v-img
            @dragstart.prevent
            :src="'/static/worldflipper/logo/advent_event/advent_event_logo_01.png'"
          />
        </div>
        <div v-ripple class="event-column" v-for="c in ['卡池A', '卡池B']" :key="c">
          {{ c }}
        </div>
        <div
          v-ripple
          class="event-column"
          style="width: 7.5%; font-size: 22px"
          v-for="c in ['小活动1', '小活动2', '小活动3', '小活动4']"
          :key="c"
        >
          {{ c }}
        </div>
      </div>
      <div style="display: flex; background-color: rgba(0, 255, 127, 0.1)">
        <div style="padding: 2px; border: 1px white solid; right: 0; height: 2400px; width: 500px">
          <div
            v-ripple
            style="
              width: 100%;
              height: 100%;
              border: 4px white solid;
              border-radius: 2.5vh;
              overflow: hidden;
            "
          >
            <div style="position: absolute">
              <v-img
                style="position: sticky; right: -40px; z-index: 1; height: 90vh"
                @dragstart.prevent
                cover=""
                :src="'/static/worldflipper/unit/full/awakened/alk.png'"
              />
            </div>
            <v-parallax
              @dragstart.prevent
              style="width: 100%; height: 100%; image-rendering: pixelated"
              :src="'/static/worldflipper/st/background/abs.png'"
            />
          </div>
        </div>
      </div>
    </div>
    <v-expansion-panels v-model="show_mainpage">
      <v-expansion-panel  title=" ">
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
    <PartySearcherView></PartySearcherView>
  </div>
</template>

<style scoped>
.event-column {
  border: 1px red dashed;
  //width: 10%;
  width: 200px;
  height: 64px;
  flex-shrink: 0;
  font-family: Arial, '黑体', serif;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style>
