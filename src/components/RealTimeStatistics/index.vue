<template>
  <div class="real-time-statistics">
    <BorderHeader class="title" :title="t('realTime')" />
    <div class="content flex flex-wrap justify-between gap-5 mt-4">
      <StatisticsItem
        class="flex-grow-0"
        v-for="item in statisticsItems"
        :key="toValue(item.label)"
        v-bind="item as any"
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
import { useI18n } from "vue-i18n";
import { computed, type ComputedRef, toValue } from "vue";

interface StatisticsItem {
  label: ComputedRef<string>;
  value: number;
  unit: ComputedRef<string>;
  icon: string;
  textColor: string;
}

const { t } = useI18n();

const statisticsItems: StatisticsItem[] = [
  {
    label: computed(() => t("totalStations")),
    value: 199,
    unit: computed(() => t("unit.count")),
    icon: iconChargingStation,
    textColor: "#2cfab7",
  },
  {
    label: computed(() => t("totalChargers")),
    value: 2302,
    unit: computed(() => t("unit.count")),
    icon: iconChargingPile,
    textColor: "#e2ce67",
  },
  {
    label: computed(() => t("totalChargingVolume")),
    value: 15302,
    unit: computed(() => t("unit.kW")),
    icon: iconChargingAmount,
    textColor: "#2cfab7",
  },
  {
    label: computed(() => t("totalChargingDuration")),
    value: 999.3,
    unit: computed(() => t("unit.hour")),
    icon: iconChargingDuration,
    textColor: "#2cf4f4",
  },
];
</script>

<style scoped></style>
