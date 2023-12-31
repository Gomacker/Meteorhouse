<script setup lang="ts">
import CharacterWikiCardEditable from '@/components/worldflipper/character/CharacterWikiCardEditable.vue'
import { Character, Element, SpecialityType } from '@/anise/worldflipper/object'
import { reactive, ref } from 'vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'

const character = ref<Character>(new Character({
  "resource_id": "",
  "id": "",
  "names": [
    "阿尔克",
    "觅星少年",
    "アルク"
  ],
  "rarity": 0,
  "element": 0,
  "type": 0,
  "race": "Human",
  "gender": "Male",
  "status_data": "{\"1\": [\"53\", \"9\"], \"10\": [\"530\", \"96\"], \"80\": [\"3180\", \"576\"], \"100\": [\"3498\", \"633\"]}",
  "leader_ability": {
    "name": "通往星之路",
    "description": "编入队伍中的角色的属性每增加1种时，队伍全体攻击力 + 25%[最大 + 150%]"
  },
  "skill": {
    "name": "粉碎流星",
    "weight": 450,
    "description": "挥舞剑发出冲击波，对自身周围敌人造成火属性伤害(10x / 1hit)／赋予参战者攻击力提升(50% / 15s)效果"
  },
  "abilities": [
    "队伍全体攻击力 + 20%",
    "战斗开始时，自身技能槽 + 100%",
    "作为主要角色编成：自身发动技能时，自身攻击力 + 45%[最大 + 180%]",
    "自身技能槽最大值 + 15%",
    "队伍全体攻击力提升效果时间 + 10%",
    "自身发动技能时，队伍全体技能伤害 + 7.5%[最大 + 30%]"
  ],
  "cv": "逢坂良太",
  "description": "出现在“星见镇”的神秘少年。没有过去的记忆，也不清楚自己来自哪里。性格开朗，好奇心强。不知为何厨艺堪比专业厨师。",
  "obtain": "开局赠送",
  "tags": [
    "宇宙",
    "火",
    "充能",
    "参战攻刃"
  ],
  "server": "sc"
}))

const worldflipper = useWorldflipperDataStore()
// character.value = worldflipper.characters.get('1') || character.value

console.log(character.value)
</script>

<template>
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
    <span> This is a CardCreator Flag </span>
    <v-card style='border-radius: 12px'>
      <CharacterWikiCardEditable style='zoom: 80%' v-if='character' :obj="character" />
    </v-card>
  </div>
</template>

<style scoped></style>
