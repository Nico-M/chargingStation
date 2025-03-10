<template>
  <v-chart :option="chartOption" class="chart" autoresize></v-chart>
</template>

<script lang="ts" setup>
import chinaJson from "@/assets/json/china.json";
import VChart from "vue-echarts";
import { use, registerMap } from "echarts/core";
import { GeoComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type { GeoComponentOption } from "echarts/components";
import { ScatterChart, EffectScatterChart, GraphChart } from "echarts/charts";
import { capitalCities, highlightedCities } from "./mapData";


use([ScatterChart, EffectScatterChart, GeoComponent, GraphChart, SVGRenderer]);

type EChartsOption = ComposeOption<GeoComponentOption>;

registerMap("china", chinaJson as any);

const mapData: any[] = chinaJson.features.map(
  ({ properties }) => properties.name
);

const chartOption: EChartsOption = {
  backgroundColor: "transparent",
  geo: {
    map: "china",
    roam: false, // Disable zooming and moving
    label: {
      show: false,
    },
    itemStyle: {
      areaColor: "#061a1c",
      borderColor: "#195f61",
      borderWidth: 1,
    },
    emphasis: {
      disabled: true,
    },
    z: 1,
    zoom: 2.5, // 放大地图，值大于1表示放大
    center: [111, 34], // 设置地图中心点，数组表示经纬度坐标 [经度, 纬度]
    regions: mapData,
  },
  series: [
    {
      name: "省会城市",
      type: "scatter",
      coordinateSystem: "geo",
      roam: false,
      data: capitalCities,
      symbolSize: 10,
      emphasis: {
        disable: true,
      },
      itemStyle: {
        color: "rgba(0,0,0,0)",
        areaColor: "transparent",
        borderColor: "transparent",
        borderWidth: 1,
        shadowColor: "transparent",
      },
      label: {
        show: true,
        formatter(params: any) {
          return params.name;
        },
      },
    },
    {
      name: "高亮城市",
      type: "effectScatter",
      coordinateSystem: "geo",
      roam: false,
      data: highlightedCities,
      symbolSize: 30,
    //   symbolOffset: ['-100%', 0],
      emphasis: {
        scale: true,
      },
      showEffectOn: "render",
      rippleEffect: {
        brushType: "stroke",
      },
      tooltip: {
        formatter: function (val: {name: string, value: number[]}) {
          return val.name + ": " + val.value[2];
        },
      },
      itemStyle: {
        color: "#117359",
        shadowBlur: 10,
        shadowColor: "#333",
      },
      zlevel: 1,
      label:{
        show: true,
        formatter(params: {data:{data:number}}) {
          const {data} = params;
          return data.data;
        },
      }
    },
    {
      type: 'graphic',
      left: 0,
      top: 0,
      z: 100,
      bounding: 'raw',
      style: {
        image: createVignetteImage(),
        width: 1920,
        height: 1080
      }
    }
  ],
};

// 创建一个带有暗角效果的 Canvas 数据 URL
function createVignetteImage() {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // 创建径向渐变
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.width / 4, // 内圆
      canvas.width / 2, canvas.height / 2, canvas.width     // 外圆
    );
    
    // 设置渐变颜色
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');     // 中心透明
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.4)'); // 开始变暗
    gradient.addColorStop(1, 'rgba(0, 0, 0,1)');   // 边缘最暗
    
    // 填充渐变
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  return canvas.toDataURL();
}
</script>

<style lang="less" scoped>
.chart {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
}
</style>
