<script setup lang="ts">
import { computed, ref } from 'vue'
import { Unit } from '@/stores/manager'
import { manager } from '@/stores/manager'
import { Character } from '@/anise/worldflipper/object'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'

interface GachaEventTest {
  id: string
  characters: Array<Character>
}

interface EventSet {
  time: number
  gacha_events: Array<GachaEventTest>
}
const gacha_list = ref<Array<GachaEventTest>>([])
const clist = computed(() => {
  const u = manager.unit_data.get(1)
  const alk = Character.from_legacy(u)
  return [alk, alk, alk]
})
gacha_list.value.push(
  {
    id: 'sc/00_tutorial_gacha',
    characters: clist.value
  },
  {
    id: 'tc/00_tutorial_gacha',
    characters: clist.value
  },
  {
    id: 'jp/00_tutorial_gacha',
    characters: clist.value
  }
)
</script>

<template>
  <div style="width: 1036px; background: #0f0">
    <div
      style="
        display: flex;
        background: #ffffff80;
        margin: 4px;
        border-radius: 16px;
        align-items: center;
      "
      v-for="e in gacha_list"
      :key="e"
    >
      <img
        style="height: 135px"
        :src="`/static/worldflipper/gacha_list_banner/${e.id}.png`"
        alt=""
      />
      <div
        style="
          display: grid;
          grid-gap: 4px;
          grid-template-columns: repeat(2, auto);
          background-color: #0000ff80;
          padding: 8px;
        "
      >
        <template v-if="manager.unit_data.size">
          <!--        {{ e.characters }}-->
          <template v-for="c in e.characters" :key="c">
            <!--          {{ c }}-->
            <CharacterIcon :character="c" :size="64" />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
