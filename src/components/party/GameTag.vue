<script setup lang="ts">

import {Ref, ref, watch} from "vue";

const content2type: any = {
  '满充': 'functional',
  '驱散': 'functional',
  '净化': 'functional',
  '回转': 'functional',
  '浑身': 'functional',
  '背水': 'functional',
  'Fever': 'functional',
  '火': 'element',
  '水': 'element',
  '雷': 'element',
  '风': 'element',
  '光': 'element',
  '暗': 'element',
  '宇宙': 'element',
  '技能伤害': 'damage_type',
  '强化弹射': 'damage_type',
  '直接攻击': 'damage_type',
  '能力伤害': 'damage_type',
  '耐性': 'special',

}
const type2color: any = {
    'functional': 'rgba(0, 199, 153, 0.9)',
    'element': 'rgba(0, 175, 250, 0.9)'
}


const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const color: Ref<string> = ref(type2color[content2type[props.content]])
if (!color.value) color.value = 'rgba(0, 0, 0, 0.9)'
watch(
    props,
    () => {
        console.log(props)
        color.value = type2color[content2type[props.content]]
    },
    { deep: true }
)
</script>

<template>
  <el-tag class="tag" :color="color">
      {{ props.content }}
  </el-tag>
</template>

<script lang="ts">
export default {
  name: "GameTag"
}
</script>

<style scoped>
.tag {
    border: none;
    color: white;
    margin: 2px;
    /*padding: 2px 6px;*/
    /*border-radius: 4px;*/
    /*font-size: 10px;*/
}
</style>