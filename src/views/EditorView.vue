<template>
  <div style="display: flex; align-items: center;">
    <div style="display: flex; justify-content: center; flex-wrap: wrap; align-items: flex-start">
      <el-card class="editor-select" @click="$router.push('/editor/character')">
        <p style="font-size: 28px; font-weight: 600">角色</p>
        <p>0 个角色</p>
        <p>已加载 {{ manager.unit_data.size }} 个角色</p>
      </el-card>
      <el-card class="editor-select" @click="$router.push('/editor/equipment')">
        <p style="font-size: 28px; font-weight: 600">装备</p>
        <p>0 个装备</p>
        <p>已加载 {{ manager.armament_data.size }} 个装备</p>
      </el-card>
      <el-card class="editor-select">
        <p style="font-size: 28px; font-weight: 600">盘子</p>
        <p>0 个盘子</p>
      </el-card>
      <el-card class="editor-select" @click="$router.push('/editor/table')">
        <p style="font-size: 28px; font-weight: 600">一图流</p>
        <p>0 个一图流</p>
      </el-card>
      <el-card class="editor-select"> 账号绑定</el-card>
      <el-card class="editor-select"> 审核</el-card>
      <el-card class="editor-select">
        <p style="font-size: 28px; font-weight: 600">昵称表</p>
        <p>0 个昵称表</p>
      </el-card>
      <el-card class="editor-select"> 查询表</el-card>
      <el-card class="editor-select"> 副本</el-card>
      <el-card class="editor-select"> 事件</el-card>
      <el-card class="editor-select"> 资源</el-card>
      <el-card class="editor-select">
        <p style="">Bot</p>
        <p>0 个Bot</p>
      </el-card>
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
}
.editor-select:first-line {
  font-size: 28px;
  font-weight: 600;
}
</style>
