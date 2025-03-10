<template>
  <div>
    <div
      v-for="(point, index) in highlightPointList"
      :key="index"
      class="absolute"
      :style="{ left: point.x + 'px', top: point.y + 'px' }"
    >
      <PopupBox
        :direction="point.direction"
        :title="point.name"
        :desc="point.value.toString()"
      >
        <HighlightCircle
          :text="point.value.toString()"
          :size="point.size"
          class="loop-scale"
          :style="{
            animationDelay: `${index * 0.5}s`,
          }"
        />
      </PopupBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import HighlightCircle, { CircleSize } from "../widget/HighlightCircle.vue";
import PopupBox, { Direction } from "../widget/PopupBox.vue";

interface HighlightPoint {
  city: string;
  value: number;
  x: number;
  y: number;
  name: string;
  direction?: Direction;
  size?: CircleSize;
}

const highlightPointList: HighlightPoint[] = [
  {
    city: "chengdu",
    value: 28,
    x: 680,
    y: 650,
    name: "成都",
  },
  {
    city: "yichang",
    value: 199,
    x: 1012,
    y: 628,
    size: CircleSize.large,
    name: "宜昌",
  },
  {
    city: "shijiazhuang",
    value: 48,
    x: 1070,
    y: 319,
    name: "石家庄",
  },
  {
    city: "changsha",
    value: 16,
    x: 1060,
    y: 763,
    name: "长沙",
    direction: Direction.RIGHT,
  },
  {
    city: "hangzhou",
    value: 86,
    x: 1360,
    y: 680,
    name: "杭州",
    direction: Direction.LEFT,
  },
];
</script>

<style scoped>
.loop-scale {
  animation: zoom 3s infinite;
}

@keyframes zoom {
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
