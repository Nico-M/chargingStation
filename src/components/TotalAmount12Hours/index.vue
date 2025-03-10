<template>
  <CardItem :title="t('income12Hours')">
    <v-chart :option="option" class="chart" />
  </CardItem>
</template>

<script setup lang="ts">
import CardItem from "../CardItem.vue";
import { ref } from "vue";
import { use } from "echarts/core";
import { LineChart, PictorialBarChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type {
  LineSeriesOption,
  PictorialBarSeriesOption,
} from "echarts/charts";
import type { GridComponentOption } from "echarts/components";
import VChart from "vue-echarts";
import { useI18n } from "vue-i18n";

use([GridComponent, LineChart, PictorialBarChart, CanvasRenderer]);

type EChartsOption = ComposeOption<
  GridComponentOption | LineSeriesOption | PictorialBarSeriesOption
>;

const { t } = useI18n();
const customerTimeBreakPoint = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
];
// 模拟数据
const mockData = {
  times: customerTimeBreakPoint,
  values: [
    0, 6, 3, 10, 9, 15, 13, 20, 18, 45, 21, 28, 4, 18, 12, 21, 17, 29, 24, 33,
    31, 22, 34, 12, 11,
  ],
};

const specialTimePoints: Record<
  (typeof customerTimeBreakPoint)[number],
  number
> = {
  "00:30": 4, // 第1项
  "04:00": 7.5, // 第4项
  "08:30": 12, // 第11项
  "11:30": 45, // 第15项
};
// 创建完整的数据数组，只在特定点有值，其他为null
const pictorialData = customerTimeBreakPoint.map((time) =>
  specialTimePoints[time] !== undefined ? specialTimePoints[time] : null
);

const option = ref<EChartsOption>({
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: mockData.times,
    boundaryGap: false,
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: function (_index, value) {
        // 只显示4小时倍数的时间点
        if (value.endsWith(":00")) {
          const hour = parseInt(value.split(":")[0]);
          return hour % 4 === 0;
        }
        return false;
      },
      color: "#999",
      // 可选：调整标签样式
      fontSize: 10,
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#999",
    },
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b0}: {c0}",
  },
  series: [
    {
      data: mockData.values,
      type: "line",
      symbol: "none",
      lineStyle: {
        color: "#1d9e8c",
        width: 2,
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#167a62", // color at 0%
            },
            {
              offset: 0.5,
              color: "#124a40", // color at 0%
            },
            {
              offset: 1,
              color: "#123432", // color at 100%
            },
          ],
        },
      },
    },
    {
      name: "hill",
      type: "pictorialBar",
      barCategoryGap: "-120%",
      symbol:
        "path://M2 120C21 120 45 0 45 0C45 0 70 120 88 120H5Z",
      itemStyle: {
        opacity: 0.5,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(229, 209, 105,1)" },
            { offset: 0.8, color: "rgba(228, 208, 105,0.8)" },
            { offset: 1, color: "transparent" },
          ],
        },
      },
      emphasis: {
        itemStyle: {
          opacity: 1,
        },
      },
      data: pictorialData,
      z: 10,
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 260px;
}
</style>
