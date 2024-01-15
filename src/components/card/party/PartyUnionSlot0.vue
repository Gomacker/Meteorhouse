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
const exA = computed(() => props.params.ex && props.params.ex[props.unionIndex][1][0])
const exB = computed(() => props.params.ex && props.params.ex[props.unionIndex][1][1])

const showName = computed(() => {
  if (props.character) {
    if (props.partyStyle?.showCharacterName) return props.character.names[0]
  }
  return props.unionIndex === 0 ? '队长' : '主要角色'
})
</script>

<template>
  <div
    class="union-slot union-main"
    :class="[character && `element-${Element[character.element]?.toLowerCase()}`]"
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
      :eager="partyStyle?.eagerLoading"
      :src="
        character
          ? character.res(
              partyStyle?.showCharacterAwakened ? 'square212x/awakened' : 'square212x/base'
            )
          : '/static/worldflipper/unit/blank.png'
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
    <div style="text-align: center; font-size: 13px">
      {{ showName }}
    </div>
  </div>
</template>
<style scoped></style>
