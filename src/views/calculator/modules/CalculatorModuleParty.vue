<script setup lang="ts">
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import { ele2color } from '@/stores/manager'
import { Element } from '@/anise/worldflipper/object'
import { Party, PartyEditor, PartyPosition, PartyRelease, Union } from '@/anise/worldflipper/party'
import { computed, ref } from 'vue'
import PartyStatus from '@/views/calculator/modules/party/PartyStatus.vue'
import PartyManaboard2Editor from '@/views/calculator/modules/party/PartyManaboard2Editor.vue'
import PartyExEditor from '@/views/calculator/modules/party/PartyExEditor.vue'

const props = defineProps<{ partyEditor: PartyEditor }>()

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
    { element: Element.None, count: -1 }
  )
  return info.count >= 11 ? info.element : Element.None
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
  calc_average_skill_weight(props.partyEditor.party.party.union1),
  calc_average_skill_weight(props.partyEditor.party.party.union2),
  calc_average_skill_weight(props.partyEditor.party.party.union3)
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
  calc_union_status(props.partyEditor.party.party.union1),
  calc_union_status(props.partyEditor.party.party.union2),
  calc_union_status(props.partyEditor.party.party.union3)
])

const show_name = ref(false)
const show_awaken = ref(false)

function make_position(unionIndex: number, positionIndex: number) {
  return new PartyPosition(unionIndex, positionIndex)
}
</script>

<template>
  <div class="party-editor-container">
    <div style="display: flex; margin: 5px 0 1px">
      <v-switch v-model="show_name" density="compact" hide-details label="显示名称" />
      <v-switch
        v-model="show_awaken"
        density="compact"
        hide-details
        label="显示觉醒"
        style="margin-left: 24px"
      />
      <v-btn color="error" @click="partyEditor.init()" style="margin-left: 24px">清空</v-btn>
    </div>
    <v-card
      class="party-card elevation-4"
      :style="{ '--border-color': ele2color[sum_main_element(partyEditor.party.party)] }"
    >
      <PartyCardEliya
        :party="partyEditor.party"
        :party_editor="partyEditor"
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
      <div style="display: grid; padding: 4px; grid-template-columns: repeat(3, 158px)">
        <div>
          <PartyManaboard2Editor
            class="manaboard2-editor-single"
            :party-editor="partyEditor"
            :position="make_position(1, 0)"
          />
          <PartyManaboard2Editor
            class="manaboard2-editor-single"
            style="margin-top: 4px"
            :party-editor="partyEditor"
            :position="make_position(1, 1)"
          />
        </div>
        <div>
          <PartyManaboard2Editor
            class="manaboard2-editor-single"
            :party-editor="partyEditor"
            :position="make_position(2, 0)"
          />
          <PartyManaboard2Editor
            class="manaboard2-editor-single"
            style="margin-top: 4px"
            :party-editor="partyEditor"
            :position="make_position(2, 1)"
          />
        </div>
        <div>
          <PartyManaboard2Editor
            class="manaboard2-editor-single"
            :party-editor="partyEditor"
            :position="make_position(3, 0)"
          />
          <PartyManaboard2Editor
            class="manaboard2-editor-single"
            style="margin-top: 4px"
            :party-editor="partyEditor"
            :position="make_position(3, 1)"
          />
        </div>
      </div>
    </v-card>
    <v-card style="overflow: visible; width: 480px; margin-top: 36px" class="elevation-4">
      <div style="display: grid; padding: 4px; grid-template-columns: repeat(3, 158px)">
        <div>
          <PartyExEditor
            class="manaboard2-editor-single"
            :party-editor="partyEditor"
            :position="make_position(1, 0)"
          />
          <PartyExEditor
            class="manaboard2-editor-single"
            style="margin-top: 4px"
            :party-editor="partyEditor"
            :position="make_position(1, 1)"
          />
        </div>
        <div>
          <PartyExEditor
            class="manaboard2-editor-single"
            :party-editor="partyEditor"
            :position="make_position(2, 0)"
          />
          <PartyExEditor
            class="manaboard2-editor-single"
            style="margin-top: 4px"
            :party-editor="partyEditor"
            :position="make_position(2, 1)"
          />
        </div>
        <div>
          <PartyExEditor
            class="manaboard2-editor-single"
            :party-editor="partyEditor"
            :position="make_position(3, 0)"
          />
          <PartyExEditor
            class="manaboard2-editor-single"
            style="margin-top: 4px"
            :party-editor="partyEditor"
            :position="make_position(3, 1)"
          />
        </div>
      </div>
    </v-card>
    <v-card color="warning" style="width: 480px; margin-top: 36px" class="elevation-4">
      <v-card-item>
        <v-textarea
          style="margin-top: 8px"
          label="Debug Object"
          variant="outlined"
          :model-value="JSON.stringify(partyEditor.party.dump())"
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

.manaboard2-editor-single {
  height: 106px;
}
</style>
