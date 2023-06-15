<script lang="ts" setup>
import { ref } from 'vue'
import {
  Unit,
  Armament,
  PartyRelease,
  PartyParamManaboard2,
  Union,
  PartyParam,
  manager, ele_id2ele
} from '@/stores/manager'
import UnitLiteCard from '@/components/card/UnitLiteCard.vue'

const props = defineProps<{
  party: PartyRelease
  always_show_replacements?: boolean
  show_name?: boolean
  show_awaken?: boolean
  popover?: boolean
  replacements?: object
}>()
// const allow_mb2_lv = [0, 1, 2, 3, 4, 5]
// const replacement_size = '36px'
const replacement_size = 26
const show_replacements = ref(false)

function get_pic_url(obj: Unit | Armament | undefined, awakened_or_soul = false) {
  return obj ? obj.pic_url(awakened_or_soul) : '/static/worldflipper/unit/blank.png'
}
</script>
<template>
  <div
    class="party"
    style="display: flex"
    @mouseenter="show_replacements = true"
    @mouseleave="show_replacements = false"
  >
    <template v-if="props.party">
      <div class="union" :key="union" v-for="union in [1, 2, 3]">
        <div style="z-index: 6; filter: drop-shadow(0 0 2px black)" v-if="props.always_show_replacements || show_replacements">
          <div
            v-if="
              props.replacements &&
              props.replacements[`union${union}`] instanceof Array &&
              props.replacements[`union${union}`][0]
            "
            style="position: absolute; display: flex; flex-direction: column"
            :style="{ left: `-${replacement_size - 5}px`, top: `${5}px` }"
          >
            <img
              v-for="(replacement, index) in props.replacements[`union${union}`][0].map((value) =>
                manager.unit_data.get(value)
              )"
              :key="index"
              :style="{
                width: `${replacement_size}px`,
                height: `${replacement_size}px`
              }"
              :src="get_pic_url(replacement)"
              alt=""
            />
          </div>
          <div
            v-if="
              props.replacements &&
              props.replacements[`union${union}`] instanceof Array &&
              props.replacements[`union${union}`][1]
            "
            style="position: absolute; display: flex; flex-direction: column"
            :style="{ left: `${145}px`, top: `${105}px` }"
          >
            <img
              v-for="(replacement, index) in props.replacements[`union${union}`][1].map((value) =>
                manager.unit_data.get(value)
              )"
              :key="index"
              :style="{
                width: `${replacement_size}px`,
                height: `${replacement_size}px`
              }"
              :src="get_pic_url(replacement)"
              alt=""
            />
          </div>
          <div
            v-if="
              props.replacements &&
              props.replacements[`union${union}`] instanceof Array &&
              props.replacements[`union${union}`][2]
            "
            style="position: absolute; display: flex; flex-direction: row"
            :style="{ left: `${86 + 5}px`, top: `-${replacement_size - 20}px` }"
          >
            <img
              v-for="(replacement, index) in props.replacements[`union${union}`][2].map((value) =>
                manager.armament_data.get(value)
              )"
              :key="index"
              :style="{
                width: `${replacement_size}px`,
                height: `${replacement_size}px`
              }"
              :src="get_pic_url(replacement)"
              alt=""
            />
          </div>
          <div
            v-if="
              props.replacements &&
              props.replacements[`union${union}`] instanceof Array &&
              props.replacements[`union${union}`][3]
            "
            style="position: absolute; display: flex; flex-direction: row"
            :style="{ left: `${5}px`, top: `${170}px` }"
          >
            <img
              v-for="(replacement, index) in props.replacements[`union${union}`][3].map((value) =>
                manager.armament_data.get(value)
              )"
              :key="index"
              :style="{
                width: `${replacement_size}px`,
                height: `${replacement_size}px`
              }"
              :src="get_pic_url(replacement, true)"
              alt=""
            />
          </div>
        </div>
        <el-popover
          v-if="popover"
          :auto-close="0"
          :show-after="100"
          :hide-after="0"
          :show-arrow="false"
          width="fit-content"
          popper-style="
            background: transparent;
            border: none;
            box-shadow: none;
            margin-bottom: -20px;
            "
          placement="top"
        >
          <template #reference>
            <div
              class="wfo-slot main"
              :class="[
                props.party.party.union(union).main instanceof Unit
                  ? `ele-${ele_id2ele[props.party.party.union(union).main?.element]}`
                  : ''
              ]"
            >
              <img
                :src="get_pic_url(props.party.party.union(union).main, props.show_awaken)"
                alt=""
                loading="lazy"
                @dragstart.prevent
              />
              <div
                style="
                  position: absolute;
                  display: flex;
                  background-color: rgba(0, 0, 0, 0.55);
                  color: white;
                  left: 0;
                  bottom: 16px;
                  border-top-right-radius: 6px;
                "
                v-if="(() => {
                  const ppm: PartyParam = props.party?._params.get('manaboard2')
                  return ppm instanceof PartyParamManaboard2 ? !ppm[`union${union}main`].is_empty() : false
                })()"
              >
                <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
                  {{
                    (() => {
                      // if (true) {
                      const m =
                        props.party._params.get('manaboard2')[`union${union}main`][
                          `manaboard${i + 3}`
                        ]
                      return typeof m === 'number' ? m : '-'
                    })()
                  }}
                </div>
              </div>
              <div style="text-align: center">
                {{
                  props.show_name
                    ? props.party.party.union(union).main instanceof Unit
                      ? props.party.party.union(union).main['name_zh']
                      : union === 1
                      ? '队长'
                      : '主要角色'
                    : union === 1
                    ? '队长'
                    : '主要角色'
                }}
              </div>
            </div>
          </template>
          <UnitLiteCard
            style="zoom: 75%; box-shadow: 0 0 12px rgba(48, 48, 48, 0.65); cursor: pointer"
            :unit="props.party.party.union(union).main"
          />
        </el-popover>
        <div
          v-else
          class="wfo-slot main"
          :class="[
            props.party.party.union(union).main instanceof Unit
              ? `ele-${ele_id2ele[props.party.party.union(union).main?.element]}`
              : ''
          ]"
        >
          <img
            :src="get_pic_url(props.party.party.union(union).main, props.show_awaken)"
            alt=""
            loading="lazy"
            @dragstart.prevent
          />
          <div
            style="
              position: absolute;
              display: flex;
              background-color: rgba(0, 0, 0, 0.55);
              color: white;
              left: 0;
              bottom: 16px;
              border-top-right-radius: 6px;
            "
            v-if="(() => {
                  const ppm: PartyParam = props.party?._params.get('manaboard2')
                  return ppm instanceof PartyParamManaboard2 ? !ppm[`union${union}main`].is_empty() : false
                })()"
          >
            <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
              {{
                (() => {
                  // if (true) {
                  const m =
                    props.party._params.get('manaboard2')[`union${union}main`][`manaboard${i + 3}`]
                  return typeof m === 'number' ? m : '-'
                })()
              }}
            </div>
          </div>
          <div style="text-align: center">
            {{
              props.show_name
                ? props.party.party.union(union).main instanceof Unit
                  ? props.party.party.union(union).main['name_zh']
                  : union === 1
                  ? '队长'
                  : '主要角色'
                : union === 1
                ? '队长'
                : '主要角色'
            }}
          </div>
        </div>
        <div class="wfo-slot armament">
          <img
            :src="get_pic_url(props.party.party.union(union).armament)"
            alt=""
            loading="lazy"
            @dragstart.prevent
          />
          <div style="text-align: center">装备</div>
        </div>
        <el-popover
          v-if="popover"
          :auto-close="0"
          :show-after="100"
          :hide-after="0"
          :show-arrow="false"
          width="fit-content"
          popper-style="
          background: transparent;
          border: none;
          box-shadow: none;
          margin-top: -20px;
          "
          placement="bottom"
        >
          <template #reference>
            <div
              class="wfo-slot unison"
              :class="[
                props.party.party.union(union).unison instanceof Unit
                  ? `ele-${ele_id2ele[props.party.party.union(union).unison?.element]}`
                  : ''
              ]"
            >
              <img
                :src="get_pic_url(props.party.party.union(union).unison, props.show_awaken)"
                alt=""
                loading="lazy"
                @dragstart.prevent
              />
              <div
                style="
                  position: absolute;
                  display: flex;
                  background-color: rgba(0, 0, 0, 0.55);
                  color: white;
                  left: 0;
                  bottom: 16px;
                  border-top-right-radius: 6px;
                "
                v-if="(() => {
                  const ppm: PartyParam = props.party?._params.get('manaboard2')
                  return ppm instanceof PartyParamManaboard2 ? !ppm[`union${union}unison`].is_empty() : false
                })()"
              >
                <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
                  {{
                    (() => {
                      const m =
                        props.party._params.get('manaboard2')[`union${union}unison`][
                          `manaboard${i + 3}`
                        ]
                      return typeof m === 'number' ? m : '-'
                    })()
                  }}
                </div>
              </div>
              <div style="text-align: center">
                {{
                  props.show_name
                    ? props.party.party.union(union).unison instanceof Unit
                      ? props.party.party.union(union).unison.name_zh
                      : '辅助角色'
                    : '辅助角色'
                }}
              </div>
            </div>
          </template>
          <UnitLiteCard
            style="zoom: 75%; box-shadow: 0 0 12px rgba(48, 48, 48, 0.65); cursor: pointer"
            :unit="props.party.party.union(union).unison"
          />
        </el-popover>
        <div
          v-else
          class="wfo-slot unison"
          :class="[
            props.party.party.union(union).unison
              ? `ele-${ele_id2ele[props.party.party.union(union).unison?.element]}`
              : ''
          ]"
        >
          <img
            :src="get_pic_url(props.party.party.union(union).unison, props.show_awaken)"
            alt=""
            loading="lazy"
            @dragstart.prevent
          />
          <div
            style="
              position: absolute;
              display: flex;
              background-color: rgba(0, 0, 0, 0.55);
              color: white;
              left: 0;
              bottom: 16px;
              border-top-right-radius: 6px;
            "
            v-if="(() => {
                  const ppm: PartyParam = props.party?._params.get('manaboard2')
                  return ppm instanceof PartyParamManaboard2 ? !ppm[`union${union}unison`].is_empty() : false
                })()"
          >
            <div v-for="i in 3" :key="i" style="width: 16px; text-align: center">
              {{
                (() => {
                  const m =
                    props.party._params.get('manaboard2')[`union${union}unison`][
                      `manaboard${i + 3}`
                    ]
                  return typeof m === 'number' ? m : '-'
                })()
              }}
            </div>
          </div>
          <div style="text-align: center">
            {{
              props.show_name
                ? props.party.party.union(union).unison instanceof Unit
                  ? props.party.party.union(union).unison.name_zh
                  : '辅助角色'
                : '辅助角色'
            }}
          </div>
        </div>
        <div class="wfo-slot core">
          <img
            :src="get_pic_url(props.party.party.union(union).core, true)"
            alt=""
            loading="lazy"
            @dragstart.prevent
          />
          <div style="text-align: center">魂珠</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PartyCardEliya',
  data() {
    return {
      blank: '/api/static/worldflipper/unit/blank.png'
    }
  }
}
</script>

