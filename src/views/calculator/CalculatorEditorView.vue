<script setup lang="ts">
import { manager, PartyRelease, Unit } from "@/stores/manager";
import { ref } from "vue";

defineProps<{
  party: PartyRelease | undefined
}>()

defineEmits<{
  select_party: void
}>()

const border_color = ref('#000000')
const show_name = ref(false)
const show_awaken = ref(false)
function get_show_text(unit: Unit | undefined, union: string, main_slot: boolean) {
  if (show_name.value) {
    if (unit instanceof Unit) return unit.name_zh
  }
  return main_slot ? (union === 'union1' ? '队长' : '主要角色') : '辅助角色'
}
</script>

<template>
  <div
    style="display: flex; flex-direction: column; align-items: center"
  >
    <template v-if="party instanceof PartyRelease">
      <div
        class="party-body"
        style="background: white; margin: 20px"
        :style="{ border: `6px solid ${border_color}` }"
      >
        <div class="party-union" :key="union" v-for="union in ['union1', 'union2', 'union3']">
          <div
            class="party-wfo-slot party-main"
            :class="[
              selected_position.union == union && selected_position.position === 0
                ? 'selected'
                : '',
              party?.party[union].main ? `ele-${party?.party[union].main.element}` : ''
            ]"
            @click="$emit['select_party'](union, 0)"
          >
            <img
              :src="get_pic_url(party?.party[union].main, show_awaken)"
              alt=""
              @dragstart.prevent
            />
            <div>
              <div style="text-align: center">
                {{ get_show_text(party.party[union].main, union, true) }}
              </div>
            </div>
          </div>
          <div
            class="party-wfo-slot party-armament"
            :class="[
              selected_position.union == union && selected_position.position === 1
                ? 'selected'
                : '',
              party?.party[union].armament ? `ele-${party?.party[union].armament.element}` : ''
            ]"
            @click="$emit['select_party'](union, 1)"
          >
            <img :src="get_pic_url(party?.party[union].armament)" alt="" @dragstart.prevent />
            <div>
              <div style="text-align: center">装备</div>
            </div>
          </div>
          <div
            class="party-wfo-slot party-unison"
            :class="[
              selected_position.union == union && selected_position.position === 2
                ? 'selected'
                : '',
              party?.party[union].unison ? `ele-${party?.party[union].unison.element}` : ''
            ]"
            @click="$emit['select_party'](union, 2)"
          >
            <img
              :src="get_pic_url(party?.party[union].unison, show_awaken)"
              alt=""
              @dragstart.prevent
            />
            <div>
              <div style="text-align: center">
                {{ get_show_text(party.party[union].unison, union, false) }}
              </div>
            </div>
          </div>
          <div
            class="party-wfo-slot party-core"
            :class="[
              selected_position.union == union && selected_position.position === 3
                ? 'selected'
                : '',
              party?.party[union].core ? `ele-${party?.party[union].core.element}` : ''
            ]"
            @click="$emit['select_party'](union, 3)"
          >
            <img :src="get_pic_url(party?.party[union].core, true)" alt="" @dragstart.prevent />
            <div>
              <div style="text-align: center">魂珠</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div>
      <el-button
        type="warning"
        @click="
          () => {
            const unit_length = manager.unit_data.size
            const armament_length = manager.armament_data.size
            const ru = () =>
              Array.from(manager.unit_data.keys())[Math.round(Math.random() * unit_length)]
            const ra = () =>
              Array.from(manager.armament_data.keys())[Math.round(Math.random() * armament_length)]
            party = PartyRelease.loads({
              party: {
                union1: [ru(), ru(), ra(), ra()],
                union2: [ru(), ru(), ra(), ra()],
                union3: [ru(), ru(), ra(), ra()]
              }
            })
          }
        "
      >
        Random
      </el-button>
      <el-button type="danger" @click="party = PartyRelease.empty()"> Clear </el-button>
    </div>
  </div>
</template>

<style scoped></style>
