<script setup lang="ts">
import PartyCard from '@/components/party/eliya/PartyCardEliya.vue'
import Clipboard from 'clipboard'
import { ref } from 'vue'
import { PartyRelease } from '@/anise/worldflipper/party'

const props = defineProps({
  party_release: {
    type: PartyRelease,
    required: true,
    default: PartyRelease.empty()
  },
  event: {
    type: Boolean,
    required: false,
    default: false
  },
  eager: {
    type: Boolean,
    required: false
  },
  hideTools: {
    type: Boolean,
    required: false
  }
})

const id_copied = ref(false)
const party_copied = ref(false)

function copy_release_id(id_: string) {
  const cb = new Clipboard(`#copy-id-${id_}`, { text: (elem) => props.party_release.id || '' })
  cb.on('success', (e) => {
    id_copied.value = true
    cb.destroy()
  })
}

function copy_party(id_: string) {
  const cb = new Clipboard(`#copy-${id_}`, {
    text: (elem) => JSON.stringify(props.party_release.dump())
  })
  cb.on('success', (e) => {
    party_copied.value = true
    cb.destroy()
  })
}

const show_dialog = ref(false)
</script>

<template>
  <v-card v-ripple class="party-card elevation-6">
    <div style="padding: 12px 8px 8px; background: transparent">
      <div style="display: flex; justify-content: space-between">
        <div>
          <span style="font-weight: bold; font-size: 18px">{{ party_release.title }}</span>
          <v-chip
            v-ripple
            style="
              user-select: none;
              margin: 0 4px;
              height: 20px;
              color: white;
              flex-shrink: 0;
              cursor: default;
              vertical-align: text-bottom;
            "
            color="red"
            density="comfortable"
          >
            {{ party_release.partyCode?.length === 6 ? party_release.partyCode : '盘子码未解析' }}
          </v-chip>
          <v-snackbar
            v-model="id_copied"
            color="green-lighten-4"
            location="top"
            style="top: 72px"
            close-on-content-click
          >
            <v-icon icon="mdi-check-circle-outline" color="green" />
            已复制
          </v-snackbar>
          <v-chip
            v-ripple
            style="
              user-select: none;
              margin: 0 4px;
              height: 20px;
              color: white;
              flex-shrink: 0;
              background: dimgray;
              cursor: default;
              vertical-align: text-bottom;
            "
            v-if="party_release.id"
            density="comfortable"
            @click="copy_release_id(party_release.id || '')"
            :id="`copy-id-${party_release.id || ''}`"
          >
            {{ party_release.id }}
          </v-chip>
        </div>
        <div>
          <div v-if="hideTools" style="font-size: 12px">Powered by <a>Meteorhouse.wiki</a></div>
          <v-menu v-else open-delay="0" location="end" open-on-hover=''>
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="party-card-source-tag">
                <v-icon icon="mdi-magnify"></v-icon>
                <span>来源</span>
              </div>
            </template>
            <v-card style="padding: 16px">
              <p>Oops...</p>
              <p>还没有来源记录</p>
              <p style="color: lightgrey">上传id: {{ party_release.updater_id }}</p>
            </v-card>
          </v-menu>
        </div>
      </div>
      <v-divider :thickness="2" style="margin: 2px 0" />
      <PartyCard :eager="eager" :party="party_release"></PartyCard>
      <div v-if="!hideTools" style="display: flex; justify-content: space-between">
        <div>
          <v-dialog v-model="show_dialog" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="flat" color="blue" size="small"> 提交来源 </v-btn>
            </template>
            <v-card>
              <v-card-text> 好吧，确实在摸 </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <div>
          <v-btn-group style="height: 28px" variant="flat" density="compact">
            <v-btn disabled="" size="small" color="pink">❤ 0</v-btn>
            <v-menu open-on-click='' :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-btn disabled="" v-bind="props" size="small">
                  添加记录
                  <v-icon icon="mdi-chevron-down" />
                </v-btn>
              </template>
              <v-card>
                <v-card-text>aa</v-card-text>
              </v-card>
            </v-menu>
          </v-btn-group>
          <v-snackbar
            v-model="party_copied"
            color="green-lighten-4"
            location="top"
            style="top: 72px"
            close-on-content-click=''
          >
            <v-icon icon="mdi-check-circle-outline" color="green" />
            已复制
          </v-snackbar>
          <v-btn
            variant="flat"
            color="warning"
            size="small"
            :id="`copy-${party_release.id || ''}`"
            @click="copy_party(party_release.id || '')"
            style="margin: 0 2px"
          >
            <v-icon icon="mdi-content-copy" />
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.party-card {
  min-width: 498px;
  width: 498px;
}
.party-card-source-tag {
  background-color: rgb(253, 246, 236);
  padding: 4px;
  font-size: 12px;
  border-radius: 4px;
  width: 60px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
</style>
