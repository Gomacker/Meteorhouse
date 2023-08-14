<script setup lang="ts">
import PartyCardEliya from "@/components/party/PartyCardEliya.vue";
// import PartyCardEliyaEditable from '@/components/party/PartyCardEliyaEditable.tsx'
import { ele2color } from "@/stores/manager";
import { Element } from "@/anise/worldflipper/object";
import { Party, PartyRelease } from "@/anise/worldflipper/party";
import { ref } from "vue";
// const party = PartyReleaseNew.empty()
const party = ref(PartyRelease.load({
  party: {
    union1: [121033, 121027, 5020024, 4050004],
    union2: [121021, 121004, 5060025, 4050004],
    union3: [121070, 121057, 5010042, 5010042]
  },
  params: {}
}))

function sum_main_element(party: Party) {
  const elements = new Map<Element, number>()

  for (let i = 0; i < 3; i++) {
    const union = party.union(i + 1)
    const unionData = [
      { type: 'main', bonus: 3 },
      { type: 'unison', bonus: 1 }
    ]

    for (const data of unionData) {
      const ele = (union as any)[data.type]?.element
      const count = elements.get(ele) || 0
      elements.set(ele, count + (i === 0 ? data.bonus * 2 : data.bonus))
    }
  }
  const info = Array.from(elements.entries()).reduce(
    (max, [ele, count]) => {
      return count > max.count ? { element: ele, count: count } : max
    },
    { element: Element.All, count: -1 }
  )
  return info.count >= 12 ? info.element : Element.All
}
</script>

<template>
  <div class="party-editor-container">
    <div style="height: 36px" />
    <v-card
      class="party-card elevation-4"
      :style="{ '--border-color': ele2color[sum_main_element(party.party)] }"
    >
      {{ party }}
      <PartyCardEliya :party="party" />
    </v-card>
    <div style="height: 18px" />
    <v-card
      style="display: grid; padding: 8px 0; width: 480px; grid-template-columns: repeat(3, 160px)"
    >
      <div style="display: flex; justify-content: center; align-items: center">
        <span>SW</span>
        <div class="skill-weight-bar" />
      </div>
      <div style="display: flex; justify-content: center; align-items: center">
        <span>SW</span>
        <div class="skill-weight-bar" />
      </div>
      <div style="display: flex; justify-content: center; align-items: center">
        <span>SW</span>
        <div class="skill-weight-bar" />
      </div>
    </v-card>
    <div class="masked-gradient"></div>
  </div>
</template>

<style scoped>
.party-card {
  box-sizing: content-box;
  width: min-content;
  border: var(--border-color) 3px solid;
  --border-color: #000;
}
.party-editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.skill-weight-bar {
  width: 120px;
  height: 24px;
  --percent: 60%; /* 百分比 */
  --fill-color: rgb(33, 194, 230);
  --bar-color: rgb(173, 170, 173);
  --step-width: 15px;
  --gap-width: 2px;
  --bar-start: 15px;
  --percent-fixed: calc(var(--bar-start) + (0.76 * var(--percent))); /* 百分比渲染修正 */
  background: linear-gradient(
      1rad,
      var(--fill-color) var(--percent-fixed),
      transparent var(--percent-fixed)
    ),
    var(--bar-color);
  --mask: linear-gradient(
    1rad,
    transparent 0,
    transparent calc(var(--gap-width) + var(--bar-start)),
    white calc(var(--gap-width) + var(--bar-start) + 1px),
    white calc(var(--gap-width) + var(--step-width) + var(--bar-start)),
    transparent calc(var(--gap-width) + var(--step-width) + var(--bar-start) + 1px),
    transparent calc(2 * var(--gap-width) + var(--step-width) + var(--bar-start)),
    white calc(2 * var(--gap-width) + var(--step-width) + var(--bar-start) + 1px),
    white calc(2 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start)),
    transparent calc(2 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(3 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start)),
    white calc(3 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start) + 1px),
    white calc(3 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start)),
    transparent calc(3 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(4 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start)),
    white calc(4 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start) + 1px),
    white calc(4 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start)),
    transparent calc(4 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(5 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start)),
    white calc(5 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start) + 1px),
    white calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start)),
    transparent calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(6 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start))
  );
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>
