<template>
  <CardItem title="各市充电交易额排行(今日)">
    <div class="flex flex-col gap-2">
      <CityChargeItem
        v-for="item in chargeCitiesList"
        :key="item.cityName"
        :cityName="item.cityName"
        :chargeAmount="item.chargeAmount"
        :percentage="item.percentage"
        :color="item.color"
      />
    </div>
  </CardItem>
</template>

<script setup lang="ts">
import CardItem from "../CardItem.vue";
import CityChargeItem from "./CityChargeItem.vue";

interface ChargeItemInfo {
  cityName: string;
  chargeAmount: number;
  percentage: number;
  color?: string;
}

const chargeCitiesList: ChargeItemInfo[] = [
  { cityName: "宜昌", chargeAmount: 5363.34, percentage: 66, color: "#2cfcb8" },
  { cityName: "杭州", chargeAmount: 4183.2, percentage: 60, color: "#e4d169" },
  { cityName: "石家庄", chargeAmount: 4008.82, percentage: 58 },
  { cityName: "成都", chargeAmount: 3645.7, percentage: 50, color: "#2df8f8" },
  { cityName: "长沙", chargeAmount: 999.65, percentage: 20, color: "#faa9ac" },
];
</script>

<style scoped></style>
