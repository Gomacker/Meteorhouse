<script setup lang="ts">
import { PartyEditor, PartyRelease } from '@/anise/worldflipper/party'
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'

const user = useUserStore()

const props = defineProps<{ party_editor: PartyEditor }>()
function updateParty(partyRelease: PartyRelease) {
  partyRelease.dump()
}
const alerts = computed(() => {
  const list = []
  if (props.party_editor.getRepeats().size) {
    list.push('包含重复的角色')
  }
  return list
})
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <div style="height: 36px" />
    <PartyReleaseCard :party_release="party_editor.party" />
    <div style="height: 36px" />
    <div style="display: flex; justify-content: center">
      <v-card v-if="user.is_login()" class="elevation-6" style="width: 480px">
        <v-card-title style="font-weight: bold">上传(Legacy)</v-card-title>
        <v-card-item>
          <v-textarea v-model="party_editor.party.title" :rows="2" label="标题" maxlength="40" no-resize />
          <template v-if="alerts.length">
            <v-alert
              v-for="alert in alerts"
              type="warning"
              density="compact"
              style="margin-bottom: 16px"
            >
              {{ alert }}
            </v-alert>
          </template>
          <v-alert v-else type="success" density="compact" style="margin-bottom: 16px">
            队伍没有错误
            <div>{{ JSON.stringify(party_editor.party.dump()) }}</div>
          </v-alert>
          <v-btn color="blue" style="float: right" @click="updateParty(party_editor.party)"
            >上传</v-btn
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
