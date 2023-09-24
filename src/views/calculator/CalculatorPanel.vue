<script setup lang="ts">
import EmptyIcon from '@/components/worldflipper/EmptyIcon.vue'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'
import EquipmentIcon from '@/components/worldflipper/equipment/EquipmentIcon.vue'
import { Character, Element, Equipment, SpecialityType } from '@/anise/worldflipper/object'
import { reactive, ref, watch } from 'vue'
import { ele2color, race2zh } from "@/stores/manager";
import type { WorldflipperObject } from '@/stores/worldflipper'
import type { PartyEditor } from '@/anise/worldflipper/party'
import { useDefer } from '@/utils'
import { useWorldflipperDataStore } from "@/stores/worldflipper";

const props = defineProps<{
  characters: Map<string, Character>
  equipments: Map<string, Equipment>
  modelValue: PartyEditor
}>()
defineEmits(['update:modelValue'])
const characters = ref(props.characters)
const equipments = ref(props.equipments)

watch(props, () => {
  characters.value = props.characters
  equipments.value = props.equipments
})

const updateValue = (obj: WorldflipperObject) => {
  props.modelValue.select(obj)
}

function isSelected(obj: WorldflipperObject) {
  return props.modelValue.selected_object === obj
}

const type = ref<'Character' | 'Equipment' | 'Filter'>('Character')

class Filter {
  text: string = ''
  element: Array<Element> = []
  rarity: Array<number> = []
  type: Array<SpecialityType> = []
  race: Array<string> = []
  defaults = {
    element: () => [
      Element.None,
      Element.Fire,
      Element.Water,
      Element.Thunder,
      Element.Wind,
      Element.Light,
      Element.Dark
    ],
    rarity: () => [1, 2, 3, 4, 5],
    type: () => [
      SpecialityType.Knight,
      SpecialityType.Fighter,
      SpecialityType.Ranged,
      SpecialityType.Supporter,
      SpecialityType.Special
    ],
    race: () => [
      'Human',
      'Beast',
      'Mystery',
      'Element',
      'Dragon',
      'Machine',
      'Devil',
      'Plants',
      'Aquatic',
      'Undead'
    ]
  }

  constructor() {
    this.init()
  }

  init() {
    this.text = ''
    this.element = this.defaults.element()
    this.rarity = this.defaults.rarity()
    this.type = this.defaults.type()
    this.race = this.defaults.race()
  }

  filter(object: WorldflipperObject): boolean {
    if (object instanceof Character) {
      const text_filter =
        !this.text ||
        object.id === this.text ||
        object.resource_id === this.text ||
        object.leader_ability.name.includes(this.text) ||
        object.leader_ability.description.includes(this.text) ||
        object.skill.name.includes(this.text) ||
        object.skill.description.includes(this.text) ||
        object.abilities.some((ability) => ability && ability.includes(this.text)) ||
        object.description.includes(this.text) ||
        object.obtain.includes(this.text)
      const element_filter = this.element.indexOf(object.element) > -1
      const race_filter = object.race.split(',').some((val) => this.race.includes(val))
      return [text_filter, element_filter, race_filter].every((value) => value)
    } else if (object instanceof Equipment) {
      const text_filter =
        !this.text ||
        object.id === this.text ||
        object.resource_id === this.text ||
        object.abilities.some((ability) => ability && ability.includes(this.text)) ||
        object.description.includes(this.text)
      const element_filter = this.element.indexOf(object.element) > -1
      return [text_filter, element_filter].every((value) => value)
    } else return false
  }

  sort(obj1: WorldflipperObject, obj2: WorldflipperObject): number {
    return obj1 && obj2 ? obj2.rarity * 100 - obj2.element - (obj1.rarity * 100 - obj1.element) : 0
  }
}

const filter = reactive(new Filter())
const worldflipper = useWorldflipperDataStore()

const touchStarted = ref(false)
</script>

