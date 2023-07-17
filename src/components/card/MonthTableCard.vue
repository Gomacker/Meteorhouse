<script setup lang="ts">
</script>

<template>
  <div style="width: 750px; zoom: 1; background-color: #0f0">
    <div style="display: flex; flex-direction: column; align-items: center">
      <div class="month-event-card">
        <div
          style="
            width: 658px;
            height: 346px;
            border-radius: 8px;
            padding: 4px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom, #dfebf7, #f3dcff, #dfebf7);
          "
        >
          <v-img
            src="/static/worldflipper/st/banner/world_flipper-1609036650079981568-img1.png"
            :cover="true"
            style="width: 100%; height: 100%; border-radius: 6px"
          />
        </div>
        <div style="display: flex; padding: 11px 4px">
          <div
            style="
              width: 130px;
              height: 92px;
              /*background-color: #f00;*/
              background: rgb(252, 106, 121)
                repeating-linear-gradient(
                  135deg,
                  rgba(255, 255, 255, 0.1) 0,
                  rgba(255, 255, 255, 0.1) 1px,
                  transparent 1px,
                  transparent 3px
                );
              font-size: 92px;
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <div style="color: white; font-family: '华文仿宋', sans-serif; font-weight: 600">
              08
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; flex-direction: column; padding: 0 6px">
            <div
              style="
                color: #aa074a;
                font-size: 44px;
                font-weight: 600;
                letter-spacing: 10px;
                font-family: '华文中宋', sans-serif;
              "
            >
              角色特选扭蛋
            </div>
            <div>aa</div>
          </div>
        </div>
      </div>
      <div v-for="i in 10" :key="i" class="month-event-card"></div>
    </div>
  </div>
</template>

<style scoped>
.month-event-card {
  width: 670px;
  height: 482px;
  //background-color: #00f;
  background: white
    repeating-linear-gradient(135deg, rgba(239, 228, 245, 0.4) 0, rgba(239, 228, 245, 0.4) 1px, transparent 1px, transparent 3px);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 6px;
  transition: transform 0.4s ease;
  margin: 11px;
  line-height: 1;
  flex-shrink: 0;
}

.month-event-card:hover {
  //transform: scale(1.05);
}
</style>
