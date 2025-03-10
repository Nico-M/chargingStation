<template>
  <div class="outer-circle">
    <div class="inner-circle">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
export enum CircleSize {
  small = "small",
  medium = "medium",
  large = "large",
}
</script>

<script setup lang="ts">
const circleSize: Record<CircleSize, [number, number]> = {
  small: [40, 20],
  medium: [50, 30],
  large: [60, 40],
};

const props = defineProps<{
  text: string;
  size?: CircleSize;
}>();

const { text, size = CircleSize.medium } = props;

const [circleDiameter, innerDiameter] = size
  ? circleSize[size]
  : circleSize[CircleSize.medium];

// 外圆直径
const circleDiameterPixel = `${circleDiameter}px`;
// 内圆直径
const innerDiameterPixel = `${innerDiameter}px`;
</script>

<style scoped lang="less">
@outer-size: v-bind(circleDiameterPixel);
@inner-size: v-bind(innerDiameterPixel);

.outer-circle {
  width: @outer-size;
  height: @outer-size;
  display: inline-block;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid;
  border-color: var(--base-color);
  box-shadow: 1px 1px 3px 5px #117359,
    inset 1px 1px 3px 5px rgb(17 115 89 / 53%);
  text-align: center;
  line-height: @outer-size;
  cursor: pointer;
  .inner-circle {
    width: @inner-size;
    height: @inner-size;
    line-height: @inner-size;
    text-align: center;
    border-radius: 50%;
    background-color: #117359;
    color: white;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
  }
}
</style>
