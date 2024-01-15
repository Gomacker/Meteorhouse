<script setup lang="ts">

import type { PartyRelease } from "@/anise/worldflipper/party2"
import PartyReleaseBody from "@/components/card/party/PartyReleaseBody.vue"

const party = defineModel<PartyRelease>({ required: true })
</script>

<template>
  <v-card v-ripple class="elevation-6" style="min-width: 498px; width: 498px; border-radius: 8px">
    <div style="padding: 12px 8px 8px; background: transparent">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <span style="font-weight: bold; font-size:18px;">{{ party.getTitle() }}</span>
        </div>
      </div>
      <v-divider :thickness="2" />
      <PartyReleaseBody v-model="party"></PartyReleaseBody>
      <div style="display: flex; justify-content: space-between;">
        <div />
        <div>
          <v-btn-group style="height: 28px" variant="flat" density="compact">
            <v-btn :color="'#ffa9ff'" :disabled="true" style="color: #fff;">
              ❤ {{ party.getLike() }}
            </v-btn>
            <v-btn
              variant="flat"
              color="warning"
              size="small"
            >
              <v-icon icon="mdi-content-copy" />
            </v-btn>
          </v-btn-group>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>

</style>