<script lang="ts" setup>
import { ref } from 'vue'

const sidebar_hidden = ref(false)
</script>
<template>
  <div style="width: 100%; background: var(--color-background)">
    <el-header
      style="
        background: linear-gradient(to right, #fa8afa, rgba(0, 255, 128, 0.7));
        display: flex;
        z-index: 20;
        box-shadow: 0 0 10px rgba(0, 0, 0, 50%);
        border-radius: 0 0 8px 8px;
      "
    >
      <el-page-header
        title=" "
        @back="sidebar_hidden = !sidebar_hidden"
        style="display: flex; justify-content: center"
      >
        <template #icon>
          <div></div>
        </template>
        <template #content>
          <router-link
            style="color: #9a00a4; filter: drop-shadow(1px 1px 1px white); font-weight: 600"
            to="/"
          >
            流星屋图书馆
          </router-link>
        </template>
      </el-page-header>
      <div style="flex: 1" />
      <div style="display: flex; align-items: center; user-select: none; cursor: pointer">
        ©Copyright(2022-2023) Meteorhouse Library
      </div>
    </el-header>
    <div style="position: relative; width: 100%">
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>

<style scoped>
.bg-magic-circle {
  position: absolute;

  z-index: 0;
  animation: rotation 16s linear infinite;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 6%));
  user-select: none;
  right: -400px;
  bottom: -400px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fold-button {
  box-shadow: none;
  user-select: none;
  transition: box-shadow 0.2s ease;
  padding: 8px;
  border-radius: 8px;
  min-width: 60px;
  display: flex;
  align-items: center;
}

.fold-button:hover {
  box-shadow: 0 0 8px blue;
}

main {
  height: calc(100vh - 60px);
  width: 100%;
}
</style>
