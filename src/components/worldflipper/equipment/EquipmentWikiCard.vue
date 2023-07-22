<script setup lang="ts">
import { Equipment, Element } from "@/anise/worldflipper/object";
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import { format_content } from '@/stores/table'
import GameTag from '@/components/party/GameTag.vue'
import chroma from 'chroma-js'
import { computed } from 'vue'
import EquipmentIcon from "@/components/worldflipper/equipment/EquipmentIcon.vue";

const props = defineProps({
  obj: {
    type: Equipment,
    required: true
  }
})

const alpha = 0.8

const ele2color = {
  [Element.All]: chroma('rgb(105,105,105)').alpha(alpha),
  [Element.Fire]: chroma('rgb(234,53,75)').alpha(alpha),
  [Element.Water]: chroma('rgb(68,137,255)').alpha(alpha),
  [Element.Thunder]: chroma('rgb(244,204,36)').alpha(alpha),
  [Element.Wind]: chroma('rgb(119,217,47)').alpha(alpha),
  [Element.Light]: chroma('rgb(245,255,186)').alpha(alpha),
  [Element.Dark]: chroma('rgb(90,57,95)').alpha(alpha)
}
const background_color = chroma('rgb(248,248,248)').alpha(alpha)

const status = computed(() => JSON.parse(props.obj?.status_data))
</script>

<template>
  <div
    style="
      width: 960px;
      background: url(/static/worldflipper/ui/background_cut_official.png);
      background-size: 136px;
      background-position-x: -10px;
      background-position-y: -10px;
      image-rendering: pixelated;
    "
  >
    <div
      style="
          image-rendering: initial;
          display: flex;
          align-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;
          padding: 16px;
          color: rgb(50, 50, 50);
          height: 100%;
          border-radius: inherit;
        "
      :style="{
          background: `
          linear-gradient(
          135deg,
          ${ele2color[obj.element]} 130px,
          ${background_color} 130px,
          ${background_color} calc(100% - 32px),
          rgba(54, 255, 162, 0.85) calc(100% - 32px),
          rgba(79,201,191, 0.85)
          )`
        }"
    >
      <div style="display: flex; width: 100%; padding: 16px 16px 0">
        <EquipmentIcon :obj="obj" :size="120" />
        <div style="display: flex; flex-wrap: wrap; width: 100%; justify-content: space-between">
          <div style="padding: 8px 16px; font-size: 20px">
            <p style="font-size: 20px; font-family: '华文细黑', serif; font-weight: 600">
              {{ obj.names[1] }}
            </p>
            <p style="font-size: 34px; font-family: '华文细黑', serif; font-weight: 600">
              {{ obj.names[0] }}
            </p>
          </div>
          <div>
            <div
              style="
                  display: grid;
                  grid-auto-flow: column;
                  grid-template-rows: repeat(2, auto);
                  grid-template-columns: repeat(3, 160px);
                  grid-gap: 12px;
                  padding: 16px 4px;
                  font-size: 16px;
                  justify-content: space-evenly;
                "
            >
              <div class="span-f">
                <div class="span-tag">HP</div>
                {{ status[0] }}
              </div>
              <div class="span-f">
                <div class="span-tag">ATK</div>
                {{ status[1] }}
              </div>
            </div>
            <template v-if="obj.tags">
              <GameTag
                v-for="(tag_content, index) in obj.tags"
                :key="index"
                :content="tag_content"
              />
            </template>
          </div>
        </div>
      </div>
      <hr style="width: 100%; margin: 12px 12px 8px" />
      <div>
        <div style="display: flex; margin: 16px 16px 0">
          <div class="span-title">能力</div>
          <div style="display: flex; flex-direction: column">
            <div class="span-ability">
              <div style="margin: 0 8px" v-html="format_content(obj.abilities[0])" />
            </div>
          </div>
        </div>
        <div style="display: flex; margin: 16px 16px 0">
          <div class="span-title">魂珠</div>
          <div style="display: flex; flex-direction: column">
            <div class="span-ability">
              <div style="margin: 0 8px; opacity: 0.55" v-html="format_content(obj.abilities[1])" />
            </div>
          </div>
        </div>
        <div v-if="obj.abilities[2] || obj.abilities[3]" style="display: flex; margin: 16px 16px 0">
          <div class="span-title">觉醒</div>
          <div style="display: flex; flex-direction: column">
            <div v-if="obj.abilities[2]" class="span-ability">
              <div class="ability-awaken-text">Lv3</div>
              <div style="margin: 0 8px" v-html="format_content(obj.abilities[2])" />
            </div>
            <div v-if="obj.abilities[3]" class="span-ability">
              <div class="ability-awaken-text">Lv5</div>
              <div style="margin: 0 8px" v-html="format_content(obj.abilities[3])" />
            </div>
          </div>
        </div>
        <div v-if="obj.abilities[4] || obj.abilities[5] || obj.abilities[6]" style="display: flex; margin: 16px 16px 0">
          <div class="span-title">强化</div>
          <div style="display: flex; flex-direction: column">
            <div v-if="obj.abilities[4]" class="span-ability">
              <div class="ability-ar-text">Lv1</div>
              <div style="margin: 0 8px" v-html="format_content(obj.abilities[4])" />
            </div>
            <div v-if="obj.abilities[5]" class="span-ability">
              <div class="ability-ar-text">Lv70</div>
              <div style="margin: 0 8px" v-html="format_content(obj.abilities[5])" />
            </div>
            <div v-if="obj.abilities[6]" class="span-ability">
              <div class="ability-ar-text">Lv100</div>
              <div style="margin: 0 8px" v-html="format_content(obj.abilities[6])" />
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 100%; margin: 12px 12px 8px" />
      <div style="display: flex; flex-direction: column">
        <div style="padding: 16px; font-size: 16px">
          {{ obj.description }}
        </div>
        <div style="padding: 16px; font-size: 16px">获取方式：{{ obj.obtain }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.span-tag {
  float: left;
  padding: 0 4px;
  margin-right: 4px;
  width: 45px;
  background: linear-gradient(
    247.5deg,
    transparent 8px,
    rgba(220, 220, 220) 8px,
    rgba(220, 220, 220)
  );
}
.span-title {
  float: right;
  width: 75px;
  min-width: 75px;
  height: fit-content;
  padding: 4px 8px;
  background: url(/static/worldflipper/ui/black.png) no-repeat center;
  background-size: 70px;
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: lighter;
}
.span-ability {
  display: flex;
  font-size: 20px;
  margin-left: 16px;
  padding-bottom: 16px;
}

.ability-awaken-text {
  color: rgb(47, 195, 183);
  font-size: 20px;
}

.ability-ar-text {
  color: rgb(195, 74, 47);
  font-size: 20px;
}
</style>
