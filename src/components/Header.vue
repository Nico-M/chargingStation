<template>
    <div class="flex relative">
        <AnimateLeftLine class="absolute top-5 left-0" />
        <AnimateRightLine class="absolute top-5 right-0" />
        <div class="date-display flex flex-col flex-[1] pt-4">
            <span class="date">{{currentDate}}</span>
            <span class="time">{{currentTime}}</span>
        </div>
        <div class="page-header-wrapper  flex-[2] ">
            <div class="page-header mx-auto text-center text-10 font-bold w-[674px] h-[77px] leading-[77px]">
                {{ TITLE }}
            </div>
        </div>
        <div class="location flex flex-[1] justify-end pt-2 items-center" >
            <div class="location flex items-center">
                <!-- <img :src="location" alt="location" /> -->
                 <LocationIcon />
                <span class="ml-2">全国</span>
            </div>
            <div class="company ml-12 text-4.5">
                宜来电(湖北)智能科技
            </div>
        </div>
 </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue';
import dayjs from 'dayjs';
import LocationIcon from '@/assets/icons/location.svg';
import AnimateLeftLine from './widget/AnimateLeftLine.vue';
import AnimateRightLine from './widget/AnimateRightLine.vue';
const TITLE = '宜来电充电桩数据信息平台';

// format to 2024年10月25日 星期四
const currentDate = dayjs().format('YYYY年MM月DD日 dddd');

// format to 09:48:44
const currentTime = ref<string>(dayjs().format('HH:mm:ss'));

// interval
let intervalId: NodeJS.Timeout;

const updateCurrentTime = () => {
    currentTime.value = dayjs().format('HH:mm:ss');
};

onMounted(() => {
     intervalId = setInterval(updateCurrentTime, 1000);
});

onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
</script>

<style scoped lang="less">
@import '../design/responseBg.less';
.page-header{
    .bg-image('../assets/images/bg-title');
}
</style>
