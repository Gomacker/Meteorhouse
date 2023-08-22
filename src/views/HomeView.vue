<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import CharacterWikiCard from '@/components/worldflipper/character/CharacterWikiCard.vue'
import type { Character } from '@/anise/worldflipper/object'

const show_mainpage = ref([0])

const worldflipper = useWorldflipperDataStore()
const router = useRouter()
</script>

<template>
  <div
    style="
      overflow: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    "
  >
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, 180px);
        justify-content: center;
        margin: 8px;
        grid-gap: 16px;
      "
    >
      <v-card elevation="6" @click="router.push('/partyEditor')" class="main-page-button">
        <p style="font-size: 18px">组盘器</p>
        <p><v-icon size="42" icon="mdi-calculator" /></p>
      </v-card>
      <v-card elevation="6" @click="router.push('/partySearcher')" class="main-page-button">
        <p style="font-size: 18px">查盘器</p>
        <p><v-icon size="42" icon="mdi-magnify" /></p>
      </v-card>
      <v-card elevation="6" @click="router.push('/table')" class="main-page-button">
        <p style="font-size: 18px">一图流</p>
        <p><v-icon size="42" icon="mdi-table" /></p>
      </v-card>
      <a href="https://github.com/Gomacker/Anisebot" target="_blank">
        <v-card v-ripple elevation="6" class="main-page-button">
          <p style="font-size: 18px">Bot</p>
          <p><v-icon size="42" icon="mdi-github" /></p>
        </v-card>
      </a>
    </div>
  </div>
</template>

<style scoped>
.main-page-button {
  user-select: none;
  background: rgba(0 0 0 / 0.35);
  backdrop-filter: blur(4px);
  color: black;
  padding: 16px;
}
</style>
