<script setup lang="ts">
import type { PlayerProfile } from '@/components/card/PlayerCard.vue'
import { ref } from 'vue'
import type { PartyRelease } from '@/anise/worldflipper/party'
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import { ele2color } from '@/stores/manager'
import { Element } from '@/anise/worldflipper/object'
import { apiService } from "@/utils";

const input = ref<string>('')

async function searchParty(party_id: string) {
  party.value = await apiService.searchParty(party_id) || null
}

const debug_data = ref()
const party = ref<PartyRelease | undefined | null>()
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
        <div style="display: flex; align-items: center; width: 100%">
          <v-text-field
            hide-details
            style="width: 80%"
            v-model="input"
            @keydown.enter="searchParty(input)"
          />
          <v-btn icon="mdi-magnify" style="margin-left: 8px" @click="searchParty(input)" />
        </div>
      </v-card>
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
          v-if="party"
        >
          {{ debug_data }}
          <PartyCardEliya :party="party" />
          <v-divider
            :color="
              ele2color[party.party?.union1.main?.element || Element.All].hex()
            "
            thickness="2"
            style="width: 95%"
          />
          <div style="margin: 8px 0; color: grey">
            Powered by <a href="https://meteorhouse.wiki/">Meteorhouse.wiki</a>
          </div>
        </v-card>
        <template v-else-if="party === null">
          <div style="margin-top: 32px; font-size: 24px; color: grey">
            <v-icon icon="mdi-package-variant" />
            队伍不存在
          </div>
        </template>
        <template v-else>
          <div style="margin-top: 32px; font-size: 24px; color: grey">
            <v-icon icon="mdi-package-variant" />
            搜索 6 位数队伍ID
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
