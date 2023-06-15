<script lang="ts" setup>
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
  <v-app style="--v-theme-background: 248, 248, 248">
    <v-navigation-drawer :width="160" v-model="sidebar_hidden" temporary="">
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
      density="comfortable"
      style="background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
      :order="-1"
    >
      <v-app-bar-nav-icon @click="sidebar_hidden = !sidebar_hidden"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <a style="font-weight: 600; color: #5a31ff" href="/">流星屋图书馆</a>
      </v-toolbar-title>
      <span style="margin-right: 30px">{{ user.token }}</span>
    </v-app-bar>

    <v-main>
      <router-view style="height: 100%"></router-view>
    </v-main>
    <img
      class="bg-magic-circle"
      src="@/assets/bg_magic_circle.png"
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
  //margin-top: 60px;
  width: 100%;
}
</style>
