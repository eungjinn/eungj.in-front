<template>
    <div class="w-full h-screen overflow-hidden bg-cover bg-center relative" :style="{'background-image':'url(/DSC02286.JPG)'}">

        <swiper
            :loop="true"
            :modules="[EffectFade,Autoplay]"
            effect="fade"
            :fadeEffect="{ crossFade: true }"
            :speed="3000"
            :autoplay="{delay:5000}"
        >
            <swiper-slide v-for="slide in slides">
                <div class="w-full h-screen bg-center bg-cover" :style="{'background-image':'url('+slide.path+')'}">

                </div>
            </swiper-slide>
        </swiper>
        <div class="absolute left-0 top-0 w-full h-full flex items-center bg-black bg-opacity-30 z-20">
            <div class="container">
                <h2 class="text-white text-5xl font-bold">Hello brctest1</h2>
            </div>


        </div>
    </div>

</template>
<script setup>
import { EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';


const swiperOptions = {
    effect: 'fade', // fade 모드 설정
    loop: true, // 반복 설정 (필요시)
    autoplay: {
        delay: 500, // 자동 슬라이드 전환 시간 (ms)
    },
    fadeEffect: {
        crossFade: true, // 슬라이드 간 부드러운 전환 효과
    },
}

const slides = reactive([
    {path:'/DSC01434.JPG'},
    {path:'/DSC02286.JPG'},
    {path:'/DSC03266.JPG'}
])
</script>