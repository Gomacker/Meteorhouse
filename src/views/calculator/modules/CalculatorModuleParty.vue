<script setup lang="ts">
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import { ele2color } from '@/stores/manager'
import { Element } from '@/anise/worldflipper/object'
import { Party, PartyEditor, PartyRelease, Union } from '@/anise/worldflipper/party'
import { computed, ref } from 'vue'

const props = defineProps<{ party: PartyRelease; party_editor?: PartyEditor }>()

function sum_main_element(party: Party) {
  const elements = new Map<Element, number>()

  for (let i = 0; i < 3; i++) {
    const union = party.union(i + 1)
    const unionData = [
      { type: 'main', bonus: 3 },
      { type: 'unison', bonus: 2 }
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
  return info.count >= 11 ? info.element : Element.All
}

function calc_average_skill_weight(union: Union) {
  const main = union.main
  const unison = union.unison
  if (!main && !unison) return 0
  else if (main && !unison) return main.skill.weight
  else if (!main && unison) return unison.skill.weight
  else if (main && unison) return (main.skill.weight + unison.skill.weight) / 2
}

const skill_weights = computed(() => [
  calc_average_skill_weight(props.party.party.union1),
  calc_average_skill_weight(props.party.party.union2),
  calc_average_skill_weight(props.party.party.union3)
])
function calc_union_status(union: Union): [number, number] {
  const [mainMhp, mainAtk] = union.main?.get_status(100) || [0, 0]
  const [unisonMhp, unisonAtk] = union.unison?.get_status(100) || [0, 0]
  let [equipmentMhp, equipmentAtk] = JSON.parse(union.equipment?.status_data || '[0,0]').map(Number)
  return [
    Math.floor(mainMhp + 0.25 * unisonMhp + equipmentMhp),
    Math.floor(mainAtk + 0.25 * unisonAtk + equipmentAtk)
  ]
}
const party_status = computed(() => [
  calc_union_status(props.party.party.union1),
  calc_union_status(props.party.party.union2),
  calc_union_status(props.party.party.union3)
])

const show_name = ref(false)
const show_awaken = ref(false)
</script>

<template>
  <div class="party-editor-container">
    <!--    <div style="height: 36px" />-->
    <div style="display: flex">
      <v-switch v-model="show_name" density="compact" hide-details label="显示名称" />
      <v-switch
        v-model="show_awaken"
        density="compact"
        hide-details
        label="显示觉醒"
        style="margin-left: 24px"
      />
    </div>
    <v-card
      class="party-card elevation-4"
      :style="{ '--border-color': ele2color[sum_main_element(party.party)] }"
    >
      <PartyCardEliya
        :party="party"
        :party_editor="party_editor"
        :show_name="show_name"
        :show_awaken="show_awaken"
      />
    </v-card>
    <v-card
      class="elevation-4"
      style="padding: 8px 0; border-top-left-radius: 0; border-top-right-radius: 0; width: 480px"
    >
      <div style="display: grid; grid-gap: 8px">
        <div style="display: grid; grid-template-columns: repeat(3, 160px)">
          <div class="extra-info">
            <div class="extra-info-tag">HP</div>
            <span>{{ party_status[0][0] }}</span>
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">HP</div>
            <span>{{ party_status[1][0] }}</span>
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">HP</div>
            <span>{{ party_status[2][0] }}</span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 160px)">
          <div class="extra-info">
            <div class="extra-info-tag">攻击</div>
            <span>{{ party_status[0][1] }}</span>
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">攻击</div>
            <span>{{ party_status[1][1] }}</span>
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">攻击</div>
            <span>{{ party_status[2][1] }}</span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 160px)">
          <div class="extra-info">
            <div class="extra-info-tag">能量</div>
            <div
              class="skill-weight-bar"
              :style="{
                '--percent': `${((skill_weights[0] - 200) / (700 - 200)) * 100}%`
              }"
              style="text-align: right; padding-right: 10px"
            />
            <div class="skill-weight-bar-text">
              {{ skill_weights[0] }}
            </div>
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">能量</div>
            <div
              class="skill-weight-bar"
              :style="{
                '--percent': `${((skill_weights[1] - 200) / (700 - 200)) * 100}%`
              }"
            />
            <div class="skill-weight-bar-text">
              {{ skill_weights[1] }}
            </div>
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">能量</div>
            <div
              class="skill-weight-bar"
              :style="{
                '--percent': `${((skill_weights[2] - 200) / (700 - 200)) * 100}%`
              }"
            />
            <div class="skill-weight-bar-text">
              {{ skill_weights[2] }}
            </div>
          </div>
        </div>
        <div v-if="false" style="display: grid; grid-template-columns: repeat(3, 160px)">
          <div class="extra-info">
            <div class="extra-info-tag">0%</div>
            <div
              class="skill-gauge-bar"
              :style="{
                '--percent': `0%`
              }"
            />
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">0%</div>
            <div
              class="skill-gauge-bar"
              :style="{
                '--percent': `0%`
              }"
            />
          </div>
          <div class="extra-info">
            <div class="extra-info-tag">0%</div>
            <div
              class="skill-gauge-bar"
              :style="{
                '--percent': `50%`
              }"
            />
          </div>
        </div>
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
  transition: border 0.3s ease;
  --border-color: #000;
}
.party-editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.extra-info-tag {
  --fill-color: rgb(222, 223, 222);
  height: 20px;
  width: 48px;
  font-size: 10px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  background: linear-gradient(1rad, var(--fill-color) 0, var(--fill-color) 80%, transparent 80%);
}
.skill-weight-bar {
  width: 112px;
  height: 20px;
  --percent: 0%; /* 百分比 */
  --fill-color: rgb(33, 194, 230);
  --bar-color: rgb(173, 170, 173);
  --step-width: 15px;
  --gap-width: 2px;
  --bar-start: 8px;
  --percent-fixed: calc(var(--bar-start) + (0.825 * var(--percent))); /* 百分比渲染修正 */
  margin-left: calc(-1 * var(--bar-start));
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
.skill-gauge-bar {
  width: 112px;
  height: 20px;
  --percent: 0%; /* 百分比 */
  --fill-color: rgb(255, 158, 25);
  --bar-color: rgb(173, 170, 173);
  --step-width: 15px;
  --gap-width: 2px;
  --bar-start: 8px;
  --percent-fixed: calc(var(--bar-start) + (0.825 * var(--percent))); /* 百分比渲染修正 */
  margin-left: calc(-1 * var(--bar-start));
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
    white calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start)),
    transparent calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(6 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start))
  );
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
.extra-info > span {
  padding-right: 15px;
}
.extra-info {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding: 0 5px;
}

.skill-weight-bar-text {
  position: absolute;
  background-clip: text;
  -webkit-background-clip: text;
  right: 20px;
  -webkit-text-fill-color: black;
  --text-stroke-width: 0.25em;
  -webkit-text-stroke: var(--text-stroke-width) transparent;
  background-color: white;
  padding: var(--text-stroke-width);
  margin: calc(-1 * var(--text-stroke-width));
}
</style>
