<script lang="ts" setup>
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import { ref } from "vue";

const worldflipper = useWorldflipperDataStore()
const worldflipper_updated = ref(false)
worldflipper.init().then((r) => {
  worldflipper_updated.value = r
})

console.log(`worldflipper loaded, Version: ${worldflipper.version}`)
</script>
<template>
  <v-app style="--v-theme-background: 247, 246, 250, 0">
    <div style="display: flex; justify-content: center">
      <div style="min-width: 1080px; width: 1080px; min-height: 2160px">
        <v-app-bar
          style="
            position: absolute;
            width: 1080px;
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
          <div style="width: 36px" />
          <v-toolbar-title>
            <a @click="$router.push('/')" style="cursor: pointer; font-weight: 600; color: #5a31ff">
              队伍查询
            </a>
          </v-toolbar-title>
          <div style="margin-right: 36px">©Copyright(2022-2023) Meteorhouse Library</div>
        </v-app-bar>
        <v-main style="height: 100%">
          <router-view></router-view>
        </v-main>
      </div>
    </div>
  </v-app>
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
