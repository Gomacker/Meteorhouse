<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; flex-direction: column">
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          /*align-items: center*/
          align-items: flex-start;
          /*align-content: flex-start;*/
          padding: 20px;
        "
      >
        <div style="margin: 8px">
          <div style="font-weight: 700; font-size: 24px">当前活动</div>
          <el-image
            style="
              width: 480px;
              height: 270px;
              margin: 4px 0;
              box-shadow: 0 0 16px rgba(0 0 0 / 0.5);
            "
            fit="cover"
            :src="'/static/worldflipper/st/banner/dragon_light.png'"
          />
        </div>
        <div style="margin: 8px">
          <div style="font-weight: 700; font-size: 24px">当前卡池</div>
          <el-image
            style="
              width: 480px;
              height: 270px;
              margin: 4px 0;
              box-shadow: 0 0 16px rgba(0 0 0 / 0.5);
            "
            fit="cover"
            :src="'/static/worldflipper/twitter/world_flipper-1432176284986081281-20210830_110009-img1.jpg'"
          />
        </div>
      </div>
      <div>
        <el-button size="large" type="warning" @click="router.push('/partyEditor')">
          组盘器
        </el-button>
        <el-button size="large" type="primary" @click="router.push('/partySearcher')">
          茶盘器
        </el-button>
      </div>
    </div>
  </div>
</template>
