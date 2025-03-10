import { ref, onMounted, onUnmounted } from "vue";
import type {Ref} from 'vue';

/**
 * 自定义 hook，用于获取并监听设备的像素比（devicePixelRatio）变化
 * @returns {object} 包含当前设备像素比的响应式引用
 */
export function useDevicePixelRatio(): { devicePixelRatio: Ref<number> } {
  // 创建一个响应式引用，初始值为当前设备的像素比
  const devicePixelRatio = ref<number>(window.devicePixelRatio || 1);

  /**
   * 更新设备像素比的处理函数
   */
  const updatePixelRatio = () => {
    devicePixelRatio.value = window.devicePixelRatio || 1;
  };

  onMounted(() => {
    // 添加媒体查询监听器，以检测设备像素比的变化
    // 为不同的像素比创建媒体查询
    const mediaQueryLists: MediaQueryList[] = [];
    const listenerMap = new Map<
      MediaQueryList,
      (e: MediaQueryListEvent) => void
    >();

    // 为常见的像素比范围创建媒体查询
    [0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4].forEach((ratio) => {
      const mediaQueryList = window.matchMedia(`(resolution: ${ratio}dppx)`);

      const listener = (e: MediaQueryListEvent) => {
        if (e.matches) {
          devicePixelRatio.value = ratio;
        }
      };

      // 存储媒体查询和对应的监听器，以便后续清理
      listenerMap.set(mediaQueryList, listener);
      mediaQueryList.addEventListener("change", listener);
      mediaQueryLists.push(mediaQueryList);
    });

    // 监听窗口大小变化（某些设备在窗口大小变化时可能会改变像素比）
    window.addEventListener("resize", updatePixelRatio);

    // 组件卸载时清理事件监听器
    onUnmounted(() => {
      mediaQueryLists.forEach((mql) => {
        const listener = listenerMap.get(mql);
        if (listener) {
          mql.removeEventListener("change", listener);
        }
      });
      window.removeEventListener("resize", updatePixelRatio);
    });
  });

  return {
    devicePixelRatio,
  };
}
