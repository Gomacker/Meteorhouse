<script setup lang="ts">
import UnionComponent from '@/components/party/eliya/UnionComponent.vue'
import { PartyRelease } from '@/anise/worldflipper/party'

defineProps<{ modelValue: PartyRelease }>()
</script>

<template>
  <div class="party">
    <UnionComponent v-model="$props.modelValue.party.union1" is_leader />
    <UnionComponent v-model="$props.modelValue.party.union2" />
    <UnionComponent v-model="$props.modelValue.party.union3" />
  </div>
</template>

<style scoped>
.party {
  user-select: none;
  width: 480px;
  height: 205px;
  background: transparent;
  display: grid;
  grid-template-columns: repeat(3, 160px);
  /*display: flex;*/
  /*border: 6px solid var(--main-color);*/
  box-sizing: content-box;
  border-radius: 6px;
  transition: box-shadow 0.2s linear;
  box-shadow: none;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: black;
}
</style>
