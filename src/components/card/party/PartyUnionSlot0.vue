<script setup lang="ts">
import type { PartyParams } from '@/anise/worldflipper/party2'
import { type Character, Element } from '@/anise/worldflipper/object'
import { exAAbilities, exBAbilities } from '@/anise/worldflipper/party'
import { computed } from 'vue'
import type { PartyStyle } from '@/components/card/party/PartyReleaseBody.vue'

const props = defineProps<{
  character?: Character
  params: PartyParams
  unionIndex: 0 | 1 | 2
  partyStyle?: PartyStyle
}>()

const exA = computed(() => props.params.ex && props.params.ex[props.unionIndex][0][0])
const exB = computed(() => props.params.ex && props.params.ex[props.unionIndex][0][1])
</script>

<template>
  <div
    class="union-slot union-main"
    :class="[`element-${Element[character.element]?.toLowerCase()}`]"
  >
    <img
      v-if="exA"
      :src="exAAbilities[exA].imageSrc"
      :title="exAAbilities[exA].name"
      alt=""
      class="ex-icon"
      style="right: 2px; top: 16px"
      @dragstart.prevent
    />
    <img
      v-if="exB"
      :src="exBAbilities[exB].imageSrc"
      :title="exBAbilities[exB].name"
      alt=""
      class="ex-icon"
      style="right: 2px; top: 36px"
      @dragstart.prevent
    />
    <v-img
      :src="
        character.res(partyStyle?.showCharacterAwakened ? 'square212x/awakened' : 'square212x/base')
      "
      @dragstart.prevent
    />
    <div
      v-if="
        params.manaboard2 &&
        params.manaboard2[unionIndex][0].map((value) => value !== null).includes(true)
      "
      class="party-card-manaboard2-wrapper"
    >
      <div>{{ params.manaboard2[unionIndex][0][0] || '-' }}</div>
      <div>{{ params.manaboard2[unionIndex][0][1] || '-' }}</div>
      <div>{{ params.manaboard2[unionIndex][0][2] || '-' }}</div>
    </div>
    <div style="text-align: center; font-size: 13px; user-select: text">
      {{ partyStyle?.showCharacterName ? character.names[0] : (
      unionIndex === 0 ? '队长' : '主要角色'
    ) }}
    </div>
  </div>
</template>
<style scoped></style>
