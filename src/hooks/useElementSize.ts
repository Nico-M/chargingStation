import { ref, onMounted, onUnmounted,  } from 'vue';
import type { Ref } from 'vue';

interface ElementSize {
    width: number;
    height: number;
}

/**
 * 获取并追踪元素尺寸的钩子函数
 * @param elementRef 要追踪的元素引用
 * @returns 包含元素宽度和高度的响应式对象
 */
export function useElementSize(elementRef: Ref<HTMLElement | null>): Ref<ElementSize> {
    // 创建存储尺寸信息的响应式对象
    const size = ref<ElementSize>({
        width: 0,
        height: 0,
    });

    // 创建 ResizeObserver 的引用
    const observer = ref<ResizeObserver | null>(null);

    // 更新元素尺寸的函数
    const updateSize = () => {
        if (!elementRef.value) return;
        
        // 获取元素的边界矩形信息
        const { width, height } = elementRef.value.getBoundingClientRect();
        size.value = { width, height };
    };

    onMounted(() => {
        if (!elementRef.value) return;
        
        // 初始化时更新一次尺寸
        updateSize();
        
        // 使用 ResizeObserver 监听尺寸变化
        if (window.ResizeObserver) {
            observer.value = new ResizeObserver(updateSize);
            observer.value.observe(elementRef.value);
        } else {
            // 对不支持 ResizeObserver 的浏览器使用备选方案
            window.addEventListener('resize', updateSize);
        }
    });
    
    onUnmounted(() => {
        // 清理资源
        if (observer.value) {
            observer.value.disconnect();
        } else {
            window.removeEventListener('resize', updateSize);
        }
    });

    // 返回响应式尺寸对象
    return size;
}