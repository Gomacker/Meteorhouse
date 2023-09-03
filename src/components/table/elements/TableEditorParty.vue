<script setup lang="ts">
import { ref } from 'vue'
import type { TableElementParty } from '@/components/table/elements/WorldflipperElements'
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'

defineProps<{ element: TableElementParty }>()

const menuOpen = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <v-menu v-model="menuOpen" location="center">
      <template v-slot:activator="{ props }">
        <v-btn
          :color="menuOpen ? 'red' : 'blue'"
          v-bind="props"
          prepend-icon="mdi-magnify"
        >
          预览
        </v-btn>
        <v-textarea
          style="width: 100%"
          :model-value="(() => {
            try{
              return JSON.stringify(JSON.parse(element._party), null, 2)
            }catch (e) {
              return element._party
            }
          })()"
          @input="(e: InputEvent) => {
            element.setPartyFromJson(e.target?.['_value'])
          }"
        >
        </v-textarea>
      </template>
      <v-card>
        <PartyCardEliya :party="element.party" />
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped></style>
