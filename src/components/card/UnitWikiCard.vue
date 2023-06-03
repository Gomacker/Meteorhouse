<script lang="ts" setup>
import { Unit } from '@/stores/manager'
import { ref } from 'vue'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import { format_content } from '@/stores/table'
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
  unit: {
    type: Unit,
    require: true
  }
})
</script>
<template>
  <div
    v-if="props.unit instanceof Unit"
    style="
      width: 960px;
      background: url('/static/worldflipper/ui/background_cut_official.png');
      background-size: 136px;
      background-position-x: -10px;
      background-position-y: -10px;
      image-rendering: pixelated;
      border-radius: 12px;
      overflow: hidden;
    "
  >
    <div
      :style="{
        background: `url(/static/worldflipper/unit/full_resized/awakened/${props.unit.extraction_id}.png) no-repeat`
      }"
      style="
        /*border-radius: inherit;*/
        background-position: calc(100% + 100px) 80% /*calc(20% + 100px)*/;
        background-size: 720px;
        image-rendering: initial;
        height: 100%;
      "
    >
      <div
        style="
          image-rendering: initial;
          display: flex;
          align-content: flex-start;
          align-items: flex-start;
          /*flex-direction: column;*/
          flex-wrap: wrap;
          padding: 16px;
          /*border-radius: inherit;*/
          color: rgb(50, 50, 50);
          height: 100%;
          /*min-height: 100%;*/
        "
        :style="{
          background: `linear-gradient(135deg, ${
            ele2color[props.unit.element_id]
          } 130px, rgba(248,248,248, 0.825) 130px, rgba(248,248,248, 0.825) calc(100% - 32px), rgb(54, 255, 162, 0.85) calc(100% - 32px), rgba(200,240,200, 0.85))`
        }"
      >
        <div style="display: flex; width: 100%; margin: 16px 16px 0">
          <div style="position: absolute; z-index: 1">
            <el-image
              style="
                width: 200%;
                height: 200%;
                image-rendering: pixelated;
                left: calc(120px - 120%);
                top: calc(75px);
              "
              :src="`/static/worldflipper/unit/pixelart/walk_front/${props.unit.extraction_id}.gif`"
              alt=""
            />
          </div>
          <UnitPicOrigin :unit="props.unit" :size="120" :awakened="show_awakened" />
          <div style="display: flex; flex-wrap: wrap; width: 100%; justify-content: space-between">
            <div style="padding: 8px 16px; font-size: 20px">
              <p style="font-size: 20px; font-family: '华文细黑', serif; font-weight: 600">
                {{ props.unit.name_sub }}
              </p>
              <p style="font-size: 34px; font-family: '华文细黑', serif; font-weight: 600">
                {{ props.unit.name_zh }}
              </p>
              <p style="font-size: 18px; font-family: '华文细黑', serif; margin-top: 2px">
                {{ props.unit.name_jp }}
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
                <div style="width: 165px">
                  <div class="span-f">
                    <div class="span-tag">HP</div>
                    {{ props.unit.status['mhp'] }}
                    <span style="color: crimson">({{ props.unit.status['mmhp'] }})</span>
                  </div>
                  <div class="span-f">
                    <div class="span-tag">ATK</div>
                    {{ props.unit.status['atk'] }}
                    <span style="color: crimson">({{ props.unit.status['matk'] }})</span>
                  </div>
                </div>
                <div style="width: 165px">
                  <div class="span-f">
                    <div class="span-tag">类型</div>
                    {{ props.unit.pf_type }}
                  </div>
                  <div class="span-f">
                    <div class="span-tag">种族</div>
                    {{ props.unit.race }}
                  </div>
                </div>
                <div style="width: 165px">
                  <div class="span-f">
                    <div class="span-tag">性别</div>
                    {{ props.unit.gender }}
                  </div>
                  <div class="span-f">
                    <div class="span-tag">CV</div>
                    {{ props.unit.cv }}
                  </div>
                </div>
              </div>
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
        </div>
        <hr style="width: 100%; margin: 12px 12px 8px" />
        <div>
          <div style="display: flex; margin: 16px 16px 0">
            <div class="span-title">队长</div>
            <div style="display: flex; flex-direction: column">
              <div class="span-ability" style="padding-bottom: 4px">
                <div style="margin: 0 8px; font-weight: 600; font-size: 22px">
                  {{ props.unit.leader_ability_name }}
                </div>
              </div>
              <div class="span-ability" style="padding-bottom: 4px">
                <div style="margin: 0 8px" v-html="format_content(props.unit.leader_ability)" />
              </div>
            </div>
          </div>
          <div style="display: flex; margin: 16px 16px 0">
            <div class="span-title">技能</div>
            <div style="display: flex; flex-direction: column">
              <div class="span-ability" style="padding-bottom: 4px">
                <div style="margin: 0 8px; font-weight: 600; font-size: 22px">
                  {{ props.unit.skill_name }}
                </div>
              </div>
              <div class="span-ability" style="padding-bottom: 4px">
                <div style="margin: 0 8px" v-html="format_content(props.unit.skill_description)" />
              </div>
              <div class="span-ability" style="padding-bottom: 4px">
                <div style="margin: 0 8px">技能能量：{{ props.unit.skill_weight }}</div>
              </div>
            </div>
          </div>
          <div style="display: flex; margin: 16px 16px 0">
            <div class="span-title">能力</div>
            <div style="display: flex; flex-direction: column">
              <div class="span-ability">
                <div style="color: rgb(47, 195, 183); font-size: 20px">❶</div>
                <div style="margin: 0 8px" v-html="format_content(props.unit.ability1)" />
              </div>
              <div class="span-ability">
                <div style="color: rgb(47, 195, 183); font-size: 20px">❷</div>
                <div style="margin: 0 8px" v-html="format_content(props.unit.ability2)" />
              </div>
              <div class="span-ability">
                <div style="color: rgb(47, 195, 183); font-size: 20px">❸</div>
                <div
                  v-if="props.unit.ability3"
                  style="margin: 0 8px"
                  v-html="format_content(props.unit.ability3)"
                />
                <div v-else style="margin: 0 8px">--</div>
              </div>
              <div v-if="props.unit.ability4" class="span-ability">
                <div style="color: rgb(47, 195, 183); font-size: 20px">❹</div>
                <div
                  style="margin: 0 8px; opacity: 0.55"
                  v-html="format_content(props.unit.ability4)"
                />
              </div>
              <div v-if="props.unit.ability5" class="span-ability">
                <div style="color: rgb(47, 195, 183); font-size: 20px">❺</div>
                <div
                  style="margin: 0 8px; opacity: 0.55"
                  v-html="format_content(props.unit.ability5)"
                />
              </div>
              <div v-if="props.unit.ability6" class="span-ability">
                <div style="color: rgb(47, 195, 183); font-size: 20px">❻</div>
                <div
                  style="margin: 0 8px; opacity: 0.55"
                  v-html="format_content(props.unit.ability6)"
                />
              </div>
            </div>
          </div>
        </div>
        <hr style="width: 100%; margin: 12px 12px 8px" />
        <div style="display: flex; flex-direction: column">
          <div style="padding: 16px; font-size: 16px">
            {{ props.unit.description }}
          </div>
          <div style="padding: 16px; font-size: 16px">获取方式：{{ props.unit.obtain }}</div>
        </div>
        <!--    <el-divider/>-->
      </div>
    </div>
  </div>
</template>

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
  background: url('@/assets/worldflipper/ui/black.png') no-repeat center;
  background-size: 70px;
  /*font-size: 14px;*/
  /*font-weight: 600;*/
  /*color: white;*/
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: lighter;
  /*font-family: 'pingfangR', serif;*/
  /*background: linear-gradient(247.5deg, transparent 8px, rgba(220,220,220) 8px, rgba(220,220,220));*/
}
.span-ability {
  display: flex;
  font-size: 20px;
  margin-left: 16px;
  padding-bottom: 16px;
}
</style>
