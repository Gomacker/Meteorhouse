<script setup lang="ts">
import type { PartyRelease } from '@/anise/worldflipper/party2'
import PartyReleaseBody, { type PartyStyle } from "@/components/card/party/PartyReleaseBody.vue"
import CopiableChip from '@/components/card/party/CopiableChip.vue'
import { computed, onMounted, ref } from 'vue'

const party = defineModel<PartyRelease>({ required: true })

defineProps<{
  partyStyle?: PartyStyle
}>()

const partyCode = ref<string>()
const updater = ref<string>()
const releaseId = computed(() => party.value.getId())

onMounted(() => {
  party.value.getCode().then((value) => (partyCode.value = value))
  party.value.getUpdater().then((value) => (updater.value = value))
})
</script>

<template>
  <v-card
    v-ripple
    class="elevation-6"
    style="
      min-width: 498px;
      width: 498px;
      border-radius: 8px;
      /*background: linear-gradient(*/
      /*  288deg,*/
      /*  #ffb6b9 0%,*/
      /*  #ffb6b9 35%,*/
      /*  #fae3d9 calc(35% + 1px),*/
      /*  #fae3d9 45%,*/
      /*  #bbded6 calc(45% + 1px),*/
      /*  #bbded6 65%,*/
      /*  #61c0bf calc(65% + 1px),*/
      /*  #61c0bf 100%*/
      /*);*/
    "
  >
    <div style="padding: 12px 8px 8px; background: transparent">
      <div style="display: flex; justify-content: space-between">
        <div>
          <span style="font-weight: bold; font-size: 18px">{{ party.getTitle() }}</span>
          <CopiableChip color="#f00" :value="partyCode || '未找到盘子码'" :enable="!!partyCode" />
          <CopiableChip v-if="releaseId" color="#333" :value="releaseId" :enable="!!releaseId" />
        </div>
      </div>
      <v-divider :thickness="2" style="margin-top: 2px" />
      <PartyReleaseBody :party-style="partyStyle" v-model="party"></PartyReleaseBody>
      <div style="display: flex; justify-content: space-between">
        <div style="color: gray">updater : {{ updater }}</div>
        <div>
          <v-btn-group style="height: 28px" variant="flat" density="compact">
            <v-btn :color="'#b531d9'" :disabled="true" style="color: #fff">
              ❤ {{ party.getLike() }}
            </v-btn>
            <v-btn variant="flat" color="warning" size="small">
              <v-icon icon="mdi-content-copy" />
            </v-btn>
          </v-btn-group>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped></style>
