<template>
  <div class="progress-container">
    <div 
      class="progress-bar"
      :style="{ 
        height: `${height}px`,
        borderRadius: `${borderRadius}px`
      }"
    >
      <div 
        class="progress-fill"
        :style="{ 
          width: `${percentage}%`,
          background: color,
          borderRadius: `${borderRadius}px`
        }"
      >
        <div v-if="showPercentage" class="progress-text">{{ percentage }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  percentage: number;
  color?: string;
  showPercentage?: boolean;
  height?: number;
  borderRadius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'linear-gradient(to right, #1d6a76, #2bf8b7)',
  showPercentage: false,
  height: 8,
  borderRadius: undefined
});

// 如果没有设置 borderRadius，则默认为高度的一半
const borderRadius = computed(() => {
  return props.borderRadius ?? props.height / 2;
});
</script>

<style scoped lang="less">
.progress-container {
  width: 100%;
  padding: 4px 0;
  cursor: pointer;
}

.progress-bar {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  &:hover{
   box-shadow: 0px 0px 3px 3px rgb(253 253 253 / 27%);
  }
  transition: box-shadow 0.3s ease-in-out;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease-in-out;
  position: relative;
}

.progress-text {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
}
</style>
