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
const show_replacements = ref(false)

console.log(props)
</script>
<template>
  <div class="party" @mouseenter="show_replacements = true" @mouseleave="show_replacements = false">
    <UnionComponent
      v-model="$props.party.party.union1"
      :show_name="show_name"
      :show_awaken="show_awaken"
      :party_editor="party_editor"
      :party="party"
      :union_index="1"
      :eager="eager"
    />
    <UnionComponent
      v-model="$props.party.party.union2"
      :show_name="show_name"
      :show_awaken="show_awaken"
      :party_editor="party_editor"
      :party="party"
      :union_index="2"
      :eager="eager"
    />
    <UnionComponent
      v-model="$props.party.party.union3"
      :show_name="show_name"
      :show_awaken="show_awaken"
      :party_editor="party_editor"
      :party="party"
      :union_index="3"
      :eager="eager"
    />
  </div>
</template>

<style scoped>
.party {
  user-select: none;
  width: 480px;
  height: 205px;
  background: transparent;
  display: flex;
  box-sizing: content-box;
  border-radius: 6px;
  transition: box-shadow 0.2s linear;
  box-shadow: none;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: black;
}
</style>
