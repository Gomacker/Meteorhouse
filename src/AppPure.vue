<script lang="ts" setup>
import {Aim, Edit, Expand, Grid, InfoFilled, List, Search} from "@element-plus/icons-vue";
import {ref} from "vue";

const sidebar_hidden = ref(false)
</script>
<script lang="ts">

export default {
  data() {
    return {
      is_login: true,
      user_name: 'user_name',
      user_avatar: 'user_avatar',
      permissions: 'permissions'
    }
  }
}
</script>
<template>
  <div style="height: 100%;">
    <el-container>
      <el-header
          style="
            background: linear-gradient(to right, #95fa8a, yellow);
            display: flex;
            z-index: 20;
            box-shadow: 0 0 10px rgba(0, 0, 0, 50%);
            border-radius: 0 0 8px 8px;
        "
      >
        <el-page-header
            icon="" title=" "
            @back="sidebar_hidden = !sidebar_hidden"
            style="display: flex; justify-content: center;"
        >
          <template #content>
            <router-link style="color: #770080; font-weight: 500;" to="/">流星屋图书馆（Alpha）</router-link>
          </template>
        </el-page-header>
        <div style="flex: 1;"/>
        <div style="display: flex; align-items: center; user-select: none; cursor:pointer;">
          © Copyright __________ ?
        </div>
      </el-header>
      <el-container style="height: 100%;">
        <div style="width: fit-content; overflow: hidden;">
          <img
              class="bg-magic-circle"
              src="@/assets/bg_magic_circle.png"
              alt=""
              @dragstart.prevent
              style="z-index: -1;"
          />
          <router-view></router-view>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<style>
</style>

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
