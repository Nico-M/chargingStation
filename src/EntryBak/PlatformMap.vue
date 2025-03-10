<template>
  <ScaleBox>
    <MapBg class="absolute top-0 left-0 z-[-1]" />
    <div class="px-4">
      <Header />
      <div class="content flex">
        <div class="sidebar-left flex flex-col gap-5">
          <!-- 实时统计 -->
          <RealTimeStatistics />
          <!-- 各市充电站占比 -->
          <ChargeStationProportion />
          <!-- 各市累计充电量统计 -->
          <CumulativeChargingCapacity />
        </div>
        <div class="main flex-1">
          <div class="today-account flex justify-around gap-6 mt-9">
            <div class="incoming-of-today">
              <div class="title text-center font-bold text-6">
                今日收益总数(元)
              </div>
              <div class="value text-center font-bold text-13 rounded-lg">
                3882.71
              </div>
            </div>
            <div class="order-of-today">
              <div class="title text-center font-bold text-6">
                今日日订单数(笔)
              </div>
              <div class="value text-center font-bold text-13 rounded-lg">
                208
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar-right flex flex-col gap-3">
          <!-- 代理商实时收益统计 -->
          <ProxyRealTimeStatistics />
          <!-- 12小时总收入时间轴 -->
          <TotalAmount12Hours />
          <!-- 各市充电交易额排行(今日) -->
          <ChargeRank />
        </div>
      </div>
    </div>
  </ScaleBox>
</template>

<script setup lang="ts">
import ScaleBox from "@/components/ScaleBox.vue";
import MapBg from "./MapBg.vue";
import Header from "@/components/Header.vue";
import RealTimeStatistics from "@/components/RealTimeStatistics/index.vue";
import ChargeStationProportion from "@/components/ChargeStationProportion/index.vue";
import CumulativeChargingCapacity from "@/components/CumulativeChargingCapacity/index.vue";
import ProxyRealTimeStatistics from "@/components/ProxyRealtimeStatistics/index.vue";
import TotalAmount12Hours from "@/components/TotalAmount12Hours/index.vue";
import ChargeRank from "@/components/ChargeRank/index.vue";
</script>

<style>
body {
  background: #041b1a;
}
</style>
<style scoped lang="less">
.content {
  .sidebar-left {
    width: 478px;
    flex-grow: 0;
  }
  .main {
    .incoming-of-today,
    .order-of-today {
      .value {
        width: 394px;
        height: 88px;
        background-color: var(--base-bg-color);
        color: var(--base-color);
        line-height: 88px;
      }
    }
  }
  .sidebar-right {
    width: 478px;
    flex-grow: 0;
  }
}
</style>
