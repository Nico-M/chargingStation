<template>
    <TransitionGroup class="three-points" tag="ul" name="three-point">
      <li
        v-for="point in timelineOfThreePoint"
        :key="point.name"
        class="three-point-item"
        :style="{ backgroundColor: point.color }"
      ></li>
    </TransitionGroup>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const timelineOfThreePoint = ref<
  {
    name: string;
    color: string;
  }[]
>([
  {
    name: "base",
    color: "var(--base-color)",
  },
  {
    name: "pink",
    color: "var(--base-pink-color)",
  },
  {
    name: "blue",
    color: "var(--base-blue-color)",
  },
]);
let intervalId: NodeJS.Timeout;
onMounted(() => {
  intervalId = setInterval(() => {
    const [first, ...rest] = timelineOfThreePoint.value;
    timelineOfThreePoint.value = [...rest, first];
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>
<style lang="less" scoped>
.three-points {
  display: flex;
  .three-point-item {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 1px;
    transform: scale(0.5);
  }
}

.three-point-move, /* 对移动中的元素应用的过渡 */
.three-point-enter-active,
.three-point-leave-active {
  transition: all 1s ease;
}

.three-point-enter-from,
.three-point-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
