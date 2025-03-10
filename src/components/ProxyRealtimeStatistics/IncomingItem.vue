<template>
  <li class="flex incoming-item gap-3 ml-2">
    <Triangle class="ml-2 mt-2"  />
    <span class="time">
      {{ time }}
    </span>
    <span class="proxy-name">
      {{ proxyName }}
    </span>
    <span class="proxy-amount">
      {{ proxyTypeTextMap[proxyType] }}
      {{ proxyAmount }}{{ currency }}
    </span>
  </li>
</template>
<script lang="ts">
import Triangle from '../widget/Triangle.vue';
export enum IncomingType {
  "DEAL_INCOMING" = "DEAL_INCOMING",
  "OPERATE_INCOMING" = "OPERATE_INCOMING",
}

export interface IncomingItemProps {
  time: string;
  proxyName: string;
  proxyType?: IncomingType;
  proxyAmount: number;
  currency?: string;
}
</script>

<script setup lang="ts">
const DEAL_INCOMING_TEXT = "交易分润入账";
const OPERATE_INCOMING_TEXT = "运营收益入账";

const proxyTypeTextMap: Record<IncomingType, string> = {
  [IncomingType.DEAL_INCOMING]: DEAL_INCOMING_TEXT,
  [IncomingType.OPERATE_INCOMING]: OPERATE_INCOMING_TEXT,
};

const props = defineProps<IncomingItemProps>();

const { time, proxyName, proxyType=IncomingType.OPERATE_INCOMING, proxyAmount, currency = "元" } = props;
</script>

<style scoped>
.incoming-item{
  border-left: 2px solid var(--base-color);
  background-color: var(--base-bg-color);
  color: var(--base-color);
}
</style>
