<script setup lang="ts">
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import { ele2color } from '@/stores/manager'
import { Element } from '@/anise/worldflipper/object'
import { Party, PartyEditor, PartyRelease, Union } from '@/anise/worldflipper/party'
import { computed, ref } from 'vue'
import PartyStatus from '@/views/calculator/modules/party/PartyStatus.vue'

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
        eager
      />
    </v-card>
    <v-card
      class="elevation-4"
      style="padding: 8px 0; border-top-left-radius: 0; border-top-right-radius: 0; width: 480px"
    >
      <div style="display: grid; grid-template-columns: repeat(3, 160px)">
        <PartyStatus
          :skill_weights="skill_weights[0]"
          :party_status="party_status[0]"
          style="display: grid; grid-gap: 8px"
        />
        <PartyStatus
          :skill_weights="skill_weights[1]"
          :party_status="party_status[1]"
          style="display: grid; grid-gap: 8px"
        />
        <PartyStatus
          :skill_weights="skill_weights[2]"
          :party_status="party_status[2]"
          style="display: grid; grid-gap: 8px"
        />
      </div>
    </v-card>
    <v-card style="overflow: visible; width: 480px; margin-top: 36px" class="elevation-4">
      <div style="display: grid; padding: 4px; grid-template-columns: repeat(3, 160px)">
        <div style="font-size: 7px">
          <div>
            <div style="font-weight: bold; font-size: 18px; height: 32px">
              <img :src="party.party.union(1)?.main?.res('pixelart/walk_front', 'gif')" alt="" />
              {{ party.party.union(1).main?.names[0] }}
            </div>
            <div>能力4</div>
            <div>能力5</div>
            <div>能力6</div>
          </div>
          <div>
            <div style="font-weight: bold; font-size: 18px; height: 32px">
              <img :src="party.party.union(1)?.unison?.res('pixelart/walk_front', 'gif')" alt="" />
              {{ party.party.union(1).unison?.names[0] }}
            </div>
            <div>能力4</div>
            <div>能力5</div>
            <div>能力6</div>
          </div>
        </div>
        <div style="font-size: 7px">
          <div>
            <div style="height: 24px; display: flex">
              <div style="margin-top: -8px; width: 32px">
                <img :src="party.party.union(2)?.main?.res('pixelart/walk_front', 'gif')" alt="" />
              </div>
              <div style="font-weight: bold; font-size: 18px">
                {{ party.party.union(2).main?.names[0] }}
              </div>
            </div>
            <div>能力4</div>
            <div>能力5</div>
            <div>能力6</div>
          </div>
          <div>
            <div style="font-weight: bold; font-size: 18px; height: 32px">
              <img :src="party.party.union(2)?.unison?.res('pixelart/walk_front', 'gif')" alt="" />
              {{ party.party.union(2).unison?.names[0] }}
            </div>
            <div>能力4</div>
            <div>能力5</div>
            <div>能力6</div>
          </div>
        </div>
        <div style="font-size: 7px">
          <div>
            <div style="font-weight: bold; font-size: 18px; height: 32px">
              <div style="height: 24px; overflow: visible; display: inline">
                <img :src="party.party.union(3)?.main?.res('pixelart/walk_front', 'gif')" alt="" />
              </div>
              {{ party.party.union(3).main?.names[0] }}
            </div>
            <div>能力4</div>
            <div>能力5</div>
            <div>能力6</div>
          </div>
          <div>
            <div style="font-weight: bold; font-size: 18px; height: 32px">
              <img :src="party.party.union(3)?.unison?.res('pixelart/walk_front', 'gif')" alt="" />
              {{ party.party.union(3).unison?.names[0] }}
            </div>
            <div>能力4</div>
            <div>能力5</div>
            <div>能力6</div>
          </div>
        </div>
      </div>
    </v-card>
    <v-card color="warning" style="width: 480px; margin-top: 36px" class="elevation-4">
      <v-card-item>
        <v-textarea
          style="margin-top: 8px"
          label="Debug Object"
          variant="outlined"
          :model-value="JSON.stringify(party.dump())"
          hide-details
        />
      </v-card-item>
    </v-card>
    <div style="margin-top: 60vh; margin-bottom: 32px; color: grey">
      ©Copyright(2022-2023) Meteorhouse Library
    </div>
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
</style>
