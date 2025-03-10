<template>
  <div 
    class="space" 
    :class="[
      `space-${direction}`,
      `space-align-${align}`,
      `space-justify-${justify}`
    ]"
    :style="spaceStyle"
  >
    <template v-if="$slots.default">
      <div 
        v-for="(item, index) in defaultSlotItems"
        :key="index"
        class="space-item"
        :style="itemStyle"
      >
        <component :is="item" />
      </div>
    </template>
    <template v-else>
      <div 
        v-for="(_, index) in items" 
        :key="index" 
        class="space-item"
        :style="itemStyle"
      >
        <slot :name="index" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type CSSProperties } from 'vue';

interface Props {
  direction?: 'horizontal' | 'vertical';
  size?: number | [number, number];
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
  wrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 8,
  align: 'center',
  justify: 'start',
  wrap: true
});

const slots = useSlots();


const defaultSlotItems = computed(() => {
  return slots.default?.() || [];
});

// 获取非默认插槽的名称
const items = computed(() => {
  return Object.keys(slots).filter(key => key !== 'default' && slots[key]);
});

// 计算间距样式
const spaceStyle = computed<CSSProperties>(() => {
  const gap = Array.isArray(props.size) 
    ? `${props.size[1]}px ${props.size[0]}px`
    : `${props.size}px`;

  return {
    gap,
    flexWrap: props.wrap ? 'wrap' : 'nowrap'
  };
});

// 计算每个项目的样式
const itemStyle = computed(() => {
  return {
    flex: props.direction === 'horizontal' ? '0 0 auto' : '1 1 auto'
  };
});
</script>

<style scoped>
.space {
  display: flex;
}

.space-horizontal {
  flex-direction: row;
}

.space-vertical {
  flex-direction: column;
}

.space-align-start {
  align-items: flex-start;
}

.space-align-end {
  align-items: flex-end;
}

.space-align-center {
  align-items: center;
}

.space-align-baseline {
  align-items: baseline;
}

.space-align-stretch {
  align-items: stretch;
}

.space-justify-start {
  justify-content: flex-start;
}

.space-justify-end {
  justify-content: flex-end;
}

.space-justify-center {
  justify-content: center;
}

.space-justify-space-between {
  justify-content: space-between;
}

.space-justify-space-around {
  justify-content: space-around;
}
</style>
