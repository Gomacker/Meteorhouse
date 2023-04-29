<script lang="ts" setup>
import {reactive, ref} from "vue";
import {Unit, Armament, PartyRelease} from "@/stores/manager";
import UnitLiteCard from "@/components/card/UnitLiteCard.vue";
import {dragged_object, target_list} from "@/stores/party_editor";

const props = defineProps({
  party: {
    type: PartyRelease,
    require: true
  },
  hidden_replacement: {
    type: Boolean,
    require: false,
    default: true
  },
  show_name: {
    type: Boolean,
    default: false
  },
  show_awaken: {
    type: Boolean,
    default: false
  }
})

function get_pic_url(obj: Unit | Armament | undefined, awakened_or_soul = false) {
  if (!obj) {
    return '/static/worldflipper/unit/blank.png'
  } else return (obj instanceof (Unit || Armament)) ? obj.pic_url(awakened_or_soul) : '/static/worldflipper/unit/blank.png'
}

const party_slots = reactive({
  union1_main: [{}],
  union2_main: [{}],
  union3_main: [{}],
  union1_unison: [{}],
  union2_unison: [{}],
  union3_unison: [{}],
})

function onAdd(e: any, slot: string) {
  // console.log(target_list.value)
  // target_list.value.splice(1, 1)
  target_list.value.splice(0, target_list.value.length)
  target_list.value.push(dragged_object.value)
  console.log()

  // target_list.value.pop()
  // console.log(target_list.value.splice(0, 1))
  console.log(`(PartyCardDraggable)${e}`)
  console.log(e)
}

</script>
<template>
  <div class="party" style="display: flex;">
    <template v-if="props.party">
      <div class="union" :key="union" v-for="union in ['union1', 'union2', 'union3']">
        <el-popover
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
            <draggable
                :list="party_slots[`${union}_main`]"
                group="unit"
                animation="400"
                item-key="id"
                @add="e => onAdd(e, `${union}_main`)"
                ghost-class="ghost"
            >
              <template #item="{element}">
                <div
                    class="wfo-slot main"
                    :class="[element ? `ele-${element.element}` : '']"
                >
                  <img :src="get_pic_url(element, props.show_awaken)" alt="" loading="lazy"
                       @dragstart.prevent/>
                  <div>
                    <div style="text-align: center;">
                      {{
                        props.show_name ? (element ? element.name_zh : union === 'union1' ? '队长' : '主要角色') : union === 'union1' ? '队长' : '主要角色'
                      }}
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
          </template>
          <UnitLiteCard style="zoom: 60%; box-shadow: 0 0 12px rgba(48,48,48,0.65); cursor: pointer;"
                        :unit="props.party.party[union].main"/>
        </el-popover>
        <div class="wfo-slot armament">
          <img :src="get_pic_url(props.party.party[union].armament)" alt="" loading="lazy" @dragstart.prevent/>
          <div style="text-align: center;">装备</div>
        </div>
        <el-popover
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
            <draggable
                :list="party_slots[`${union}_unison`]"
                group="unit"
                animation="400"
                item-key="id"
                @add="e => onAdd(e, `${union}_unison`)"
                ghost-class="ghost"
            >
              <template #item="{element}">

                <div
                    class="wfo-slot unison"
                    :class="[element ? `ele-${element.element}` : '']"
                >

                  <img :src="get_pic_url(element, props.show_awaken)" alt="" loading="lazy"
                       @dragstart.prevent/>
                  <div style="text-align: center;">
                    {{
                      props.show_name ? (element ? element.name_zh : '辅助角色') : '辅助角色'
                    }}
                  </div>
                </div>
              </template>
            </draggable>
          </template>
          <UnitLiteCard style="zoom: 60%; box-shadow: 0 0 12px rgba(48,48,48,0.65); cursor: pointer;"
                        :unit="props.party.party[union].unison"/>
        </el-popover>
        <div class="wfo-slot core">
          <img :src="get_pic_url(props.party.party[union].core, true)" alt="" loading="lazy" @dragstart.prevent/>
          <div style="text-align: center;">魂珠</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'

export default {
  name: "PartyCardEliyaDraggable",
  data() {
    return {
      blank: '/api/static/worldflipper/unit/blank.png'
    }
  },
  components: {
    draggable
  }
}
</script>

<style scoped>

.ghost {
  z-index: 4;
  /*border: red 2px solid;*/
  margin-left: 40px;
  margin-top: 20px;
  filter: drop-shadow(0 0 4px red);
  /*filter: blur(3px);*/
}

.party {
  user-select: none;
  width: 480px;
  height: 205px;
  background: white;
  display: flex;
  border: 6px solid var(--main-color);
  box-sizing: content-box;
  border-radius: 6px;
  transition: box-shadow 0.2s linear;
  box-shadow: none;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
  background-image: url("/static/worldflipper/icon/none.png");
}

.ele-fire::before {
  background-image: url("/static/worldflipper/icon/fire.png");
}

.ele-water::before {
  background-image: url("/static/worldflipper/icon/water.png");
}

.ele-thunder::before {
  background-image: url("/static/worldflipper/icon/thunder.png");
}

.ele-wind::before {
  background-image: url("/static/worldflipper/icon/wind.png");
}

.ele-light::before {
  background-image: url("/static/worldflipper/icon/light.png");
}

.ele-dark::before {
  background-image: url("/static/worldflipper/icon/dark.png");
}

.wfo-slot.main::before, .wfo-slot.unison::before, .wfo::before {
  content: "";
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
  /*bottom: 0;*/
  left: 0;
  top: 0;
  /*right: 0;*/
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