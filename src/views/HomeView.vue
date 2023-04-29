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
  <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center">
    <div>
      <div>
        show name
        <el-switch v-model="show_name_test" />
        awaken
        <el-switch v-model="awaken_test" />
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
        <span style="font-weight: 600">PartyCardEliya</span>
        <div
          style="
            border: 6px rgb(0, 255, 0) solid;
            background: white;
            border-radius: 6px;
            width: fit-content;
            height: fit-content;
          "
        >
          <PartyCardEliya
            :party="PartyRelease.loads(test_party)"
            :show_name="show_name_test"
            :show_awaken="awaken_test"
          />
        </div>
      </div>
    </div>
  </div>
</template>
