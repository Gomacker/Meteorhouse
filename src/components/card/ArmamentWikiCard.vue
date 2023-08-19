<script lang="ts" setup>
import { Armament } from '@/stores/manager'
import ArmamentPicOrigin from '@/components/objects/armament/ArmamentPicOrigin.vue'
import { format_content } from '@/components/table/table'
import GameTag from '@/components/party/GameTag.vue'

const alpha = 0.85
const ele2color = {
  [-1]: 'rgb(105,105,105,' + alpha + ')',
  0: 'rgba(234,53,75,' + alpha + ')',
  1: 'rgba(68,137,255,' + alpha + ')',
  2: 'rgba(244,204,36,' + alpha + ')',
  3: 'rgba(119,217,47,' + alpha + ')',
  4: 'rgba(245,255,186,' + alpha + ')',
  5: 'rgba(90,57,95,' + alpha + ')'
}

const props = defineProps({
  armament: {
    type: Armament,
    require: true
  }
})
</script>
<template>
  <div
    v-if="props.armament instanceof Armament"
    style="
      width: 720px;
      background: url('/static/worldflipper/ui/background_cut_official.png');
      background-size: 136px;
      background-position-x: -10px;
      background-position-y: -10px;
      image-rendering: pixelated;
      /*border-radius: 16px;*/
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
        border-radius: inherit;
        color: rgb(50, 50, 50);
        height: 100%;
      "
      :style="{
        background: `linear-gradient(135deg, ${
          ele2color[props.armament.element]
        } 130px, rgba(248,248,248, 0.825) 130px, rgba(248,248,248, 0.825) calc(100% - 32px), rgba(40,0,115, 0.85) calc(100% - 32px), rgba(0,0,0, 0.85))`
        // 'box-shadow': '0 0 16px rgba(0,0,0,0.65)'
      }"
    >
      <div style="display: flex; width: 100%; margin: 16px 16px 0">
        <ArmamentPicOrigin :armament="armament" :size="120" :soul="false" />
        <div style="display: flex; width: 100%; justify-content: space-between">
          <div style="padding: 8px 16px; font-size: 20px">
            <p style="font-size: 34px; font-family: '华文细黑', serif; font-weight: 600">
              {{ props.armament.name_zh }}
            </p>
            <p style="font-size: 18px; font-family: '华文细黑', serif; margin-top: 2px">
              {{ props.armament.name_jp }}
            </p>
          </div>

          <div
            style="
              display: flex;
              font-size: 16px;
              width: 50%;
              justify-content: space-evenly;
              flex-direction: column;
            "
          >
            <div>
              <div class="span-f">
                <div class="span-tag">HP</div>
                {{ JSON.parse(props.armament.status_data)[0] }}
              </div>
              <div class="span-f">
                <div class="span-tag">ATK</div>
                {{ JSON.parse(props.armament.status_data)[1] }}
              </div>
            </div>
            <div>
              <template v-if="props.armament.tags">
                <GameTag
                  v-for="(tag_content, index) in JSON.parse(props.armament.tags)"
                  :key="index"
                  :content="tag_content"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 100%; margin: 12px 12px 8px" />
      <div>
        <div style="display: flex; margin: 16px 16px 0">
          <div class="span-title">能力</div>
          <div style="display: flex; flex-direction: column">
            <div class="span-ability" style="padding-bottom: 4px">
              <div style="margin-left: 8px" v-html="format_content(props.armament.ability)" />
            </div>
          </div>
        </div>
        <div style="display: flex; margin: 16px 16px 0">
          <div class="span-title">魂珠</div>
          <div style="display: flex; flex-direction: column">
            <div class="span-ability">
              <div
                style="margin-left: 8px; opacity: 0.55"
                v-html="format_content(props.armament.ability_soul)"
              />
            </div>
          </div>
        </div>
        <div
          style="display: flex; margin: 16px 16px 0"
          v-if="props.armament.ability_awaken3 || props.armament.ability_awaken5"
        >
          <div class="span-title">觉醒</div>
          <div style="display: flex; flex-direction: column">
            <div class="span-ability" v-if="props.armament?.ability_awaken3">
              <div style="color: rgb(47, 195, 183); margin-left: 8px; font-size: 20px">Lv3</div>
              <div
                style="margin-left: 16px"
                v-html="format_content(props.armament.ability_awaken3)"
              />
            </div>
            <div class="span-ability" v-if="props.armament?.ability_awaken5">
              <div style="color: rgb(47, 195, 183); margin-left: 8px; font-size: 20px">Lv5</div>
              <div
                style="margin-left: 16px"
                v-html="format_content(props.armament.ability_awaken5)"
              />
            </div>
          </div>
        </div>
        <div
          style="display: flex; margin: 16px 16px 0"
          v-if="
            props.armament?.ability_augment1 ||
            props.armament?.ability_augment70 ||
            props.armament?.ability_augment100
          "
        >
          <div class="span-title">强化</div>
          <div style="display: flex; flex-direction: column">
            <div class="span-ability" v-if="props.armament?.ability_augment1">
              <div style="color: rgb(195, 52, 47); margin-left: 8px; font-size: 20px">Lv1</div>
              <div
                style="margin-left: 16px"
                v-html="format_content(props.armament.ability_augment1)"
              />
            </div>
            <div class="span-ability" v-if="props.armament?.ability_augment70">
              <div style="color: rgb(195, 52, 47); margin-left: 8px; font-size: 20px">Lv70</div>
              <div
                style="margin-left: 16px"
                v-html="format_content(props.armament.ability_augment70)"
              />
            </div>
            <div class="span-ability" v-if="props.armament?.ability_augment100">
              <div style="color: rgb(195, 52, 47); margin-left: 8px; font-size: 20px">Lv100</div>
              <div
                style="margin-left: 16px"
                v-html="format_content(props.armament.ability_augment100)"
              />
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 100%; margin: 12px 12px 8px" />
      <div>
        <div style="padding: 8px 16px; font-size: 16px">
          {{ props.armament.description }}
        </div>
        <div style="padding: 8px 16px; font-size: 16px">获取方式：{{ props.armament.obtain }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArmamentWikiCard'
}
</script>

<style scoped>
.span-f {
  margin: 16px 16px 16px 0;
}

.span-tag {
  float: left;
  padding: 0 4px;
  margin-right: 4px;
  width: 45px;
  /*background-color: darkgray;*/
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
  /*background: linear-gradient(90deg, black 2px, orange 2px, orange 6px, black 8px, black);*/
  height: fit-content;
  padding: 4px 8px;
  background: url(/static/worldflipper/ui/black.png) no-repeat center;
  background-size: 70px;
  /*font-size: 14px;*/
  /*font-weight: 600;*/
  /*color: white;*/
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
</style>
