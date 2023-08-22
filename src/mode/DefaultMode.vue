<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import { useDefer } from "@/utils";
import { Element } from "@/anise/worldflipper/object";
import { ele2color } from "@/stores/manager";

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

const defer = useDefer()

interface LoadingImage {
  src: string
  color: string
}

const loading_images: Array<LoadingImage> = [
  { src: '/static/worldflipper/unit/pixelart/special/lion_boy.gif', color: ele2color[Element.Thunder].hex() },
  { src: '/static/worldflipper/unit/pixelart/special/tiger_treasure_hunter_smr20.gif', color: ele2color[Element.Fire].hex() },
  { src: '/static/worldflipper/unit/pixelart/special/black_wolf_knight.gif', color: ele2color[Element.Fire].hex() },
  { src: '/static/worldflipper/unit/pixelart/special/beast_adventurer.gif', color: ele2color[Element.Wind].hex() },
  { src: '/static/worldflipper/unit/pixelart/special/lady_summoner_xm20.gif', color: ele2color[Element.Fire].hex() },
  { src: '/static/worldflipper/unit/pixelart/walk_front/kinoko.gif', color: ele2color[Element.Fire].hex() }
]
const loading_img = loading_images[Math.floor(Math.random() * loading_images.length)]
</script>

<template>
  <v-app style="--v-theme-background: 248, 248, 248, 0">
    <transition name="loading" mode="out-in">
      <div v-if="defer(60, true)" key="element" class="loading-page">
<!--      <div v-if="defer(0)" key="element" class="loading-page">-->
        <div class="loading-page-text">Meteorhouse</div>
        <div>Loading...</div>
        <div class="loading-page-special-effect" :style="{'--loading-special-effect-color': loading_img.color}"/>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 512px;
            height: 512px;
            overflow: visible;
            filter: drop-shadow(0 0 4px rgba(0 0 0 / 50%));
          "
        >
          <img style="scale: 2; image-rendering: pixelated" :src="loading_img.src" alt="" />
        </div>
      </div>
    </transition>
    <v-snackbar
      v-model="worldflipper_updated"
      color="green-lighten-4"
      location="top"
      style="top: 72px"
      close-on-content-click
    >
      <v-icon icon="mdi-check-circle-outline" color="green" />
      已更新数据：worldflipper
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
            color="blue"
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
            prepend-icon="mdi-toolbox"
            color="red"
            title="工具箱（Beta）"
            value="toolbox"
            @click="$router.push('/toolbox')"
          />
          <v-list-item
            prepend-icon="mdi-calendar"
            color="purple"
            title="Events"
            value="calendar"
            @click="$router.push('/calendar')"
          />
          <!--          <v-list-item-->
          <!--            prepend-icon="mdi-calendar"-->
          <!--            color="purple"-->
          <!--            title="Events2"-->
          <!--            value="calendar"-->
          <!--            @click="$router.push('/events')"-->
          <!--          />-->
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
            <v-list-item>
              <v-textarea :model-value="user.token" hide-details />
            </v-list-item>
          </v-list>
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
        backdrop-filter: blur(5px);
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
    <v-main v-if="defer(1)">
      <router-view></router-view>
    </v-main>
    <div
      v-if="defer(1)"
      class="bg-magic-circle-wrapper"
      oncontextmenu="return false;"
      style="z-index: -1"
    >
      <div class="bg-magic-circle" />
    </div>
  </v-app>
</template>

<style scoped>
.loading-page {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(247,246,250);
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 1.5s;
}
.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

.loading-page-text {
  font-size: 42px;
  font-weight: bold;
}
.loading-enter-active .loading-page-text,
.loading-leave-active .loading-page-text {
  transition: color 1s ease, filter 1s ease;
}
.loading-enter-from .loading-page-text,
.loading-leave-to .loading-page-text {
  color: rgb(90, 49, 255);
  filter: drop-shadow(0 0 8px rgb(90, 49, 255));
}

.loading-page-special-effect {
  width: 512px;
  margin-top: 128px;
  height: 512px;
  position: absolute;
  --loading-special-effect-color: white;
  background: radial-gradient(rgba(255 255 255 / 0.4) 20%, transparent 20%), radial-gradient(rgba(255 255 255 / 0.4) 30%, transparent 30%), radial-gradient(var(--loading-special-effect-color) 50%, transparent 50%);
  scale: 0;
  filter: drop-shadow(0 0 4px var(--loading-special-effect-color));
}
@keyframes loading-complete {
  0% {
    scale: 0;
  }
  50% {
    scale: 1;
  }
  100% {
    scale: 0.8;
  }
}
.loading-enter-active .loading-page-special-effect,
.loading-leave-active .loading-page-special-effect {
  animation: loading-complete 1s ease-out 1;
}
.loading-enter-from .loading-page-special-effect,
.loading-leave-to .loading-page-special-effect {
  scale: 0.8;
}

.bg-magic-circle-wrapper {
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 18%));
  z-index: 0;
  position: fixed;
  right: -400px;
  top: -291px;
}
.bg-magic-circle {
  background: white;
  --mask: url(../assets/worldflipper/bg_magic_circle.png);
  -webkit-mask: var(--mask);
  mask: var(--mask);

  width: 992px;
  height: 992px;
  animation: rotation 16s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  user-select: none;
}
@keyframes rotation {
  0% {
    transform: rotate(36deg);
  }
  100% {
    transform: rotate(396deg);
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
