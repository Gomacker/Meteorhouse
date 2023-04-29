<script lang="ts" setup>
import {ref} from "vue";
import {Unit, Armament, PartyRelease} from "@/stores/manager";
import UnitPicOriginPartyMain from "@/components/objects/unit/UnitPicOriginPartyMain.vue";

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
// const party = ref(JSON.parse(JSON.stringify(props.party)))
// const party_debug = ref(JSON.stringify(props.party))
const allow_mb2_lv = [0,1,2,3,4,5]
const replacement_size = '36px'
const show_replacements = ref(false)

// function getParamReplacements(p, union, pos) {
//   if (!('params' in p) || !('replacements' in p['params'])) return []
//   let rps = p['params']['replacements']
//   if (union in rps) {
//     rps = rps[union]
//     if ('main' in rps || 'armament' in rps || 'unison' in rps || 'core' in rps) {
//       // console.log(rps)
//       pos = {0: 'main', 1: 'unison', 2: 'armament', 3: 'core'}[pos]
//       return pos in rps ? rps[pos] : []
//
//     }
//     else if (pos in rps) {
//       return rps[pos]
//     } else return []
//   }
//   else return []
// }

function get_pic_url(obj: Unit | Armament, awakened_or_soul = false) {
  return obj ? obj.pic_url(awakened_or_soul) : '/static/worldflipper/unit/blank.png'
}

</script>
<template>
<div class="party" style="display: flex;">
  <template v-if="props.party">
    <div class="union" :key="union" v-for="union in ['union1', 'union2', 'union3']">
<!--      <img-->
<!--          :src="`/static/worldflipper/ui/party/main.png`"-->
<!--          style="-->
<!--          z-index: 1;-->
<!--          position: absolute;-->
<!--          margin: 0;-->
<!--          "-->
<!--          alt=""-->
<!--      />-->
<!--      <img-->
<!--          :src="`/static/worldflipper/unit/party_main/${show_awaken ? 'awakened' : 'base'}/${props.party.party[union].main.extraction_id}.png`"-->
<!--          style="-->
<!--          z-index: 0;-->
<!--          margin: 16px 17px;-->
<!--          "-->
<!--          alt=""-->
<!--      />-->
      <UnitPicOriginPartyMain :unit="props.party.party[union].main"/>

<!--    <div class="wfo-slot main"-->
<!--         :class="[props.party.party[union].main ? 'ele-' + props.party.party[union].main.element : '']"-->
<!--    >-->
<!--      <img :src="get_pic_url(props.party.party[union].main, props.show_awaken)" alt="" loading="lazy" @dragstart.prevent/>-->
<!--      <div>-->
<!--        <div style="text-align: center;">-->
<!--          {{ props.show_name ? props.party.party[union].main.name_zh : union === 'union1' ? '队长' : '主要角色' }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="wfo-slot armament">-->
<!--      <img :src="get_pic_url(props.party.party[union].armament)" alt="" loading="lazy" @dragstart.prevent/>-->
<!--      <div style="text-align: center;">装备</div>-->
<!--    </div>-->
<!--    <div class="wfo-slot unison"-->
<!--         :class="[props.party.party[union].unison ? 'ele-' + props.party.party[union].unison.element : '']">-->

<!--      <img :src="get_pic_url(props.party.party[union].unison, props.show_awaken)" alt="" loading="lazy" @dragstart.prevent/>-->

<!--      <div style="text-align: center;">-->
<!--        {{ props.show_name ? props.party.party[union].unison.name_zh : '辅助角色' }}-->
<!--      </div>-->

<!--    </div>-->
<!--    <div class="wfo-slot core">-->
<!--      <img :src="get_pic_url(props.party.party[union].core, true)" alt="" loading="lazy" @dragstart.prevent/>-->
<!--      <div style="text-align: center;">魂珠</div>-->
<!--    </div>-->
  </div>
  </template>
</div>
</template>

<script lang="ts">

export default {
  name: "PartyCardOriginLarge",
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
  /*width: 480px;*/
  /*height: 205px;*/
  background: white;
  display: flex;
  border: 6px solid var(--main-color);
  box-sizing: content-box;
  border-radius: 6px;
  transition: box-shadow 0.2s linear;
  box-shadow: none;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  /* font-family: 'Courier New', Courier, monospace; */
  /* font-family: "黑体"; */
  font-size: 13px;
  color: black;
}
.union {
  /*width: 150px;*/
  /*height: 195px;*/
  margin: 5px;
  position: relative;
  /* background-color: crimson; */
}
.union img {
  display: block;
}
.wfo{
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