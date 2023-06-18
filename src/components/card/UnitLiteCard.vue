<script lang="ts" setup>
import { ele2color, Unit } from '@/stores/manager'
import { ref } from 'vue'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import GameTag from '@/components/party/GameTag.vue'
import chroma from 'chroma-js'

const alpha = 0.85

const show_awakened = ref(false)

function get_tags(unit: Unit) {
  let tags: string[]
  try {
    tags = JSON.parse(unit.tags)
  }catch (e) {
    tags = []
  }
  return tags
}

const props = defineProps({
  unit: Unit
})
</script>
<template>
  <div
    class="unit-lite-card"
    v-if="props.unit"
  >
    <div
      style="
        image-rendering: initial;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        height: 100%;
        padding: 16px;
        border-radius: inherit;
        color: rgb(50, 50, 50);
      "
      :style="{
        background: `linear-gradient(135deg, ${chroma(ele2color[props.unit.element]).alpha(
          alpha
        )} 101px, rgba(248,248,248, 0.77) 101px, rgba(248,248,248, 0.85) calc(100% - 32px), rgba(0,40,115, 0.85) calc(100% - 32px), rgba(0,0,0, 0.85))`
      }"
    >
      <div style="display: flex; width: 100%; margin: 16px 16px 0">
        <UnitPicOrigin :unit="props.unit" :size="80" :awakened="show_awakened" />
        <div style="display: flex; width: 100%; justify-content: space-between; flex-wrap: wrap">
          <div style="padding: 0 16px; font-size: 20px; max-width: 186px">
            <p style="font-size: 18px; font-family: '华文细黑', serif; font-weight: 600">
              {{ props.unit.name_sub }}
            </p>
            <p style="font-size: 30px; font-family: '华文细黑', serif; font-weight: 600">
              {{ props.unit.name_zh }}
            </p>
          </div>
          <div>
            <div
              style="
                display: flex;
                font-size: 16px;
                justify-content: space-evenly;
                flex-direction: row;
              "
            >
              <div style="/*margin: -8px 8px; width: 165px*/">
                <div class="span-f">
                  <div class="span-tag">类型</div>
                  {{ props.unit.pf_type }}
                </div>
                <div class="span-f">
                  <div class="span-tag">CV</div>
                  {{ props.unit.cv }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 100%; margin: 12px 12px 8px" />
      <div>
        <template v-if="props.unit.tags">
          <GameTag
            v-for="(tag_content, index) in get_tags(props.unit)"
            :key="index"
            :content="tag_content"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-lite-card {
  display: block;
  width: 480px;
  background: url('/static/worldflipper/ui/background_cut_official.png');
  background-size: 136px;
  background-position-x: -10px;
  background-position-y: -10px;
  image-rendering: pixelated;
  //border-radius: 16px;
  --content-size: 12px;
}
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
  height: fit-content;
  padding: 4px 8px;
  background: url('@/assets/worldflipper/ui/black.png') no-repeat center;
  background-size: 70px;
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: lighter;
}
.span-ability {
  display: flex;
  font-size: var(--content-size);
  margin-left: 16px;
  padding-bottom: 16px;
}
</style>
