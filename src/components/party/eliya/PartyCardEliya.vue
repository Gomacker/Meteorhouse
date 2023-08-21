<script lang="ts" setup>
import { ref } from 'vue'
import type { PartyRelease } from '@/anise/worldflipper/party'
import UnionComponent from '@/components/party/eliya/UnionComponent.vue'
import { PartyEditor } from "@/anise/worldflipper/party";


const props = defineProps<{
  party: PartyRelease
  always_show_replacements?: boolean
  show_name?: boolean
  show_awaken?: boolean
  replacements?: object
  editable?: boolean
  party_editor?: PartyEditor
  eager?: boolean
}>()
const replacement_size = 26
const show_replacements = ref(false)

</script>
<template>
  <div class="party" @mouseenter="show_replacements = true" @mouseleave="show_replacements = false">
    <UnionComponent
      v-model="$props.party.party.union1"
      :show_name="show_name"
      :show_awaken="show_awaken"
      :party_editor="party_editor"
      :union_index="1"
      :eager="eager"

    />
    <UnionComponent
      v-model="$props.party.party.union2"
      :show_name="show_name"
      :show_awaken="show_awaken"
      :party_editor="party_editor"
      :union_index="2"
      :eager="eager"
    />
    <UnionComponent
      v-model="$props.party.party.union3"
      :show_name="show_name"
      :show_awaken="show_awaken"
      :party_editor="party_editor"
      :union_index="3"
      :eager="eager"
    />
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
  background-image: url('/worldflipper/icon/none.png');
}

.ele-fire::before {
  background-image: url('/worldflipper/icon/fire.png');
}

.ele-water::before {
  background-image: url('/worldflipper/icon/water.png');
}

.ele-thunder::before {
  background-image: url('/worldflipper/icon/thunder.png');
}

.ele-wind::before {
  background-image: url('/worldflipper/icon/wind.png');
}

.ele-light::before {
  background-image: url('/worldflipper/icon/light.png');
}

.ele-dark::before {
  background-image: url('/worldflipper/icon/dark.png');
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
  background-color: white;
  box-shadow: rgba(9, 30, 66, 0.35) 0 1px 1px, rgba(9, 30, 66, 0.25) 0 0 1px 1px;
  //box-shadow: 0 0 2px black;
  /*cursor: pointer;*/
  cursor: auto;
}

.party-slot-main {
  z-index: 3;
  width: 88px;
  height: 104px;
  left: 0;
  top: 0;
}

.party-slot-main > img {
  width: 82px;
  height: 82px;
}

.party-slot-equipment {
  z-index: 5;
  width: 60px;
  height: 76px;
  top: 16px;
  right: 0;
}

.party-slot-equipment > img {
  width: 54px;
  height: 54px;
}

.party-slot-unison {
  z-index: 2;
  width: 75px;
  height: 91px;
  bottom: 0;
  right: 0;
}

.party-slot-unison > img {
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