<style scoped>
.party {
  user-select: none;
  width: 480px;
  height: 205px;
  background: transparent;
  display: flex;
  /*border: 6px solid var(--main-color);*/
  box-sizing: content-box;
  border-radius: 6px;
  transition: box-shadow 0.2s linear;
  box-shadow: none;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  /* font-family: 'Courier New', Courier, monospace; */
  /* font-family: "黑体"; */
  font-size: 13px;
  color: black;
}

.union {
  width: 150px;
  height: 195px;
  margin: 5px;
  position: relative;
  /* background-color: crimson; */
}

.union img {
  display: block;
}

.wfo {
  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 0 0 4px black;
  margin: 2px 0;
  width: 62px;
  cursor: pointer;
}

.ele-none::before {
  background-image: url('/static/worldflipper/icon/none.png');
}

.ele-fire::before {
  background-image: url('/static/worldflipper/icon/fire.png');
}

.ele-water::before {
  background-image: url('/static/worldflipper/icon/water.png');
}

.ele-thunder::before {
  background-image: url('/static/worldflipper/icon/thunder.png');
}

.ele-wind::before {
  background-image: url('/static/worldflipper/icon/wind.png');
}

.ele-light::before {
  background-image: url('/static/worldflipper/icon/light.png');
}

.ele-dark::before {
  background-image: url('/static/worldflipper/icon/dark.png');
}

