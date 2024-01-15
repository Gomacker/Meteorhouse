<script setup lang="ts">
import type { PartyRelease } from "@/anise/worldflipper/party2"
import { computed, type ModelRef } from "vue"
import { useWorldflipperDataStore } from "@/stores/worldflipper"
import { Element } from "@/anise/worldflipper/object"

const partyRelease: ModelRef<PartyRelease> = defineModel<PartyRelease>({ required: true })
const worldflipper = useWorldflipperDataStore()
console.log(partyRelease.value.getParty())
console.log(partyRelease.value.getParams())
const party = computed(() => partyRelease.value.getParty())
const params = computed(() => partyRelease.value.getParams())
const characters = computed(() => worldflipper.characters)

</script>

<template>
  <div style="display: flex">
    <div
      v-for="(union, unionIndex) in party.main"
      style="width: 150px; margin: 5px; background: #58ffb7; height: 195px"
    >
      <div
        class="union-slot union-main"
        :class="[
          `element-${Element[characters.get(String(union[0])).element].toLowerCase()}`
        ]"
      >
        <v-img
          :src="characters.get(String(union[0])).res('square212x/base')"
          @dragstart.prevent
        />
        <div
          v-if="params.manaboard2 && params.manaboard2[unionIndex][0].map(value => value !== null).includes(true)"
          class="party-card-manaboard2-wrapper"
        >
          <div>{{ params.manaboard2[unionIndex][0][0] || "-" }}</div>
          <div>{{ params.manaboard2[unionIndex][0][1] || "-" }}</div>
          <div>{{ params.manaboard2[unionIndex][0][2] || "-" }}</div>
        </div>
        <div style="text-align: center; font-size: 13px">
          {{ unionIndex === 0 ? "队长" : "主要角色" }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.union-slot {
  border: 3px solid white;
  border-radius: 3px;
  margin: 2px;
  height: 100%;
  position: absolute;
  background-color: white;
  box-shadow: rgba(9, 30, 66, 0.35) 0 1px 1px, rgba(9, 30, 66, 0.25) 0 0 1px 1px;
  cursor: auto;
  transition: border 0.3s ease;

  &.union-main::before,
  &.union-unison::before {
    content: '';
    background-size: 14px;
    background-position: 1px 1px;
    background-repeat: no-repeat;
    position: absolute;
    width: 16px;
    height: 16px;
    top: -2px;
    right: -2px;
    border-radius: 2px;
    background-color: white;
    z-index: 10;
    background-image: var(--element-icon);
  }
}

.element-none::before {
  --element-icon: url("/static/worldflipper/icon/none.png");
}
.element-fire::before {
  --element-icon: url("/static/worldflipper/icon/fire.png");
}

.element-water::before {
  --element-icon: url("/static/worldflipper/icon/water.png");
}

.element-thunder::before {
  --element-icon: url("/static/worldflipper/icon/thunder.png");
}

.element-wind::before {
  --element-icon: url("/static/worldflipper/icon/wind.png");
}

.element-light::before {
  --element-icon: url("/static/worldflipper/icon/light.png");
}

.element-dark::before {
  --element-icon: url("/static/worldflipper/icon/dark.png");
}

.union-main {
  z-index: 3;
  width: 88px;
  height: 104px;
  left: 0;
  top: 0;

  & .v-img {
    width: 82px;
    height: 82px;
  }
}

.union-unison {

}

.party-card-manaboard2-wrapper {
  position: absolute;
  display: flex;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  left: 0;
  bottom: 16px;
  font-size: 13px;
  border-top-right-radius: 6px;

  & > div {
    width: 16px;
    text-align: center;
  }
}

</style>
