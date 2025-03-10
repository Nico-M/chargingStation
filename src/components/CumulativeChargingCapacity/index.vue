<template>
  <CardItem :title="t('cityChargingVolume')">
    <v-chart class="chart" :option="option" />
  </CardItem>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CardItem from "../CardItem.vue";
import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type { BarSeriesOption } from "echarts/charts";
import type { GridComponentOption } from "echarts/components";
import VChart from "vue-echarts";
import type { BarDataItemOption } from "echarts/types/src/chart/bar/BarSeries.js";
import { useI18n } from "vue-i18n";

use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = ComposeOption<GridComponentOption | BarSeriesOption>;

interface CityInfo {
  name: string;
  value: number | (() => BarDataItemOption);
}

const { t } = useI18n();
const mockData: CityInfo[] = [
  {
    name: "宜昌",
    value() {
      return {
        value: 11,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#e4d069", // color at 0%
              },
              {
                offset: 1,
                color: "rgba(228, 208, 105, 0)", // color at 100%
              },
            ],
          },
          shadowColor: "rgba(210, 196, 108,0.5)",
          shadowBlur: 2,
          shadowOffsetX: 8,
          shadowOffsetY: 2,
        },
      };
    },
  },
  {
    name: "杭州",
    value: 10,
  },
  {
    name: "石家庄",
    value: 9,
  },
  {
    name: "成都",
    value: 8,
  },
  {
    name: "长沙",
    value: 5,
  },
];

const option = ref<EChartsOption>({
  xAxis: {
    type: "category",
    data: mockData.map((item) => item.name),
    axisLine: {
      lineStyle: {
        color: "#405259",
      },
    },
    axisLabel: {
      color: "#fff", // 设置 x 轴刻度标签为白色
    },
  },
  yAxis: {
    type: "value",
    interval: 4,
    splitLine: {
      lineStyle: {
        color: "#405259",
      },
    },
    axisLine: {
      lineStyle: {
        color: "#405259",
      },
    },
    nameTextStyle: {
      color: "#fff",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  series: [
    {
      name: "累计充电量",
      type: "bar",
      data: mockData.map((item) => {
        return typeof item.value === "function" ? item.value() : item.value;
      }),
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#2cfcb8", // color at 0%
            },
            {
              offset: 1,
              color: "rgba(44, 252, 184, 0)", // color at 100%
            },
          ],
        },
        shadowColor: "rgba(31, 164, 135,0.5)",
        shadowBlur: 2,
        shadowOffsetX: 8,
        shadowOffsetY: 2,
      },
      barWidth: 26,
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