.wfo-slot.main::before,
.wfo-slot.unison::before,
.wfo::before {
  content: '';
  background-size: 14px;
  background-position: 1px 1px;
  background-repeat: no-repeat;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -2px;
  right: -2px;
  border-radius: 2px;
  background-color: white;
  z-index: 10;
}

.wfo-slot {
  border: 3px solid white;
  border-radius: 3px;
  margin: 2px;
  position: absolute;
  /* background-color: aqua; */
  background-color: white;
  box-shadow: 0 0 2px black;
  /*cursor: pointer;*/
  cursor: auto;
}

.main {
  z-index: 3;
  width: 88px;
  height: 104px;
  left: 0;
  top: 0;
}

.main > img {
  width: 82px;
  height: 82px;
}

.armament {
  z-index: 5;
  width: 60px;
  height: 76px;
  top: 16px;
  right: 0;
}

.armament > img {
  width: 54px;
  height: 54px;
}

.unison {
  z-index: 2;
  width: 75px;
  height: 91px;
  bottom: 0;
  right: 0;
}

.unison > img {
  width: 69px;
  height: 69px;
}

.core {
  box-shadow: none;
  width: 60px;
  height: 76px;
  bottom: 3px;
  left: 5px;
}

.core > img {
  width: 54px;
  height: 54px;
}
</style>
