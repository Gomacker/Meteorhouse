<script setup lang='ts'>
import { Character, Element, SpecialityType } from '@/anise/worldflipper/object'
import { gender2zh, race2zh, type2zh } from '@/stores/manager'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import { format_content } from '@/components/table/table'
import GameTag from '@/components/party/GameTag.vue'
import chroma from 'chroma-js'
import { computed } from 'vue'
import ContentCover from '@/components/worldflipper/character/ContentCover.vue'

const props = defineProps<{ obj: Character; lite?: boolean }>()

const alpha = 0.8

const ele2color = {
  [Element.None]: chroma('rgb(105,105,105)').alpha(alpha),
  [Element.Fire]: chroma('rgb(234,53,75)').alpha(alpha),
  [Element.Water]: chroma('rgb(68,137,255)').alpha(alpha),
  [Element.Thunder]: chroma('rgb(244,204,36)').alpha(alpha),
  [Element.Wind]: chroma('rgb(119,217,47)').alpha(alpha),
  [Element.Light]: chroma('rgb(245,255,186)').alpha(alpha),
  [Element.Dark]: chroma('rgb(90,57,95)').alpha(alpha)
}
const background_color = chroma('rgb(248,248,248)').alpha(alpha)

const status = computed(() => props.obj?.get_status(props.obj?.nature_max_level))
const status_max = computed(() => props.obj?.get_status(100))

const translated_race = computed(() =>
  props.obj?.race
    .split(',')
    .map((value) => race2zh[value])
    .join(' / ')
)
const translated_gender = computed(() => gender2zh[props.obj?.gender])
const translated_type = computed(() => type2zh[props.obj?.type])
</script>

