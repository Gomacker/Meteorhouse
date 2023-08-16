<template>
  <template v-if="obj">
    <CharacterWikiCard id="main-card" :obj="obj" />
  </template>
  <template v-else> 缺少ID </template>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import CharacterWikiCard from '@/components/worldflipper/character/CharacterWikiCard.vue'

let wf_id = ref<string | undefined>()
const worldflipper = useWorldflipperDataStore()
export default {
  name: 'UnitCardView',
  computed: {
    obj() {
      return worldflipper.characters.get(wf_id.value || '0')
    }
  },
  data() {
    return {
      wf_id: wf_id
    }
  },
  components: { CharacterWikiCard },
  mounted() {
    const route = useRoute()
    wf_id.value = typeof route.query['wf_id'] === 'string' ? route.query['wf_id'] : undefined
    console.log(wf_id)
  }
}
</script>

<style scoped></style>