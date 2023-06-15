<script lang="ts" setup>
import { Edit, Expand, Grid, InfoFilled, List, Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

const sidebar_hidden = ref(false)
const user = useUserStore()

onMounted(() => {
  if (!user.token) axios.post('/api/v1/token_get/').then((r) => (user.token = r.data['token']))
  axios
    .post('/api/v1/token_login/', null, {
      headers: {
        token: user.token
      }
    })
    .then((r) => {
      if (r.data['username'] && user.token) {
        user.login('username', user.token)
      }
    })
})
</script>
<template>
  <div style="width: 100%; height: 100%; background: var(--color-background)">
    <el-container>
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
            <div class="fold-button">
              <el-icon><Expand /></el-icon>
              <span style="font-size: 14px">
                {{ sidebar_hidden ? '展开' : '收起' }}
              </span>
            </div>
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
          <span v-if="user.is_login()">欢迎回来，{{ user.username }}</span>
        </div>
      </el-header>
      <el-container style="height: 100%">
        <el-aside
          width="fit-content"
          style="
            z-index: 10;
            background: rgb(243, 229, 255);
            height: calc(100vh - 60px);
            transition: margin-left 0.4s ease;
          "
          :style="{ 'margin-left': sidebar_hidden ? -64 + 'px' : 0 }"
        >
          <el-menu
            style="height: 100%; background-color: transparent"
            default-active="main-page"
            :collapse="true"
          >
            <el-menu-item index="main-page" @click="$router.push('/')">
              <el-icon><Expand /></el-icon>
              <template #title>主页</template>
            </el-menu-item>
            <el-menu-item index="party-editor" @click="$router.push('/partyEditor')">
              <el-icon><Grid /></el-icon>
              <template #title>组盘器</template>
            </el-menu-item>
            <el-menu-item index="party-searcher" @click="$router.push('/partySearcher')">
              <el-icon><Search /></el-icon>
              <template #title>茶盘器</template>
            </el-menu-item>
            <el-menu-item index="table" @click="$router.push('/table')">
              <el-icon><List /></el-icon>
              <template #title>一图流</template>
            </el-menu-item>
            <!--            <el-menu-item index="test_room" @click="$router.push('/test/room')">-->
            <!--              <el-icon><Aim /></el-icon>-->
            <!--              <template #title><span style="color: #fa8afa">测试项 [房间搜索]</span></template>-->
            <!--            </el-menu-item>-->
            <!--            <el-menu-item index="test_player" @click="$router.push('/test/player')">-->
            <!--              <el-icon><Aim /></el-icon>-->
            <!--              <template #title><span style="color: #fa8afa">测试项 [玩家资料卡]</span></template>-->
            <!--            </el-menu-item>-->
            <!--            <el-menu-item index="test_schedule" @click="$router.push('/test/schedule')">-->
            <!--              <el-icon><Aim /></el-icon>-->
            <!--              <template #title><span style="color: #fa8afa">测试项 [日程]</span></template>-->
            <!--            </el-menu-item>-->
            <el-menu-item v-if="user.is_login()" index="editor" @click="$router.push('/editor')">
              <el-icon><Edit /></el-icon>
              <template #title>编辑面板</template>
            </el-menu-item>
            <el-menu-item index="about" @click="$router.push('/about')">
              <el-icon><InfoFilled /></el-icon>
              <template #title>关于</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main
          style="padding: 0; transition: padding-left 0.4s ease"
        >
          <img
            class="bg-magic-circle"
            src="@/assets/bg_magic_circle.png"
            alt=""
            oncontextmenu="return false;"
            draggable="false"
            style="z-index: 0"
          />
          <div style="position: relative; width: 100%; height: 100%; overflow: hidden">
            <router-view style="height: 100%"></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.bg-magic-circle {
  position: fixed;
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
  //margin-top: 60px;
  width: 100%;
}
</style>
