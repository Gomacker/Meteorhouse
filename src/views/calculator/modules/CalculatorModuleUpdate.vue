<script setup lang="ts">
import { PartyEditor } from '@/anise/worldflipper/party'
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'

defineProps<{ party_editor: PartyEditor }>()
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <div style="height: 36px"/>
    <PartyReleaseCard :party_release="party_editor.party" />
    <div style="display: flex; justify-content: center">
      <div style="margin-top: 32px; font-size: 24px; color: grey">
        <v-icon icon="mdi-package-variant" />
        This is a module for update
      </div>
    </div>
  </div>
</template>

<style scoped></style>
