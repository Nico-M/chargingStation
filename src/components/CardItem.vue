<template>
  <div>
    <div class="header text-5 font-bold">
      {{ title }}
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped lang="less">
@import "../design/responseBg.less";
.header {
  height: 35px;
  line-height: 30px;
  padding-left: 32px;
  .bg-image("../assets/images/bg-section");
  text-shadow: 2px 2px 5px #000;
}
.content {
  background-color: var(--base-bg-color);
  padding: 10px;
}
</style>
