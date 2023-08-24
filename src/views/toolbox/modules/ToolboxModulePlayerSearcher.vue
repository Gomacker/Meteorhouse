<script setup lang="ts">
import PlayerCard from '@/components/card/PlayerCard.vue'
import type { PlayerProfile } from '@/components/card/PlayerCard.vue'
import { ref } from 'vue'
import axios from 'axios'
import { Party, PartyRelease } from '@/anise/worldflipper/party'
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import { ele2color } from '@/stores/manager'
import { Element } from '@/anise/worldflipper/object'

const playerProfile = ref<PlayerProfile | undefined | null>()

const input = ref<string>('')

async function searchPlayer(player_id: string) {
  let player_data: any = await axios.post(
    '/api/v2/worldflipper/api/player',
    {},
    { params: { viewer_id: player_id } }
  )
  if (player_data.status === 200) {
    player_data = player_data.data
    console.log(player_data)
    if (player_data) {
      playerProfile.value = {
        player_id: player_data['search_result']['viewer_id'],
        rank: player_data['search_result']['rank'],
        name: player_data['search_result']['name'],
        comment: player_data['search_result']['comment'],
        leader_show_awaken: !!player_data['search_result']['leader_character_evolution_img_level'],
        leader_character_id: String(player_data['search_result']['leader_character_id']),
        last_login: player_data['search_result']['last_login_time'],
        degree_id: player_data['search_result']['degree_id'],
        party: Party.loadOrigin(player_data)
      }
    } else {
      playerProfile.value = null
    }
  }
}
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
            @keydown.enter="searchPlayer(input)"
          />
          <v-btn icon="mdi-magnify" style="margin-left: 8px" @click="searchPlayer(input)" />
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
          v-if="playerProfile"
        >
          <PlayerCard
            style="width: 520px; z-index: 1"
            :model-value="playerProfile as PlayerProfile"
          />
          <div
            v-ripple
            style="
              margin: 8px 0;
              padding: 4px;
              box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2);
              border-radius: 8px;
            "
          >
            <PartyCardEliya :party="playerProfile.party || PartyRelease.empty()" />
          </div>
          <v-divider
            :color="ele2color[playerProfile.party?.party?.union1.main?.element || Element.All].hex()"
            thickness="2"
            style="width: 95%"
          />
          <div style="margin: 8px 0; color: grey">
            Powered by <a href="https://meteorhouse.wiki/">Meteorhouse.wiki</a>
          </div>
        </v-card>
        <template v-else-if="playerProfile === null">
          <div style="margin-top: 32px; font-size: 24px; color: grey">
            <v-icon icon="mdi-package-variant" />
            玩家不存在
          </div>
        </template>
        <template v-else>
          <div style="margin-top: 32px; font-size: 24px; color: grey">
            <v-icon icon="mdi-package-variant" />
            搜索 9 位数玩家ID
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
