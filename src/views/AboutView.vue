<script setup lang="ts">
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import { useUserStore } from "@/stores/user";
import { useSettings } from '@/stores/settings'
import { processArgs } from 'cac/deno/deno'

const user = useUserStore()
const worldflipper = useWorldflipperDataStore()
const settings = useSettings()
const version = APP_VERSION
</script>

<template>
  <div
    style="
      text-align: center;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
    "
  >
    <div>
      <p>
        <v-btn color="orange" @click="$router.push('/login')">后台登录</v-btn>
      </p>
      <p>Meteorhouse Version：<span style="color: coral">{{ version }}</span></p>
      <p>
        Author：
        <a href="https://space.bilibili.com/11466987" target="_blank">
          @Kranca / Gomacker
          <img
            style="width: 16px; vertical-align: middle"
            src="https://www.bilibili.com/favicon.ico"
            alt=""
          />
        </a>
      </p>
      <p>
        攻略发布：
        <a href="https://space.bilibili.com/229627861" target="_blank">
          @芙洛斯Official
          <img
            style="width: 16px; vertical-align: middle"
            src="https://www.bilibili.com/favicon.ico"
            alt=""
          />
        </a>
      </p>
      <p>
        问题反馈：
        <a href="https://jq.qq.com/?_wv=1027&amp;k=3rmVdxmZ" target="_blank">
          烤肠社芙芙屋
          <img
            style="width: 16px; vertical-align: middle"
            src="https://im.qq.com/favicon.ico"
            alt=""
          />
        </a>
      </p>
      <p>
        部分图像资源来自
        <a href="https://worldflipper.leiting.com/" target="_blank">世界弹射物语</a>
        、
        <a href="https://worldflipper.jp/">弹射世界官网</a>
      </p>
    </div>
    <div>
      <v-switch v-if="user.isLogin()" hide-details color="orange" v-model="worldflipper.mhMode" label="Meteorhouse Mode！"/>
      <v-switch hide-details color="orange" v-model="settings.showMagicCircle" label="开启背景旋转"/>
    </div>
    <v-card>
      <v-card-item>
        攻略/内容协力感谢：
        <div class="thanks-list">
          <p>
            @白鸢别馆Official
            <a href="https://space.bilibili.com/148736" target="_blank">
              <img
                style="width: 16px; vertical-align: middle"
                src="https://www.bilibili.com/favicon.ico"
                alt=""
              />
            </a>
          </p>
          <p>@安息香酸</p>
          <p>@猫猫球</p>
          <p>@御坂葉子</p>
          <p>@DMeow</p>
          <p>@Nyaaakui</p>
        </div>
      </v-card-item>
    </v-card>
    <div style="display: grid; grid-gap: 8px; grid-template-columns: repeat(4, 130px)">
      <v-card v-ripple style="border-radius: 8px; background: white" :elevation="4">
        <a
          style="display: flex; align-items: center; padding: 8px"
          target="_blank"
          href="https://kook.top/HEVjfY"
        >
          <img style="width: 32px; height: 32px" src="https://www.kookapp.cn/favicon.ico" alt="" />
          <span style="margin-left: 8px">Kook频道</span>
        </a>
      </v-card>
      <v-card v-ripple style="border-radius: 8px; background: white" :elevation="4">
        <a
          style="display: flex; align-items: center; padding: 8px"
          target="_blank"
          href="https://github.com/Gomacker/Anisebot"
        >
          <img style="width: 32px; height: 32px" src="https://www.github.com/favicon.ico" alt="" />
          <span style="margin-left: 8px">Anisebot</span>
        </a>
      </v-card>
      <v-card v-ripple style="border-radius: 8px; background: white" :elevation="4">
        <a
          style="display: flex; align-items: center; padding: 8px"
          target="_blank"
          href="https://afdian.net/a/Gomacker"
        >
          <img style="width: 32px; height: 32px" src="https://afdian.net/favicon.ico" alt="" />
          <span style="margin-left: 8px">爱发电</span>
        </a>
      </v-card>
    </div>
    <div style="display: flex; justify-content: space-evenly">
      <div>
        <p style="color: red">❤</p>
        <p>
          <a href="https://worldflipper.leiting.com/" target="_blank">世界弹射物语国服官网</a>
        </p>
        <p>
          <a href="https://worldflipper.jp/" target="_blank">Worldflipper日服官网</a>
        </p>
      </div>
      <div>
        <p style="color: rgb(0, 255, 0)">❤</p>
        <p>
          <a href="https://nga.178.com/thread.php?fid=693" target="_blank">弹射世界NGA</a>
        </p>
        <p>
          <a href="https://wiki.biligame.com/worldflipper/" target="_blank">世界弹射物语BWiki</a>
        </p>
        <p>
          <a href="https://www.gamer.cn/sjtswy" target="_blank">世界弹射物语磁场</a>
        </p>
      </div>
      <div>
        <p style="color: blue">❤</p>
        <p>
          <a href="https://wfwiki.com/" target="_blank">弹射世界中文Wiki</a>
        </p>
        <p>
          <a href="https://eliya-bot.herokuapp.com/" target="_blank">EliyaBot</a>
        </p>
        <p>
          <a href="https://wf-calendar.miaowm5.com/" target="_blank">弹射日历</a>
        </p>
      </div>
    </div>
    <div style="color: darkgray; font-style: italic">
      <p>“这种感觉真不可思议，</p>
      <p>三途河或许并没有拉远我们的距离，</p>
      <p>只是你的温度停驻在眼眸中，</p>
      <p>未来永远只留在了我的心里。”</p>
      <p>Cocoa</p>
      <p>~2022-12-23</p>
      <p>Pray for you</p>
    </div>
  </div>
</template>

<style scoped>
.thanks-list {
  display: grid;
  grid-template-columns: repeat(3, 150px);
  justify-content: center;
}
</style>
