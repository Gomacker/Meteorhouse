<script setup lang="ts">
import { ref } from 'vue'
import ToolboxModuleNotAvailable from '@/views/toolbox/modules/ToolboxModuleNotAvailable.vue'
import ToolboxModulePlayerSearcher from "@/views/toolbox/modules/ToolboxModulePlayerSearcher.vue";

enum Modules {
  PLAYER_SEARCHER,
  ROOM_SEARCHER,
  BOX_MANAGER,
}

const selected_module = ref<Modules>()
</script>

<template>
  <div>
    <v-tabs v-model="selected_module" bg-color="red-lighten-1" align-tabs="center">
      <v-tab :value="Modules.PLAYER_SEARCHER">玩家查询</v-tab>
      <v-tab :value="Modules.ROOM_SEARCHER">房间查询</v-tab>
      <v-tab :value="Modules.BOX_MANAGER">BOX管理</v-tab>
    </v-tabs>
    <v-window v-model="selected_module">
      <v-window-item :value="Modules.PLAYER_SEARCHER">
        <ToolboxModulePlayerSearcher />
      </v-window-item>
      <v-window-item :value="Modules.ROOM_SEARCHER">
        <ToolboxModuleNotAvailable />
      </v-window-item>
      <v-window-item :value="Modules.BOX_MANAGER">
        <ToolboxModuleNotAvailable />
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped></style>
