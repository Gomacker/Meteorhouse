<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="content">
      <slot></slot>
    </div>
    <div class="cover">
      <slot name="cover"></slot>
    </div>
  </div>
</template>

<style scoped>
.cover {
  transition: opacity 0.3s ease;
  z-index: 0;
}
.content {
  transition: opacity 0.3s ease;
  position: absolute;
  width: 100%;
}
.container {
  position: relative;
  //width: 100%;
}
.container:hover > .cover {
  opacity: 0;
  z-index: -1;
}
.container:hover > .content {
  opacity: 1;
  z-index: 0;
}
.content {
  opacity: 0;
}
</style>
