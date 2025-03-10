<template>
  <div class="chat-box" :class="direction">
    <!-- 使用 Vue Transition 组件实现淡入淡出效果 -->
    <Transition
      :css="false"
      name="magnify"
      appear
      @appear="enterHandler"
      @enter="enterHandler"
      @leave="leaveHandler"
    >
      <!-- 气泡框内容区域，仅在 show 为 true 时显示 -->
      <div
        v-if="show"
        class="relative chat-border flex flex-col items-center justify-center"
        :style="position"
      >
        <span class="title">{{ title }}</span>
        <span class="desc" v-if="desc">{{ desc }}</span>
      </div>
    </Transition>

    <!-- 触发区域 - 鼠标移入显示气泡，移出隐藏气泡 -->
    <div
      class="chat-content"
      ref="contentRef"
      @mouseenter="show = true"
      @mouseleave="show = false"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
// 定义气泡框方向的枚举类型
export enum Direction {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
};

type DirectionType = `${Direction}`;
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { animate } from "motion"; // 导入动画库
import { useElementSize } from "@/hooks/useElementSize";

// 气泡显示状态，默认隐藏
const show = ref(false);

const contentRef = ref<HTMLElement | null>(null);
//内容区大小
const contentSize = useElementSize(contentRef);

// 气泡框尺寸配置
const chatBorderSize = {
  width: 100,
  height: 60,
};

// 组件属性定义
interface Props {
  direction?: DirectionType;
  title: string;
  desc?: string;
}

const props = withDefaults(defineProps<Props>(), {
  direction: Direction.TOP,
  desc: "",
});

const GAP = 14; // 气泡与元素之间的间距
const OFFSET = 4; // 位置微调值

// 根据方向计算气泡位置
const position = computed(() => {
  const diffWidth = Math.abs(contentSize.value.width - chatBorderSize.width);
  const diffHeight = Math.abs(contentSize.value.height - chatBorderSize.height);
  const positions = {
    [Direction.TOP]: {
      top: `-${chatBorderSize.height + GAP}px`,
      left: `-${diffWidth / 2 - OFFSET}px`,
    },
    [Direction.BOTTOM]: {
      bottom: `-${chatBorderSize.height + GAP}px`,
      left: `-${diffWidth / 2 - OFFSET}px`,
    },
    [Direction.RIGHT]: {
      top: `-${diffHeight / 2 - OFFSET}px`,
      right: `-${chatBorderSize.width + GAP}px`,
    },
    [Direction.LEFT]: {
      top: `-${diffHeight / 2 - OFFSET}px`,
      left: `-${chatBorderSize.width + GAP}px`,
    },
  };

  return positions[props.direction] || { top: "0", left: "0" };
});

// 动画配置
const ANIMATION_DURATION = 0.5;
const ANIMATION_SCALE = {
  start: 0.5,
  end: 1,
};

// 气泡进入动画处理函数
const enterHandler = async (el: Element, done: () => void): Promise<void> => {
  await animate(
    el,
    { opacity: [0,1], scale: [ANIMATION_SCALE.start,ANIMATION_SCALE.end] },
    { type: "spring", stiffness: 500, damping: 25 }
  );
  done();
};

// 气泡离开动画处理函数
const leaveHandler = async (el: Element, done: () => void): Promise<void> => {
  await animate(
    el,
    { opacity: 0, scale: ANIMATION_SCALE.start },
    { duration: ANIMATION_DURATION }
  );
  done();
};
</script>

<style scoped lang="less">
.chat-box {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 60px;

  .chat-border {
    pointer-events: none;
    position: absolute;
    height: v-bind('chatBorderSize.height + "px"');
    width: v-bind('chatBorderSize.width + "px"');
    background-color: var(--base-bg-color);
    padding: 10px;
    color: #fff;
    text-align: center;
    border-radius: 8px;

    .title {
      font-size: 18px;
      font-weight: bold;
    }

    .desc {
      color: var(--base-yellow-color);
    }
  }

  .chat-content {
    position: relative;
    text-align: center;
  }
}
</style>
