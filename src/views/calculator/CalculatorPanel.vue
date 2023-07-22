<script setup lang="ts">
import CharacterIcon from "@/components/worldflipper/character/CharacterIcon.vue";
import { Character, Element, Equipment, SpecialityType } from "@/anise/worldflipper/object";
import { reactive, ref } from "vue";
import { ele2color } from "@/stores/manager";
import EquipmentIcon from "@/components/worldflipper/equipment/EquipmentIcon.vue";
import type { WorldflipperObject } from "@/stores/worldflipper";

const props = defineProps<{
  characters: Map<string, Character>
  equipments: Map<string, Equipment>
  modelValue: Character | Equipment | null | undefined
}>()

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

const characters = ref(props.characters)
const equipments = ref(props.equipments)

// console.log(Object.fromEntries(characters.value.entries()));
// console.log(characters.value);

const updateValue = (obj: Character | Equipment | null | undefined) => {
  inputValue.value = obj
  emit('update:modelValue', inputValue.value)
}

function isSelected(obj: Character | Equipment | null | undefined) {
  return props.modelValue?.resource_id === obj?.resource_id
}

const type = ref<'Character' | 'Equipment'>('Character')

class Filter {
  text: string = ''
  element: Set<Element> = new Set<Element>()
  rarity: Set<number> = new Set<number>()
  type: Set<SpecialityType> = new Set<SpecialityType>()
  race: Array<string> = []

  constructor() {
    this.init()
  }

  init() {
    this.text = ''
    this.element = new Set([
      Element.All,
      Element.Fire,
      Element.Water,
      Element.Thunder,
      Element.Wind,
      Element.Light,
      Element.Dark
    ])
    this.rarity = new Set([1, 2, 3, 4, 5])
    this.type = new Set([
      SpecialityType.Knight,
      SpecialityType.Fighter,
      SpecialityType.Ranged,
      SpecialityType.Supporter,
      SpecialityType.Special
    ])
    this.race = [
      'Human',
      'Beast',
      'Mystery',
      'Element',
      'Dragon',
      'Machine',
      'Devil',
      'Plants',
      'Aquatic',
      'Untead'
    ]
  }

  filter(object: WorldflipperObject): boolean {
    if (object instanceof Character) {
      const text_filter = !this.text ||
        object.leader_ability.name.includes(this.text) ||
        object.leader_ability.description.includes(this.text) ||
        object.skill.name.includes(this.text) ||
        object.skill.description.includes(this.text) ||
        (object.abilities[0] && object.abilities[0].includes(this.text)) ||
        (object.abilities[1] && object.abilities[1].includes(this.text)) ||
        (object.abilities[2] && object.abilities[2].includes(this.text)) ||
        (object.abilities[3] && object.abilities[3].includes(this.text)) ||
        (object.abilities[4] && object.abilities[4].includes(this.text)) ||
        (object.abilities[5] && object.abilities[5].includes(this.text)) ||
        object.description.includes(this.text) ||
        object.obtain.includes(this.text)
      return text_filter
    } else
    if (object instanceof Equipment) {
      return true
    }else return false
  }

  sort(obj1: WorldflipperObject, obj2: WorldflipperObject): number {
    return obj1 && obj2 ? obj2.rarity - obj1.rarity : 0
  }
}

const filter = reactive(new Filter())
</script>

<template>
  <v-card
    :elevation="6"
    style="
      background: rgba(0 0 0 / 0.4);
      backdrop-filter: blur(2px);
      user-select: none;
      display: flex;
      flex-direction: column;
    "
  >
    <div>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div style="display: grid; grid-template-columns: repeat(2, auto); grid-gap: 8px">
        <v-btn :color="type === 'Character' ? 'primary' : 'white'" @click="type = 'Character'">
          角色
        </v-btn>
        <v-btn :color="type === 'Equipment' ? 'primary' : 'white'" @click="type = 'Equipment'">
          装备
        </v-btn>
      </div>
    </div>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, 90px);
        grid-template-rows: repeat(auto-fit, 90px);
        justify-content: center;
        overflow-y: scroll;
        border-radius: 4px;
      "
      class="wfo-list"
    >
      <template v-if="type === 'Character'">
        <CharacterIcon
          v-ripple
          class="wfo"
          v-for="c in [...characters.entries()].filter(value => filter.filter(value[1])).sort((a, b) => filter.sort(a[1], b[1]))"
          :class="isSelected(c[1]) ? ['selected'] : []"
          :key="c[0]"
          :obj="c[1]"
          :size="82"
          :style="{ '--element-color': ele2color[c[1].element] }"
          @click="isSelected(c[1]) ? updateValue(undefined) : updateValue(c[1])"
        />
      </template>
      <template v-if="type === 'Equipment'">
        <EquipmentIcon
          v-ripple
          class="wfo"
          v-for="e in [...equipments.entries()].filter(value => filter.filter(value[1])).sort((a, b) => filter.sort(a[1], b[1]))"
          :class="isSelected(e[1]) ? ['selected'] : []"
          :key="e[0]"
          :obj="e[1]"
          :size="82"
          :style="{ '--element-color': ele2color[e[1].element] }"
          @click="isSelected(e[1]) ? updateValue(undefined) : updateValue(e[1])"
        />
      </template>
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title ripple>
          <v-icon icon="mdi-filter" />
          筛选条件
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field label="搜索" v-model="filter.text" density="compact"/>
          <v-btn>aa</v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<style scoped>
.wfo {
  margin: 1px;
  padding: 3px;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  filter: none;
  box-shadow: none;
  transition: background-color 0.2s ease, scale 0.4s ease;
  --element-color: rgb(68, 68, 68);
}

.wfo:hover {
  z-index: 1;
  filter: drop-shadow(0 0 16px var(--element-color));
  scale: 1.025;
}

.wfo.selected {
  filter: drop-shadow(0 0 8px var(--element-color));
  background-color: rgba(52, 255, 201, 0.8);
}
.wfo-list {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  padding: 8px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(140, 140, 140, 0.25) 50%,
    transparent
  );
  border-radius: 12px 12px 0 0;
  margin: 8px;
}

.wfo-list::-webkit-scrollbar {
  background: rgba(255 255 255 / 0.1);
  width: 8px;
  border-radius: 4px;
  padding: 0 16px;
  margin: 2px;
}

.wfo-list::-webkit-scrollbar-thumb {
  background: rgba(0 0 0 / 0.4);
  border-radius: 4px;
}
.wfo-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0 0 0 / 0.6);
}
</style>
