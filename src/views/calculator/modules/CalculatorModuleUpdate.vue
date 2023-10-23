<script setup lang="ts">
import { PartyEditor, PartyRelease } from '@/anise/worldflipper/party'
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import axios from "axios";

const user = useUserStore()

const props = defineProps<{ partyEditor: PartyEditor }>()
async function updateParty(partyRelease: PartyRelease) {
  const r = await axios.post('/api/v1/party/upload/', partyRelease.dump(true))
  if (r.status === 200) {
    console.log(r.data);
  }
}
const alerts = computed(() => {
  const list = []
  if (props.partyEditor.getRepeats().size) {
    list.push('包含重复的角色')
  }
  return list
})
const p = computed(() => props.partyEditor.party)
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <div style="height: 36px" />
    <PartyReleaseCard :party_release="partyEditor.party" />
    <div style="height: 36px" />
    <div style="display: flex; justify-content: center">
      <v-card v-if="user.isLogin()" class="elevation-6" style="width: 480px">
        <v-card-title style="font-weight: bold">上传(Legacy)</v-card-title>
        <v-card-item>
          <v-textarea v-model="p.title" :rows="2" label="标题" maxlength="40" no-resize />
          <template v-if="alerts.length">
            <v-alert
              v-for="alert in alerts"
              :key="alert"
              type="warning"
              density="compact"
              style="margin-bottom: 16px"
            >
              {{ alert }}
            </v-alert>
          </template>
          <v-alert v-else type="success" density="compact" style="margin-bottom: 16px">
            队伍没有错误
          </v-alert>
          <v-btn :disabled="!!alerts.length" color="blue" style="float: right" @click="updateParty(partyEditor.party)"
            >
            上传
          </v-btn
          >
        </v-card-item>
      </v-card>
      <div v-else style="font-size: 24px; color: grey; text-align: center">
        <p><v-icon icon="mdi-package-variant" />This is a module for update</p>
        <p>Available in next or login for debug</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
