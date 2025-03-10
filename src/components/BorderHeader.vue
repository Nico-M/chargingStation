<template>
  <div class="border-header relative">
    <CircleMini class="absolute top-1 left-1 loop-scale" />
    <ThreePoints class="absolute top-2 right-2" />
    <span class="ml-8 text-6 font-bold leading-[54px]">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import CircleMini from "./widget/CircleMini.vue";
import ThreePoints from "./widget/ThreePoints.vue";

defineProps<{
  title: string;
}>();
</script>

<style scoped lang="less">
@import "../design/responseBg.less";
.border-header {
  .bg-image("../assets/images/bg-border");
  height: 50px;
  background-size: contain;
}
.loop-scale {
  animation: loop-scale 3s infinite;
}
@keyframes loop-scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
