<script setup lang="ts">
import { manager, PartyRelease } from '@/stores/manager'
import UnitWikiCard from '@/components/card/UnitWikiCard.vue'
import UnitLiteCard from '@/components/card/UnitLiteCard.vue'
import PartyCardEliya from '@/components/party/PartyCardEliya.vue'
import { ref } from 'vue'
import PartyCardWfwiki from '@/components/party/PartyCardWfwiki.vue'
import PartyCardOriginLarge from '@/components/party/PartyCardOriginLarge.vue'

const show_name_test = ref(false)
const awaken_test = ref(false)

const test_party = ref({
  party: {
    union1: [1, 10, 1, 2],
    union2: [111007, 4, 3, 4],
    union3: [121002, 6, 5, 6]
  }
})
</script>

<template>
  <div style="display: flex; flex-wrap: wrap">
    <div style="display: flex; color: green; flex-direction: column; width: 100%">
      <div>
        Loaded角色库：{{ manager.unit_data.size }} Loaded装备库：{{ manager.armament_data.size }}
        <!--        {{ manager.armament_data }}-->
        {{ test_party }}
      </div>
      <div>// TODO 记得写 replacements 的 hover 实现</div>
      <div>// TODO 组盘器研究下 dnd</div>
      <div>// TODO 低代码一图解决一下文字布局</div>
      <div style="color: red">
        // TODO 记得去做用户体验优化啊啊啊啊啊啊啊啊啊（昵称表和模糊算法）
      </div>
      <div>// TODO 写iframe页</div>
    </div>
    <div>
      <div>
        show name <el-switch v-model="show_name_test" /> awaken <el-switch v-model="awaken_test" />
        <el-button
          @click="
            () => {
              const unit_length = manager.unit_data.size
              const armament_length = manager.armament_data.size
              const ru = () =>
                Array.from(manager.unit_data.keys())[Math.round(Math.random() * unit_length)]
              const ra = () =>
                Array.from(manager.armament_data.keys())[
                  Math.round(Math.random() * armament_length)
                ]
              test_party = {
                party: {
                  union1: [ru(), ru(), ra(), ra()],
                  union2: [ru(), ru(), ra(), ra()],
                  union3: [ru(), ru(), ra(), ra()]
                }
              }
            }
          "
        >
          reactive test
        </el-button>
      </div>
      <div>
        <span style="font-weight: 600"> PartyCardEliya </span>
        <div
          style="
            border: 6px rgb(0, 255, 0) solid;
            border-radius: 6px;
            width: fit-content;
            height: fit-content;
          "
        >
          <PartyCardEliya
            :party="PartyRelease.loads(test_party)"
            :show_name="show_name_test"
            :show_awaken="awaken_test"
          ></PartyCardEliya>
        </div>
      </div>
      <div>
        <span style="font-weight: 600"> PartyCardWfwiki </span>
        <div
          style="
            border: 6px rgb(0, 255, 0) solid;
            border-radius: 6px;
            width: fit-content;
            height: fit-content;
          "
        >
          <PartyCardWfwiki
            :party="PartyRelease.loads(test_party)"
            :show_name="show_name_test"
            :show_awaken="awaken_test"
          ></PartyCardWfwiki>
        </div>
      </div>
      <div>
        <span style="font-weight: 600"> PartyCardOriginLarge </span>
        <div
          style="
            border: 6px rgb(0, 255, 0) solid;
            border-radius: 6px;
            width: fit-content;
            height: fit-content;
          "
        >
          <PartyCardOriginLarge
            :party="PartyRelease.loads(test_party)"
            :show_name="show_name_test"
            :show_awaken="awaken_test"
          ></PartyCardOriginLarge>
        </div>
      </div>
      <div>
        <span style="font-weight: 600"> PartyCardOriginSmall </span>
        <div
          style="
            border: 6px rgb(0, 255, 0) solid;
            border-radius: 6px;
            width: fit-content;
            height: fit-content;
          "
        >
          <!--          <PartyCardOriginLarge :party="PartyRelease.loads(test_party)" :show_name="show_name_test" :show_awaken="awaken_test"></PartyCardOriginLarge>-->
        </div>
      </div>
      <div>
        <span style="font-weight: 600"> PartyCardOriginPixel </span>
        <div
          style="
            border: 6px rgb(0, 255, 0) solid;
            border-radius: 6px;
            width: fit-content;
            height: fit-content;
          "
        >
          <!--          <PartyCardOriginLarge :party="PartyRelease.loads(test_party)" :show_name="show_name_test" :show_awaken="awaken_test"></PartyCardOriginLarge>-->
        </div>
      </div>
    </div>
    <div>
      <span style="font-weight: 600"> UnitWikiCard </span>

      <!--      {{ manager.unit_data }}-->
      <UnitWikiCard
        style="margin: 8px; zoom: 50%; box-shadow: 0 0 12px rgba(48, 48, 48, 0.65)"
        :unit="manager.unit_data.get(209)"
      />
    </div>
    <div>
      <span style="font-weight: 600"> UnitLiteCard </span>
      <UnitLiteCard
        style="margin: 8px; zoom: 100%; box-shadow: 0 0 12px rgba(48, 48, 48, 0.65)"
        :unit="manager.unit_data.get(209)"
      />
    </div>
    <!--    {{ manager.armament_data }}-->
  </div>
</template>
