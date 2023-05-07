<script setup lang="ts">
import { Ref, ref, watch } from 'vue'

const content2type: Map<string, string> = new Map<string, string>()
content2type.set('火', 'element')
content2type.set('水', 'element')
content2type.set('雷', 'element')
content2type.set('风', 'element')
content2type.set('光', 'element')
content2type.set('暗', 'element')
content2type.set('宇宙', 'element')
content2type.set('浑身', 'trigger')
content2type.set('挨打', 'trigger')
content2type.set('背水', 'trigger')
content2type.set('棺材', 'trigger')
content2type.set('破敌', 'trigger')
content2type.set('点灯', 'trigger')
content2type.set('弱体', 'trigger')
content2type.set('Fever', 'trigger')
content2type.set('连击', 'trigger')
content2type.set('面包', 'trigger')
content2type.set('纯色', 'trigger')
content2type.set('技伤', 'damage')
content2type.set('PF', 'damage')
content2type.set('直击', 'damage')
content2type.set('能力', 'damage')
content2type.set('回转', 'functional')
content2type.set('充能', 'functional')
content2type.set('蓝条', 'functional')
content2type.set('驱散', 'functional')
content2type.set('净化', 'functional')
content2type.set('追击', 'functional')
content2type.set('强化延长', 'functional')
content2type.set('抗性down', 'functional')
content2type.set('抗性', 'functional')
content2type.set('贯通', 'functional')
content2type.set('浮游', 'functional')
content2type.set('加速', 'functional')
content2type.set('麻痹', 'functional')
content2type.set('顿足', 'functional')
content2type.set('护盾', 'functional')
content2type.set('恢复', 'functional')
content2type.set('牺牲', 'functional')
content2type.set('承伤', 'functional')
content2type.set('增幅', 'functional')
content2type.set('多击', 'functional')
const type2color: any = {
  functional: 'rgba(0, 199, 153, 0.9)',
  element: 'rgba(0, 175, 250, 0.9)',
  damage: 'rgba(250, 58, 0, 0.9)',
  trigger: 'rgb(76, 50, 169, 0.9)'
}

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const color: Ref<string> = ref(type2color[<string>content2type.get(props.content)])
if (!color.value) color.value = 'rgba(0, 0, 0, 0.9)'
watch(
  props,
  () => {
    console.log(props)
    color.value = type2color[<string>content2type.get(props.content)]
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
  name: 'GameTag'
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
