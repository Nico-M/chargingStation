<template>
  <CardItem :title="t('cityStationRatio')">
    <v-chart class="chart" :option="option" />
  </CardItem>
</template>

<script setup lang="ts">
import CardItem from "../CardItem.vue";
import { ref } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type { PieSeriesOption } from "echarts/charts";
import type {
  TooltipComponentOption,
  LegendComponentOption,
} from "echarts/components";
import { useI18n } from "vue-i18n";

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

type EChartsOption = ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

interface CityColorPellet {
  name: string,
  color: string,
  value: number
}

const { t } = useI18n();

const colorPellet: CityColorPellet[] = [
  {
    name: '石家庄',
    color:'#fff',
    value: 17,
  },
  {
    name: '成都',
    color:'#2df8f8',
    value: 10,
  },
  {
    name: '长沙',
    color:'#fba9ae',
    value: 5,
  },
  {
    name: '杭州',
    color:'#e4d169',
    value: 31,
  },
  {
    name: '宜昌',
    color:'#2cfcb8',
    value: 35,
  }
];

const cityPartData = (cityPellet: CityColorPellet[])=>{
  return cityPellet.map((city)=>{
    return {
      value: city.value,
      name: city.name,
      itemStyle: {
        color: city.color
      },
      labelLine: {
        lineStyle: {
          color: city.color
        }
      },
      label: {
        rich: {
          b: {
            color: city.color
          },
          c: {
            color: city.color
          }
        }
      }
    }
  })
}
const option = ref<EChartsOption>({
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: "各市充电桩占比",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: "outside",
        formatter: (params) => {
          return `{a|${params.name}}{b|・}\n{c|${Math.floor(params.percent||0)}%}`;
        },
        rich: {
          a: {
            color: "#fff",
          },
          b: {
            color: "#fff",
            fontSize: 30,
          },
          c: {
            color: "#fff",
          },
        },
      },
      labelLine: {
        show: true,
        showAbove: true,
        lineStyle: {
          color: "#fff",
          width: 2,
        },
        length: 10,
        length2: 40,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      data: cityPartData(colorPellet),
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 240px;
}
</style>
