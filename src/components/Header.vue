<template>
    <div class="flex relative">
        <div class="position left-0 top-0 z-[-1]">
            <AnimateLeftLine class="absolute top-5 left-0" />
            <AnimateRightLine class="absolute top-5 right-0" />
        </div>
        
        <div class="date-display flex flex-col flex-[1] pt-4">
            <span class="date">{{currentDate}}</span>
            <span class="time">{{currentTime}}</span>
        </div>
        <div class="page-header-wrapper  flex-[2] ">
            <div class="page-header mx-auto text-center text-10 font-bold w-[674px] h-[77px] leading-[77px] uppercase"
                :class="[isCh ? 'text-10' : 'text-8']"
            >
                {{ TITLE }}
            </div>
        </div>
        <div class="location flex flex-[1] justify-end pt-2 items-center" >
            <div class="location flex items-center">
                <!-- <img :src="location" alt="location" /> -->
                 <LocationIcon />
                <span class="ml-2">{{t('location')}}</span>
            </div>
            <div class="company ml-12 text-4.5">
                {{t('companyName')}}
            </div>
            <component :is="isCh ? zhToEnIcon : enToZhIcon" class="ml-12 cursor-pointer" @click="toggleLanguage" />
        </div>
 </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
import LocationIcon from '@/assets/icons/location.svg';
import AnimateLeftLine from './widget/AnimateLeftLine.vue';
import AnimateRightLine from './widget/AnimateRightLine.vue';
import { useI18n } from 'vue-i18n';
import enToZhIcon from '@/assets/icons/enToZh.svg'
import zhToEnIcon from '@/assets/icons/zhToEn.svg'

const { t, locale } = useI18n();
const TITLE = computed(() => t('title'));


const isCh = computed(() => locale.value === 'zh');

// format to 2024年10月25日 星期四
const FORMAT = computed(() => isCh.value ? 'YYYY年MM月DD日 dddd' : 'YYYY-MM-DD dddd');
const currentDate = computed(() => dayjs().format(FORMAT.value));

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
    
const toggleLanguage = () => {
    locale.value = isCh.value ? 'en' : 'zh';
    
    localStorage.setItem("localLanguage", locale.value);
    window.location.reload(); // Uncommenting to reload the page after language change
};

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