<template>
  <div
    v-ripple='lite'
    style='
      background: url(/static/worldflipper/ui/background_cut_official.png);
      background-size: 136px;
      background-position-x: -10px;
      background-position-y: -10px;
      image-rendering: pixelated;
    '
    :style="{
      width: lite ? '480px' : '960px'
    }"
  >
    <template v-if='obj'>
      <div
        :style="{
          background: `url(/static/${obj.__type_id}/full_resized/awakened/${obj.resource_id}.png) no-repeat`,
          backgroundSize: lite ? '420px' : '720px',
          backgroundPosition: lite ? 'calc(100% + 40px) 20%' : 'calc(100% + 100px) 80%'
        }"
        style='image-rendering: initial; height: 100%; border-radius: inherit'
      >
        <div
          style='
            image-rendering: initial;
            display: flex;
            align-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            color: rgb(50, 50, 50);
            height: 100%;
            border-radius: inherit;
          '
          :style="{
            padding: lite ? '6px' : '16px',
            background: `
          linear-gradient(
          135deg,
          ${ele2color[obj.element]} 130px,
          ${background_color} 130px,
          ${background_color} calc(100% - 32px),
          rgba(54, 255, 162, 0.85) calc(100% - 32px),
          rgba(200,240,200, 0.85)
          )`
          }"
        >
          <div style='display: flex; width: 100%; padding: 16px 16px 0'>
            <div style='position: absolute; z-index: 1'>
              <img
                style='
                  width: 200%;
                  height: 200%;
                  image-rendering: pixelated;
                  left: calc(120px - 120%);
                  top: calc(75px);
                '
                :src='`/static/${obj.__type_id}/pixelart/walk_front/${obj.resource_id}.gif`'
                alt=''
              />
            </div>
            <CharacterIcon :obj='obj' :size='120' eager />
            <div
              style='display: flex; flex-wrap: wrap; width: 100%; justify-content: space-between'
            >
              <div
                style='padding: 8px 16px; font-size: 20px; display: flex; flex-direction: column'
              >
                <input
                  class='passive-input'
                  style="
                    font-size: 20px;
                    font-family: '黑体', serif;
                    font-weight: 600;
                    width: 200px;
                  "
                  v-model='obj.names[1]'
                />
                <input
                  class='passive-input'
                  style="
                    font-size: 34px;
                    font-family: '黑体', serif;
                    font-weight: 600;
                    width: 200px;
                  "
                  v-model='obj.names[0]'
                />
                <input
                  class='passive-input'
                  style="font-size: 18px; font-family: '黑体', serif"
                  v-model='obj.names[2]'
                />
              </div>
              <div>
                <div
                  style='
                    display: grid;
                    grid-auto-flow: column;
                    grid-template-columns: repeat(auto-fit, 160px);
                    grid-gap: 12px;
                    font-size: 16px;
                    justify-content: space-evenly;
                  '
                  :style="{
                    gridTemplateRows: lite ? 'repeat(1, auto)' : 'repeat(2, auto)',
                    gridTemplateColumns: lite ? 'repeat(auto-fit, 160px)' : 'repeat(3, 160px)',
                    padding: lite ? '4px' : '16px 4px'
                  }"
                >
                  <div v-if='!lite' class='span-f'>
                    <div class='span-tag'>HP</div>
                    {{ status[0] }}
                    <span style='color: crimson'>({{ status_max[0] }})</span>
                  </div>
                  <div v-if='!lite' class='span-f'>
                    <div class='span-tag'>ATK</div>
                    {{ status[1] }}
                    <span style='color: crimson'>({{ status_max[1] }})</span>
                  </div>
                  <div class='span-f'>
                    <div class='span-tag'>类型</div>
                    <ContentCover>
                      <template v-slot:default>
                        <input
                          class='passive-input'
                          style='width: 100px; padding: 0 8px'
                          :value='obj.type'
                          @input='
                            (event) => {
                              try {
                                const type = parseInt(event.target.value)
                                if (!SpecialityType[type]) return
                                obj.type = type
                              } catch (e) {}
                            }
                          '
                        />
                      </template>
                      <template v-slot:cover>
                        <div style='min-width: 100px; height: 2.5ex'>{{ translated_type }}</div>
                      </template>
                    </ContentCover>
                  </div>
                  <div v-if='!lite' class='span-f'>
                    <div class='span-tag'>种族</div>
                    {{ translated_race }}
                  </div>
                  <div v-if='!lite' class='span-f'>
                    <div class='span-tag'>性别</div>
                    {{ translated_gender }}
                  </div>
                  <div class='span-f'>
                    <div class='span-tag'>CV</div>
                    {{ obj.cv }}
                  </div>
                </div>
                <div v-if='obj.tags && !lite'>
                  <GameTag
                    v-for='(tag_content, index) in obj.tags'
                    :key='index'
                    :content='tag_content'
                  />
                </div>
              </div>
            </div>
          </div>
          <hr style='width: 100%' :style="{ margin: lite ? '6px 6px 4px' : '12px 12px 8px' }" />
          <div v-if='obj.tags && lite' style='margin: 0 4px'>
            <GameTag v-for='(tag_content, index) in obj.tags' :key='index' :content='tag_content' />
          </div>
          <div v-if='!lite'>
            <div style='display: flex; margin: 16px 16px 0'>
              <div class='span-title'>队长</div>
              <div style='display: flex; flex-direction: column'>
                <div class='span-ability' style='padding-bottom: 4px'>
                  <input
                    class='passive-input'
                    style='margin: 0 8px; font-weight: 600; font-size: 22px'
                    v-model='obj.leader_ability.name'
                  />
                </div>
                <div class='span-ability' style='padding-bottom: 4px'>
                  <div
                    style='margin: 0 8px'
                    v-html='format_content(obj.leader_ability.description)'
                  />
                </div>
              </div>
            </div>
            <div style='display: flex; margin: 16px 16px 0'>
              <div class='span-title'>技能</div>
              <div style='display: flex; flex-direction: column'>
                <div class='span-ability' style='padding-bottom: 4px'>
                  <input
                    class='passive-input'
                    style='margin: 0 8px; font-weight: 600; font-size: 22px'
                    v-model='obj.skill.name'
                  />
                </div>
                <div class='span-ability' style='padding-bottom: 4px'>

                  <ContentCover>
                    <template v-slot:default>
                      <div style='margin: 0 8px'>
                        <textarea class='passive-input' v-model='obj.skill.description' />
                      </div>
                    </template>
                    <template v-slot:cover>
                      <div v-if='obj.skill.description' style='margin: 0 8px'
                           v-html="format_content(obj.skill.description || '')" />
                      <div v-else style='margin: 0 8px'>--</div>
                    </template>
                  </ContentCover>
                  <!--                  <div style="margin: 0 8px" v-html="format_content(obj.skill.description)" />-->
                </div>
                <div class='span-ability' style='padding-bottom: 4px'>
                  <div style='margin: 0 8px'>技能能量：{{ obj.skill.weight }}</div>
                </div>
              </div>
            </div>
            <div style='display: flex; margin: 16px 16px 0'>
              <div class='span-title'>能力</div>
              <div style='display: flex; flex-direction: column'>
                <div class='span-ability'>
                  <div style='color: rgb(47, 195, 183); font-size: 20px'>❶</div>
                  <ContentCover>
                    <template v-slot:default>
                      <div style='margin: 0 8px'>
                        <textarea class='passive-input' v-model='obj.abilities[0]' />
                      </div>
                    </template>
                    <template v-slot:cover>
                      <div style='margin: 0 8px' v-html="format_content(obj.abilities[0] || '')" />
                    </template>
                  </ContentCover>
                </div>
                <div class='span-ability'>
                  <div style='color: rgb(47, 195, 183); font-size: 20px'>❷</div>
                  <ContentCover>
                    <template v-slot:default>
                      <div style='margin: 0 8px'>
                        <textarea class='passive-input' v-model='obj.abilities[1]' />
                      </div>
                    </template>
                    <template v-slot:cover>
                      <div style='margin: 0 8px' v-html="format_content(obj.abilities[1] || '')" />
                    </template>
                  </ContentCover>
                </div>
                <div class='span-ability'>
                  <div style='color: rgb(47, 195, 183); font-size: 20px'>❸</div>
                  <ContentCover>
                    <template v-slot:default>
                      <div style='margin: 0 8px'>
                        <textarea class='passive-input' v-model='obj.abilities[2]' />
                      </div>
                    </template>
                    <template v-slot:cover>
                      <div v-if='obj.abilities[2]' style='margin: 0 8px'
                           v-html="format_content(obj.abilities[2] || '')" />
                      <div v-else style='margin: 0 8px'>--</div>
                    </template>
                  </ContentCover>
                </div>
                <div class='span-ability'>
                  <div style='color: rgb(47, 195, 183); font-size: 20px'>❹</div>
                  <ContentCover>
                    <template v-slot:default>
                      <div style='margin: 0 8px; opacity: 0.55'>
                        <textarea class='passive-input' v-model='obj.abilities[3]' />
                      </div>
                    </template>
                    <template v-slot:cover>
                      <div v-if='obj.abilities[3]' style='margin: 0 8px; opacity: 0.55'
                           v-html="format_content(obj.abilities[3] || '')" />
                      <div v-else style='margin: 0 8px; opacity: 0.55'>--</div>
                    </template>
                  </ContentCover>
                </div>
                <div class='span-ability'>
                  <div style='color: rgb(47, 195, 183); font-size: 20px'>❺</div>
                  <ContentCover>
                    <template v-slot:default>
                      <div style='margin: 0 8px; opacity: 0.55'>
                        <textarea class='passive-input' v-model='obj.abilities[4]' />
                      </div>
                    </template>
                    <template v-slot:cover>
                      <div v-if='obj.abilities[4]' style='margin: 0 8px; opacity: 0.55'
                           v-html="format_content(obj.abilities[4] || '')" />
                      <div v-else style='margin: 0 8px; opacity: 0.55'>--</div>
                    </template>
                  </ContentCover>
                </div>
                <div class='span-ability'>
                  <div style='color: rgb(47, 195, 183); font-size: 20px'>❻</div>
                  <ContentCover>
                    <template v-slot:default>
                      <div style='margin: 0 8px; opacity: 0.55'>
                        <textarea class='passive-input' v-model='obj.abilities[5]' />
                      </div>
                    </template>
                    <template v-slot:cover>
                      <div v-if='obj.abilities[5]' style='margin: 0 8px; opacity: 0.55'
                           v-html="format_content(obj.abilities[5] || '')" />
                      <div v-else style='margin: 0 8px; opacity: 0.55'>--</div>
                    </template>
                  </ContentCover>
                </div>
              </div>
            </div>
          </div>
          <hr v-if='!lite' style='width: 100%; margin: 12px 12px 8px' />
          <div v-if='!lite' style='display: flex; flex-direction: column; width: 100%'>
            <div style='padding: 16px; width: 100%'>
              <textarea
                class='passive-input'
                style='font-size: 16px; width: 100%'
                v-model='obj.description'
              />
            </div>
            <div style='padding: 16px; font-size: 16px'>获取方式：{{ obj.obtain }}</div>
          </div>
        </div>
      </div>
    </template>
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

.passive-input {
  border-radius: 6px;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  box-shadow: none;
  width: 100%;
//border: 1px solid transparent;
}

.passive-input:hover {
  box-shadow: 0 0 6px black;
//border: 1px solid rgba(128, 128, 128, 0.8); background: white;
}

.passive-input:focus {
  background: white;
}

.span-f {
  display: flex;
}
</style>
