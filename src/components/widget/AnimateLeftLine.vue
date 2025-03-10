<template>
    <svg
      width="613"
      height="46"
      viewBox="0 0 613 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 静态背景路径 -->
      <path d="M611 45.5 L589 0.5 H0" stroke="url(#paint0_linear_4_9)" />
      
      <!-- 带有动画效果的路径 -->
      <path 
        ref="animatedPath"
        d="M611 45.5 L589 0.5 H0" 
        stroke="#94d9d0" 
        stroke-width="2"
        stroke-dasharray="30 625"
        :stroke-dashoffset="offset"
      />
      <circle cx="609" cy="42" r="4" fill="white"/>
      
      <defs>
        <linearGradient
          id="paint0_linear_4_9"
          x1="613"
          y1="23"
          x2="0"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2F555B" />
          <stop offset="1" stop-color="#64B4C1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { animate } from 'motion';
  
  const animatedPath = ref<SVGPathElement | null>(null);
  const offset = ref(635); // 起始偏移量（应该大于路径长度）
  
  onMounted(() => {
    if (!animatedPath.value) return;
    
    // 获取实际路径长度，以便更精确地设置动画
    const pathLength = animatedPath.value.getTotalLength();
    
    // 创建动画
    // const animation = animate(
    //   offset,
    //   { value: [pathLength + 10, 0] }, // 从路径长度之外动画到0
    //   { 
    //     duration: 4,
    //     repeat: Infinity,
    //     ease: ["easeIn", "easeOut"]
    //   }
    // );
    const animation = animate(pathLength + 10,0,{
      onUpdate: (value) => {
        offset.value = value;
      },
      duration: 4,
      repeat: Infinity,
      ease: ["easeIn", "easeOut"]
    })
    
    // 清理动画
    onUnmounted(() => {
      animation.stop();
    });
  });
  </script>