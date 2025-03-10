<template>
  <div class="proxy-realtime-statistics">
    <BorderHeader :title="t('agentRealtimeIncome')" />
    <vue3ScrollSeamless
      :dataList="proxyStatistics"
      class="wrap mt-2"
      :classOptions="classOptions"
    >
      <ul class="content">
        <!-- Placeholder for proxy statistics items -->
        <IncomingItem
          class="mt-2 py-2"
          v-for="(stat, index) in proxyStatistics"
          :key="index"
          :proxyName="stat.proxyName"
          :proxyAmount="stat.proxyAmount"
          :time="stat.time"
          :proxyType="stat.proxyType"
        />
      </ul>
    </vue3ScrollSeamless>
  </div>
</template>

<script setup lang="ts">
import IncomingItem, { IncomingType } from "./IncomingItem.vue";
import type { IncomingItemProps } from "./IncomingItem.vue";
import BorderHeader from "../BorderHeader.vue";
// @ts-ignore
import { vue3ScrollSeamless } from 'vue3-scroll-seamless';
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const classOptions = {
  limitMoveNum: 5,
  singleHeight: 50,
};

const proxyStatistics: IncomingItemProps[] = [
  {
    proxyName: "代理商1",
    proxyAmount: 1000,
    time: "2021-09-01 12:00:00",
    proxyType: IncomingType.DEAL_INCOMING,
  },
  {
    proxyName: "代理商2",
    proxyAmount: 2000,
    time: "2021-09-02 12:00:00",
  },
  {
    proxyName: "代理商3",
    proxyAmount: 3000,
    time: "2021-09-03 12:00:00",
  },
  {
    proxyName: "代理商4",
    proxyAmount: 4000,
    time: "2021-09-04 12:00:00",
  },
  {
    proxyName: "代理商5",
    proxyAmount: 5000,
    time: "2021-09-05 12:00:00",
  },
  {
    proxyName: "代理商6",
    proxyAmount: 5000,
    time: "2021-09-06 12:00:00",
  },
  {
    proxyName: "代理商7",
    proxyAmount: 6000,
    time: "2021-09-07 12:00:00",
  },
];
</script>

<style scoped>
.wrap {
  height: 240px;
  overflow: hidden;
}
</style>