<template>
  <div
    style="
      background: rgba(0 0 0 / 0.4);
      backdrop-filter: blur(2px);
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <div style="display: flex; justify-content: space-between">
      <div style="display: grid; grid-template-columns: repeat(3, auto); grid-gap: 8px">
        <v-btn :color="type === 'Character' ? 'primary' : 'white'" @click="type = 'Character'">
          角色
        </v-btn>
        <v-btn :color="type === 'Equipment' ? 'primary' : 'white'" @click="type = 'Equipment'">
          装备
        </v-btn>
        <v-btn :color="type === 'Filter' ? 'primary' : 'white'" @click="type = 'Filter'">
          筛选条件
        </v-btn>
      </div>
    </div>

    <div v-if="type === 'Filter'">

      <div style="margin: 4px">
        <span style="margin: 4px; display: inline-block; width: 50px">属性</span>
        <v-btn
          size="small"
          @click="
                filter.element.length === filter.defaults.element().length
                  ? (filter.element = [])
                  : (filter.element = filter.defaults.element())
              "
        >
          {{ filter.element.length !== filter.defaults.element().length ? '全部' : '清空' }}
        </v-btn>
        <v-btn-toggle
          color="light-blue-accent-1"
          v-model="filter.element"
          multiple=""
          style="margin-left: 8px; height: 28px"
        >
          <v-btn
            v-for="(ele, id_) in {
                  [Element.None]: 'none',
                  [Element.Fire]: 'fire',
                  [Element.Water]: 'water',
                  [Element.Thunder]: 'thunder',
                  [Element.Wind]: 'wind',
                  [Element.Light]: 'light',
                  [Element.Dark]: 'dark'
                }"
            size="small"
            :key="id_"
            :value="parseInt(String(id_))"
          >
            <img
              style="width: 16px; height: 16px; filter: drop-shadow(0 0 2px rgba(0 0 0 / 0.6))"
              :src="`/static/worldflipper/icon/${ele}.png`"
              alt=""
            />
          </v-btn>
        </v-btn-toggle>
      </div>
      <div style="margin: 4px">
        <span style="margin: 4px; display: inline-block; width: 50px">种族</span>
        <v-btn
          size="small"
          @click="
                filter.race.length === filter.defaults.race().length
                  ? (filter.race = [])
                  : (filter.race = filter.defaults.race())
              "
        >
          {{ filter.race.length !== filter.defaults.race().length ? '全部' : '清空' }}
        </v-btn>
        <v-btn-toggle
          color="light-blue-accent-1"
          v-model="filter.race"
          multiple=""
          style="margin-left: 8px; height: 28px"
        >
          <v-btn
            v-for="race in Object.keys(race2zh as object)"
            size="small"
            :key="race"
            :value="race"
          >
            {{ race2zh[race] }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
    <div
      v-else
      style="
        display: grid;
        max-width: 1280px;
        width: 100%;
        grid-template-columns: repeat(auto-fit, 90px);
        grid-template-rows: repeat(auto-fit, 90px);
        justify-content: center;
        overflow-y: scroll;
        border-radius: 4px;
      "
      class="wfo-list"
    >
      <EmptyIcon
        v-ripple
        class="wfo"
        :class="isSelected(null) ? ['selected'] : []"
        :size="82"
        :style="{ '--element-color': ele2color[Element.None] }"
        @click="isSelected(null) ? updateValue(undefined) : updateValue(null)"
      />
      <template v-if="type === 'Character'">
        <template
          v-for="c in [...characters.entries()]
            .filter((value) => filter.filter(value[1]))
            .filter((value) => worldflipper.mhMode ? true : value[1].server !== 'mh')
            .sort((a, b) => filter.sort(a[1], b[1]))"
          :key="c[0]"
        >
          <CharacterIcon
            v-ripple
            class="wfo"
            :class="isSelected(c[1]) ? ['selected'] : []"
            :obj="c[1]"
            :size="82"
            :style="{ '--element-color': ele2color[c[1].element] }"
            @touchstart="() => {
              // event.preventDefault()
              touchStarted = true
              isSelected(c[1]) ? updateValue(undefined) : updateValue(c[1])
            }"
            oncontextmenu="return false;"
            @click="() => {
              if (!touchStarted) isSelected(c[1]) ? updateValue(undefined) : updateValue(c[1])
              touchStarted = false
            }"
          />
        </template>
      </template>
      <template v-if="type === 'Equipment'">
        <EquipmentIcon
          v-ripple
          class="wfo"
          v-for="e in [...equipments.entries()]
            .filter((value) => filter.filter(value[1]))
            .sort((a, b) => filter.sort(a[1], b[1]))"
          :class="isSelected(e[1]) ? ['selected'] : []"
          :key="e[0]"
          :obj="e[1]"
          :size="82"
          :style="{ '--element-color': ele2color[e[1].element] }"
          @click="isSelected(e[1]) ? updateValue(undefined) : updateValue(e[1])"
        />
      </template>
    </div>
    <div style="width: 90%; max-width: 1280px">
      <v-text-field style="width: 100%" hide-details variant="solo-filled" label="搜索 - ID / 名称 / 能力内容" v-model="filter.text" density="compact" />
    </div>
  </div>
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
  scale: 1.1;
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
