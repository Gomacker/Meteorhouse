<script setup lang="ts">
import type { PartyRelease } from "@/anise/worldflipper/party2"
import { computed, type ModelRef } from "vue"
import { useWorldflipperDataStore } from "@/stores/worldflipper"
import PartyUnionSlot0 from "@/components/card/party/PartyUnionSlot0.vue"
import PartyUnionSlot1 from "@/components/card/party/PartyUnionSlot1.vue"
import PartyUnionSlot2 from "@/components/card/party/PartyUnionSlot2.vue"
import './party.css'
import PartyUnionSlot3 from "@/components/card/party/PartyUnionSlot3.vue"

const partyRelease: ModelRef<PartyRelease> = defineModel<PartyRelease>({ required: true })
const worldflipper = useWorldflipperDataStore()
console.log(partyRelease.value.getParty())
console.log(partyRelease.value.getParams())
const party = computed(() => partyRelease.value.getParty())
const params = computed(() => partyRelease.value.getParams())
const characters = computed(() => worldflipper.characters)
const equipments = computed(() => worldflipper.equipments)

export interface PartyStyle {
  background: string
  showCharacterName: boolean
  showCharacterAwakened: boolean
}

</script>

<template>
  <div style="display: flex; z-index: 0">
    <div
      v-for="(union, unionIndex) in party.main"
      style="width: 150px; margin: 5px; background: #58ffb7; height: 195px; user-select: none"
    >
      <PartyUnionSlot0
        :character="characters.get(String(union[0]))"
        :params="params"
        :union-index="unionIndex"
      />
      <PartyUnionSlot1
        :character="characters.get(String(union[1]))"
        :params="params"
        :union-index="unionIndex"
      />
      <PartyUnionSlot2
        :equipment="equipments.get(String(union[2]))"
        :params="params"
        :union-index="unionIndex"
      />
      <PartyUnionSlot3
        :equipment="equipments.get(String(union[3]))"
        :params="params"
        :union-index="unionIndex"
      />
    </div>
  </div>
</template>

<style scoped></style>
