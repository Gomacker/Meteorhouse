<script setup lang="ts">
import { Armament, ele2color, Unit } from '@/stores/manager'
import chroma from 'chroma-js'
import { ref } from 'vue'
const menu_active = ref<string>('special')
defineProps<{ selected_obj: Unit | Armament | undefined }>()
</script>

<template>
  <div style="display: flex; align-items: center; flex-direction: column; height: 100%">
    <template v-if="selected_obj instanceof Unit">
      <div style="width: 100%; height: 100%; display: flex; justify-content: space-between">
        <div
          class="character-drawing"
          :style="{
            background: `linear-gradient(to bottom,
            ${ele2color[selected_obj.element]},
            ${chroma(ele2color[selected_obj.element]).alpha(0.1).hex()})`,
            'box-shadow': `0 0 16px ${ele2color[selected_obj.element]}`
          }"
        >
          <a
            target="_blank"
            :href="`/static/worldflipper/unit/full/base/${selected_obj.extraction_id}.png`"
          >
            <el-image
              style="float: right; height: 100%"
              fit="cover"
              :src="`/static/worldflipper/unit/full/base/${selected_obj.extraction_id}.png`"
            />
          </a>
        </div>
        <div
          style="
            flex: 33%;
            display: flex;
            flex-direction: column;
            /*justify-content: center;*/
            align-items: center;
            height: 100%;
          "
        >
          <el-menu
            mode="horizontal"
            @select="
              (r) => {
                menu_active = r
              }
            "
            :default-active="menu_active"
            :active-text-color="'rgba(200,0,255,0.8)'"
            style="display: flex; width: 100%; justify-content: center"
            :ellipsis="false"
          >
            <el-menu-item index="special">胜利</el-menu-item>
            <el-menu-item index="walk_front">前进</el-menu-item>
          </el-menu>
          <div
            style="
              display: flex;
              width: 100%;
              height: 100%;
              justify-content: space-around;
              align-items: center;
              flex-direction: column;
            "
          >
            <el-image
              fit="none"
              :src="`/static/worldflipper/unit/pixelart/${menu_active}/${selected_obj.extraction_id}.gif`"
            />
            <a style="margin: 4px" target="_blank" :href="`/card/unit?wf_id=${selected_obj.id}`">
              <el-button type="warning"> 独立WikiCard页 </el-button>
            </a>
          </div>
        </div>
        <div
          class="character-drawing"
          :style="{
            background: `linear-gradient(to bottom,
            ${ele2color[selected_obj.element]},
            ${chroma(ele2color[selected_obj.element]).alpha(0.1).hex()})`,
            'box-shadow': `0 0 16px ${ele2color[selected_obj.element]}`
            // flex: main_show == 'right' ? '100%' : ''
          }"
        >
          <a
            target="_blank"
            :href="`/static/worldflipper/unit/full/awakened/${selected_obj.extraction_id}.png`"
          >
            <el-image
              style="float: left; height: 100%"
              fit="cover"
              :src="`/static/worldflipper/unit/full/awakened/${selected_obj.extraction_id}.png`"
            />
          </a>
        </div>
      </div>
    </template>
    <template v-else-if="selected_obj instanceof Armament">
      <a target="_blank" :href="`/card/armament?wf_id=${selected_obj.id}`">
        <el-button> 独立Card页 </el-button>
      </a>
    </template>
    <template v-else> 选择一个角色 / 装备 </template>
  </div>
</template>

<style scoped>
.character-drawing {
  width: 33%;
  height: 100%;
  transition: width 0.4s ease;
  transition-delay: 0.3s;
  z-index: 1;
}
.character-drawing:hover {
  width: 100%;
}
</style>
