<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { useWorldflipperDataStore } from '@/stores/worldflipper'

const sidebar_hidden = ref(false)
const user = useUserStore()

const worldflipper = useWorldflipperDataStore()
const worldflipper_updated = ref(false)
worldflipper.init().then((r) => {
  worldflipper_updated.value = r
})

console.log(`worldflipper loaded, Version: ${worldflipper.version}`)

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
  <v-app style="--v-theme-background: 248, 248, 248, 0">
    <v-snackbar
      v-model="worldflipper_updated"
      color="green-lighten-4"
      location="top"
      style="top: 72px"
    >
      <v-icon icon="mdi-check-circle-outline" color="green" />
      已更新数据到最新：worldflipper
    </v-snackbar>
    <v-navigation-drawer width="200" v-model="sidebar_hidden" temporary="">
      <div style="display: flex; flex-direction: column; height: 100%">
        <v-list density="compact" :nav="true">
          <v-list-item
            prepend-icon="mdi-star-four-points-outline"
            color="teal-lighten-1"
            height="60px"
            title="主页"
            value="myfiles"
            @click="$router.push('/')"
          />
          <v-list-item
            prepend-icon="mdi-calculator"
            color="red"
            title="组盘器"
            value="partyeditor"
            @click="$router.push('/partyEditor')"
          />
          <v-list-item
            prepend-icon="mdi-magnify"
            color="green"
            title="茶盘器"
            value="partysearcher"
            @click="$router.push('/partySearcher')"
          />
          <v-list-item
            prepend-icon="mdi-calendar"
            color="purple"
            title="Events"
            value="calendar"
            @click="$router.push('/calendar')"
          />
          <v-list-item
            prepend-icon="mdi-calendar"
            color="purple"
            title="Events2"
            value="calendar"
            @click="$router.push('/events')"
          />
          <v-list-item
            prepend-icon="mdi-table"
            color="blue"
            title="一图流"
            value="tablelist"
            @click="$router.push('/table')"
          />
          <v-list-item
            v-if="user.is_login()"
            prepend-icon="mdi-pencil"
            color="brown"
            title="编辑面板"
            value="editor"
            @click="$router.push('/editor')"
          />
          <v-list-item
            prepend-icon="mdi-information"
            color="gray"
            title="关于"
            value="about"
            @click="$router.push('/about')"
          />
        </v-list>
        <template v-if="user.is_login()">
          <v-spacer />
          <v-divider />
          <v-list>
            <v-list-item> 已登录 {{ user.username }} </v-list-item>
          </v-list>
        </template>
      </div>
    </v-navigation-drawer>

    <v-app-bar
      style="
        background: linear-gradient(
            110deg,
            transparent 220px,
            yellow 220px,
            yellow 240px,
            transparent 240px,
            transparent 250px,
            yellow 250px,
            yellow 260px,
            transparent 260px
          ),
          linear-gradient(120deg, rgba(132, 250, 176, 0.6) 0%, rgba(143, 211, 244, 0.6) 100%);
        background-blend-mode: overlay, normal;
        backdrop-filter: blur(2px);
      "
      :order="-1"
    >
      <v-app-bar-nav-icon @click="sidebar_hidden = !sidebar_hidden"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <a @click="$router.push('/')" style="cursor: pointer; font-weight: 600; color: #5a31ff">
          流星屋图书馆
        </a>
      </v-toolbar-title>
      <!--      <v-text-field label="搜索" hide-details></v-text-field>-->
      <!--      <v-btn style="margin: 8px" icon="mdi-magnify"/>-->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <img
      class="bg-magic-circle"
      src="../assets/bg_magic_circle.png"
      alt=""
      oncontextmenu="return false;"
      draggable="false"
      style="z-index: -1"
    />
  </v-app>
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
  width: 100%;
}
</style>
