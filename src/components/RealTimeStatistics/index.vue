<template>
  <div class="real-time-statistics">
    <BorderHeader class="title" title="实时统计" />
    <div class="content flex flex-wrap justify-between gap-5 mt-4">
      <StatisticsItem
        class="flex-grow-0"
        v-for="item in statisticsItems"
        :key="item.label"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BorderHeader from "../BorderHeader.vue";
import StatisticsItem from "./StatisticsItem.vue";
import iconChargingStation from "@/assets/icons/icon-charging-station.png";
import iconChargingPile from "@/assets/icons/icon-charging-pile.png";
import iconChargingAmount from "@/assets/icons/icon-charging-amount.png";
import iconChargingDuration from "@/assets/icons/icon-charging-duration.png";

interface StatisticsItem {
  label: string;
  value: number;
  unit: string;
  icon: string;
  textColor: string;
}

const statisticsItems: StatisticsItem[] = [
  {
    label: "充电站总数",
    value: 199,
    unit: "个",
    icon: iconChargingStation,
    textColor: "#2cfab7",
  },
  {
    label: "充电桩总数",
    value: 2302,
    unit: "个",
    icon: iconChargingPile,
    textColor: "#e2ce67",
  },
  {
    label: "累计充电总量",
    value: 15302,
    unit: "kW",
    icon: iconChargingAmount,
    textColor: "#2cfab7",
  },
  {
    label: "累计充电总时长",
    value: 999.3,
    unit: "h",
    icon: iconChargingDuration,
    textColor: "#2cf4f4",
  },
];
</script>

<style scoped></style>
