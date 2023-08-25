<script setup lang="ts">
import PlayerCard from '@/components/card/PlayerCard.vue'
import type { PlayerProfile } from '@/components/card/PlayerCard.vue'
import { ref } from 'vue'
import axios from 'axios'
import { Party, PartyRelease } from '@/anise/worldflipper/party'
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import { ele2color } from '@/stores/manager'
import { Element } from '@/anise/worldflipper/object'

function parsePartyFromOrigin2(data: any) {}
const input = ref<string>('')

async function publishParty(party: PartyRelease) {
  let response: any = await axios.post(
    '/api/v2/worldflipper/api/party/publish',
    {party: party}
  )
  if (response.status === 200) {
  }
}

const party = ref<PartyRelease | undefined | null>(
  PartyRelease.load({
    "party": {
      "union1": [
        131014,
        331002,
        5020025,
        5020009
      ],
      "union2": [
        331011,
        231002,
        5030021,
        5090014
      ],
      "union3": [
        131026,
        233007,
        5090014,
        5090014
      ]
    },
    "params": {}
  })
)

const partyCode = ref<string | undefined | null>()
</script>

<template>
  <div style="display: flex; align-items: center; flex-direction: column">
    <div style="max-width: 720px; min-width: 480px; width: 100%; padding: 32px">
      <v-card
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          background: rgba(255 255 255 / 0.8);
        "
      >
        <PartyCardEliya v-if="party" :party="party as PartyRelease" />
      </v-card>
      <v-btn color="black">Test</v-btn>
      <div style="display: flex; justify-content: center">
        <v-card
          class="elevation-6"
          style="
            /*padding: 16px;*/
            border-radius: 12px;
            margin-top: 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
          v-if="partyCode"
        >
          {{ partyCode }}
          <v-divider
            :color="
              ele2color[party?.party?.union1.main?.element || Element.All].hex()
            "
            thickness="2"
            style="width: 95%"
          />
          <div style="margin: 8px 0; color: grey">
            Powered by <a href="https://meteorhouse.wiki/">Meteorhouse.wiki</a>
          </div>
        </v-card>
        <template v-else-if="partyCode === null">
          <div style="margin-top: 32px; font-size: 24px; color: grey">
            <v-icon icon="mdi-package-variant" />
            队伍不存在
          </div>
        </template>
        <template v-else>
          <div style="margin-top: 32px; font-size: 24px; color: grey">
            <v-icon icon="mdi-package-variant" />
            尝试上传
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
