<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div style="display: grid; grid-template-columns: repeat(4, auto)">
      <v-card class="editor-select active" @click="$router.push('/editor/character')">
        <p style="font-size: 28px; font-weight: 600">角色</p>
        <p>已加载 {{ manager.unit_data.size }} 个角色</p>
      </v-card>
      <v-card style="" class="editor-select active" @click="$router.push('/editor/equipment')">
        <p style="font-size: 28px; font-weight: 600">装备</p>
        <p>已加载 {{ manager.armament_data.size }} 个装备</p>
      </v-card>
      <v-card class="editor-select">
        <p style="font-size: 28px; font-weight: 600">盘子</p>
        <p>0 个盘子</p>
      </v-card>
      <v-card class="editor-select active" @click="$router.push('/editor/table')">
        <p style="font-size: 28px; font-weight: 600">一图流</p>
        <p>0 个一图流</p>
      </v-card>
      <v-card class="editor-select"> 账号绑定</v-card>
      <v-card class="editor-select active" @click="$router.push('/editor/request')"> 审核 </v-card>
      <v-card class="editor-select active" @click="$router.push('/editor/nickname')">
        <p style="font-size: 28px; font-weight: 600">昵称表</p>
        <p>0 个昵称表</p>
      </v-card>
      <v-card class="editor-select"> 查询表</v-card>
      <v-card class="editor-select"> 副本</v-card>
      <v-card class="editor-select active" @click="$router.push('/editor/event')"> 事件</v-card>
      <v-card class="editor-select"> 资源</v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { manager } from '@/stores/manager'

export default {
  name: 'EditorView',
  computed: {
    manager() {
      return manager
    }
  }
}
</script>

<style scoped>
.editor-select {
  border-radius: 16px;
  margin: 4px;
  width: 200px;
  padding: 20px;
  transition: scale 0.4s ease;
  cursor: pointer;
  user-select: none;
}
.editor-select:first-line {
  font-size: 28px;
  font-weight: 600;
}
.editor-select.active {
  background: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
}
.editor-select.active:hover {
  scale: 1.05;
}
</style>
