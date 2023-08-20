<script lang="ts" setup>
import { ref } from 'vue'
import { PartyRelease, Union } from '@/anise/worldflipper/party'
import type { WorldflipperObject } from '@/stores/worldflipper'

const props = defineProps({
  party: {
    type: PartyRelease,
    require: true,
    default: PartyRelease.empty()
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
</script>
<template>
  <div
    style="
      background: url('/static/worldflipper/ui/background_cut_official.png') -10px -10px / 68px;
      image-rendering: pixelated;
      width: 480px;
      user-select: none;
    "
  >
    <div
      style="
        padding: 16px 0;
        image-rendering: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: center;
      "
      v-if="props.party instanceof PartyRelease"
    >
      <div
        style="width: 136px; height: 172px; margin-left: 8px"
        :key="union"
        v-for="union in [1, 2, 3]"
      >
        <div class="party-slot-main">
          <img
            :src="
              party.party
                .union(union)
                ?.main?.res(show_awaken ? 'square212x/awakened' : 'square212x/base') ||
              '/static/worldflipper/unit/blank.png'
            "
            alt=""
            @dragstart.prevent
          />
        </div>
        <div class="party-slot-equipment" style="left: 80px; top: 10px">
          <img
            :src="
              party.party.union(union)?.equipment?.res('normal') ||
              '/static/worldflipper/unit/blank.png'
            "
            alt=""
            @dragstart.prevent
          />
        </div>
        <div class="core" style="left: 0; bottom: 18px">
          <img
            :src="
              party.party.union(union)?.core?.res('soul') || '/static/worldflipper/unit/blank.png'
            "
            alt=""
            @dragstart.prevent
          />
        </div>
        <div class="party-slot-unison" style="right: 0; bottom: 8px">
          <img
            :src="
              party.party
                .union(union)
                ?.unison?.res(show_awaken ? 'square212x/awakened' : 'square212x/base') ||
              '/static/worldflipper/unit/blank.png'
            "
            alt=""
            @dragstart.prevent
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PartyCardWfwiki',
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
  background: white;
  display: flex;
  border: 6px solid var(--main-color);
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
.wfo-slot.party-slot-main::before,
.wfo-slot.party-slot-unison::before,
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
.party-slot-main {
  height: 70px;
  width: 70px;
  box-sizing: content-box;
  border: 3px solid rgb(255, 255, 255);
  background-color: rgb(207, 216, 220);
  border-radius: 4px;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f;
  position: absolute;
}
.party-slot-main > img {
  width: inherit;
  height: inherit;
}
.party-slot-equipment {
  height: 50px;
  width: 50px;
  box-sizing: content-box;
  border: 3px solid rgb(255, 255, 255);
  background-color: rgb(207, 216, 220);
  border-radius: 4px;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f;
  position: absolute;
}
.party-slot-equipment > img {
  width: inherit;
  height: inherit;
}
.party-slot-unison {
  height: 70px;
  width: 70px;
  box-sizing: content-box;
  border: 3px solid rgb(255, 255, 255);
  background-color: rgb(207, 216, 220);
  border-radius: 4px;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f;
  position: absolute;
}
.party-slot-unison > img {
  width: inherit;
  height: inherit;
}
.core {
  height: 50px;
  width: 50px;
  box-sizing: content-box;
  border: 3px solid rgb(255, 255, 255);
  background-color: rgb(207, 216, 220);
  border-radius: 4px;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f;
  position: absolute;
}
.core > img {
  width: inherit;
  height: inherit;
}
</style>
