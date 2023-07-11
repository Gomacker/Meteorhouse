<script setup lang="ts">
import { Character } from '@/anise/worldflipper/object'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import {format_content} from "@/stores/table";

defineProps({
  character: {
    type: Character,
    required: true
  }
})

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
</script>

<template>
  <v-card
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
      :style="{
        background: `url(/static/${character.__type_id}/full_resized/awakened/${character.resource_id}.png) no-repeat`
      }"
      style="
        background-position: calc(100% + 100px) 80%;
        background-size: 720px;
        image-rendering: initial;
        height: 100%;
        border-radius: inherit;
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
          ${ele2color[character.element]} 130px,
          rgba(248,248,248, 0.825) 130px,
          rgba(248,248,248, 0.825) calc(100% - 32px),
          rgb(54, 255, 162, 0.85) calc(100% - 32px),
          rgba(200,240,200, 0.85)
          )`
        }"
      >
        <div style="display: flex; width: 100%; padding: 16px 16px 0">
          <div style="position: absolute; z-index: 1">
            <img
                style="
                width: 200%;
                height: 200%;
                image-rendering: pixelated;
                left: calc(120px - 120%);
                top: calc(75px);
              "
                :src="`/static/${character.__type_id}/pixelart/walk_front/${character.resource_id}.gif`"
                alt=""
            />
          </div>
          <CharacterIcon :character="character" :size="120" />
          <div style="display: flex; flex-wrap: wrap; width: 100%; justify-content: space-between">
            <div style="padding: 8px 16px; font-size: 20px">
              <p style="font-size: 20px; font-family: '华文细黑', serif; font-weight: 600">
                {{ character.names[0] }}
              </p>
              <p style="font-size: 34px; font-family: '华文细黑', serif; font-weight: 600">
                {{ character.names[1] }}
              </p>
              <p style="font-size: 18px; font-family: '华文细黑', serif; margin-top: 2px">
                {{ character.names[2] }}
              </p>
            </div>
          </div>
        </div>
        <hr style="width: 100%; margin: 12px 12px 8px"/>
        <div>
          <div style="display: flex; margin: 16px 16px 0">
            <div class="span-title">队长</div>
            <div style="display: flex; flex-direction: column">
              <div class="span-ability" style="padding-bottom: 4px">
                <div style="margin: 0 8px; font-weight: 600; font-size: 22px">
                  {{ character.leader_ability.name }}
                </div>
              </div>
              <div class="span-ability" style="padding-bottom: 4px">
                <div style="margin: 0 8px" v-html="format_content(character.leader_ability.description)" />
              </div>
            </div>
          </div>
          {{ character }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
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
</style>
