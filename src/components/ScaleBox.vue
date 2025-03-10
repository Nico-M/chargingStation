<template>
  <div
    class="vue3-scale-box"
    ref="vue3ScaleBox"
    :style="{
      ...style,
      width: width + 'px',
      height: height + 'px',
      backgroundImage: `url('${bgc}')`,
      backgroundSize: '100% 100%',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, type CSSProperties, onBeforeUnmount } from "vue";
import { debounce } from "lodash";

/**
 * 缩放容器组件
 * @param width 设计宽度
 * @param height 设计高度
 * @param bgc 背景颜色
 * @param delay 缓存延迟
 * @param isFlat 是否为扁平模式
 */
interface ScaleBoxProps {
  width?: number;
  height?: number;
  bgc?: string;
  delay?: number;
  isFlat?: boolean;
}

const props = withDefaults(defineProps<ScaleBoxProps>(),{
  width: 1920,
  height: 1080,
  bgc: "transparent",
  delay: 100,
  isFlat: false,
});


const emit = defineEmits(["scaleChange"]);


const vue3ScaleBox = ref<HTMLDivElement | null>(null);
const scale = ref(0);
const scaleX = ref(0);
const scaleY = ref(0);

// Reactive state
const style = reactive<CSSProperties>({
  position: "fixed",
  transform: props.isFlat
    ? "scaleX(var(--scaleX)) scaleY(var(--scaleY)) translate(-50%, -50%)"
    : "scale(var(--scale)) translate(-50%, -50%)",
  transformOrigin: "0 0",
  left: "50%",
  top: "50%",
  zIndex: 999,
});

/**
 * 获取缩放比例
 */
const getScale = () => {
  const { width, height } = props;
  const wh = window.innerHeight / height;
  const ww = window.innerWidth / width;
  return ww < wh ? ww : wh;
};

const getScaleX = () => window.innerWidth / props.width;
const getScaleY = () => window.innerHeight / props.height;

/**
 * 设置缩放比例
 */
const setScale = () => {
  if (!vue3ScaleBox.value) return;

  if (props.isFlat) {
    // 拉伸模式
    scaleX.value = getScaleX();
    scaleY.value = getScaleY();
    vue3ScaleBox.value.style.setProperty("--scaleX", scaleX.value.toString());
    vue3ScaleBox.value.style.setProperty("--scaleY", scaleY.value.toString());
  } else {
    // 等比缩放模式
    scale.value = getScale();
    vue3ScaleBox.value.style.setProperty("--scale", scale.value.toString());
  }
};

// 监听
watch(
  [scale, scaleX, scaleY],
  () => {
    const args = props.isFlat ? [scaleX.value, scaleY.value] : scale.value;
    emit("scaleChange", args);
  },
  { immediate: true }
);

const debounceSetScale = debounce(setScale, props.delay);

// 根据窗口大小变化重新设置缩放比例
onMounted(() => {
  setScale();
  window.addEventListener("resize", debounceSetScale);
});

// 组件销毁时移除监听
onBeforeUnmount(() => {
  window.removeEventListener("resize", debounceSetScale);
});
</script>
