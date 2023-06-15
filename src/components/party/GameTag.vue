<script setup lang="ts">
import { computed } from "vue";
import { content2type } from '@/components/party/tag'

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
const default_color = 'rgba(0, 0, 0, 0.8)'
const color = computed(
  () => {
    const type = content2type.get(props.content)
    if (type) {
      const _c = type2color[type]
      return _c ? _c : default_color
    }else
      return default_color
  }
)
</script>

<template>
  <v-chip v-ripple label="" density="comfortable" class="tag" :style="{'background': color}">
    {{ props.content }}
  </v-chip>
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
  user-select: none;
}
</style>
