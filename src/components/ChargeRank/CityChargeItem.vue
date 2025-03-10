<template>
    <div class="city-charge-item">
        <div class="city-info flex justify-between mb-1">
            <span class="city-name">{{ cityName }}</span>
            <span class="charge-amount" :style="{
                color: color || '#fff'
            }">{{ amountDisplay }}</span>
        </div>
        <ProgressBar :percentage="percentage" :height="16"/>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import ProgressBar from '../widget/ProgressBar.vue';

const props =defineProps<{
    cityName: string;
    chargeAmount: number;
    percentage: number;
    color?: string;
}>();

const amountDisplay = computed(() => {
    return `${props.chargeAmount}元`
})
</script>