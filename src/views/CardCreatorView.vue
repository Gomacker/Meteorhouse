<script setup lang="ts">
import CharacterWikiCardEditable from "@/components/worldflipper/character/CharacterWikiCardEditable.vue"
import { Character, Element, SpecialityType } from "@/anise/worldflipper/object"
import { reactive, ref } from "vue"
import { useWorldflipperDataStore } from "@/stores/worldflipper"
import { useCardCreator } from "@/stores/worldflipper/cardCreator"

const worldflipper = useWorldflipperDataStore()
const cardCreator = useCardCreator()
if (!cardCreator.characters[0]) {
  cardCreator.characters[0] = {
    resource_id: "stella",
    id: "",
    names: ["阿尔克", "觅星少年", "アルク"],
    rarity: 0,
    element: 0,
    type: 0,
    race: "Human",
    gender: "Male",
    status_data: "[]",
    leader_ability: {
      name: "通往星之路",
      description: "编入队伍中的角色的属性每增加1种时，队伍全体攻击力 + 25%[最大 + 150%]",
    },
    skill: {
      name: "粉碎流星",
      weight: 450,
      description:
        "挥舞剑发出冲击波，对自身周围敌人造成火属性伤害(10x / 1hit)／赋予参战者攻击力提升(50% / 15s)效果",
    },
    abilities: [
      "队伍全体攻击力 + 20%",
      "战斗开始时，自身技能槽 + 100%",
      "作为主要角色编成：自身发动技能时，自身攻击力 + 45%[最大 + 180%]",
      "自身技能槽最大值 + 15%",
      "队伍全体攻击力提升效果时间 + 10%",
      "自身发动技能时，队伍全体技能伤害 + 7.5%[最大 + 30%]",
    ],
    cv: "逢坂良太",
    description:
      "出现在“星见镇”的神秘少年。没有过去的记忆，也不清楚自己来自哪里。性格开朗，好奇心强。不知为何厨艺堪比专业厨师。",
    obtain: "开局赠送",
    tags: ["宇宙", "火", "充能", "参战攻刃"],
    server: "sc",
  }
}
const character = ref<Character>(
  new Character(cardCreator.characters[0]),
)
const interval = setInterval(() => {
  cardCreator.characters[0] = character.value
}, 10000)
</script>

<template>
  <div
    style="
    height: 100%;
    width: 100%;
    background: #111;
    "
  >
    <div style="position:absolute; color: #0a0; font-size: 24px">
      {{ character }}
    </div>
    <div style="width: 100%; height: 100%; position:absolute; backdrop-filter: blur(2px)"></div>
    <div
      style="
      overflow: auto;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
    >
      <div v-if="false" style="display: flex">
        <v-btn>读取</v-btn>
        <v-btn>保存</v-btn>
      </div>
      <div v-if="false" style="display: flex; margin-top: 16px">
        <v-btn>属性</v-btn>
        <v-btn>白值曲线</v-btn>
      </div>
      <span v-if="false"> This is a CardCreator Flag </span>
      <v-card style="border-radius: 12px">
        <CharacterWikiCardEditable style="zoom: 80%" v-if="character" :obj="character" />
      </v-card>
    </div>
  </div>
</template>

<style scoped></style>
