<template>
  <div class="statistics-item p-2 flex  rounded-4 items-center">
    <div class="item-icon">
      <div class="item-icon-effect p-2 rounded-4">
        <img :src="icon" alt="icon" class="icon-img" />
      </div>
    </div>
    <div class="detail ml-2">
      <div class="label mb-2">{{ label }}</div>
      <div class="value font-bold text-5" :style="{
        color: textColor || '#2cfab7'
      }">{{ value }}/{{ unit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";


defineProps<{
  label: string;
  value: number;
  unit?: string;
  icon: string;
  textColor?: string;
}>();
</script>

<style scoped>
.statistics-item {
  width: 225px;
  height: 100px;
  background-color: rgba(43, 85, 87, 0.35);
  cursor: pointer;
  .item-icon-effect {
    height: 70px;
    width: 70px;
    line-height: 70px;
    text-align: center;
    background-color: rgba(43, 85, 87, 0.6);
  }
  .icon-img {
    width: 40px;
    margin-top: 6px;
  }
  &:hover{
    box-shadow: 1px 1px 8px 6px rgb(17 123 95 / 39%);;
  }
  transition: box-shadow 0.3s ease-in-out;
}
</style>
