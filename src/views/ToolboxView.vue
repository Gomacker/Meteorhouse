<script setup lang="ts">
import { ref } from 'vue'
import ToolboxModuleNotAvailable from '@/views/toolbox/modules/ToolboxModuleNotAvailable.vue'
import ToolboxModulePlayerSearcher from "@/views/toolbox/modules/ToolboxModulePlayerSearcher.vue";
import ToolboxModulePartySearcher from "@/views/toolbox/modules/ToolboxModulePartySearcher.vue";

enum Modules {
  PLAYER_SEARCHER,
  ROOM_SEARCHER,
  PARTY_SEARCHER,
  PARTY_PUBLISH_TEST,
  BOX_MANAGER,
}

const selected_module = ref<Modules>()
</script>

<template>
  <div>
    <v-tabs v-model="selected_module" bg-color="red-lighten-1" align-tabs="center">
      <v-tab :value="Modules.PLAYER_SEARCHER">玩家查询</v-tab>
      <v-tab :value="Modules.PARTY_SEARCHER">队伍码查询</v-tab>
<!--      <v-tab :value="Modules.PARTY_PUBLISH_TEST">队伍码测试</v-tab>-->
      <v-tab :value="Modules.ROOM_SEARCHER">房间查询</v-tab>
      <v-tab :value="Modules.BOX_MANAGER">BOX管理</v-tab>
    </v-tabs>
    <v-window v-model="selected_module">
      <v-window-item :value="Modules.PLAYER_SEARCHER">
        <ToolboxModulePlayerSearcher />
      </v-window-item>
      <v-window-item :value="Modules.PARTY_SEARCHER">
        <ToolboxModulePartySearcher />
      </v-window-item>
<!--      <v-window-item :value="Modules.PARTY_PUBLISH_TEST">-->
<!--        <ToolboxModulePartyPublishTest />-->
<!--      </v-window-item>-->
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
