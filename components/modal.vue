<template>
    <div
        class="fixed left-0 top-0 w-full h-screen opacity-0  transition-all duration-150  z-50 px-2"
        :class="{'overflow-scroll py-10':props.overflow,'flex justify-center items-center':!props.overflow}"
         ref="wrap">
        <div class="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-10" @click="bgClick"></div>
        <div class="bg-white rounded-lg z-20 relative w-full" :class="{'lg:w-96':(size==null || size==''),'lg:w-[480px]':size=='lg','lg:w-[640px]':size=='xl', 'mx-auto':props.overflow}">
            <div class="flex items-center justify-between px-4 bg-white border-b border-slate-200 h-16 rounded-t-lg sticky -top-10 z-30">
                <h4 class="text-lg font-semibold text-slate-600">{{ title }}</h4>
                <button @click="close" class="px-2 h-10 flex items-center justify-center transition-all hover:scale-150"><i class="fa-light fa-times text-lg"></i></button>
            </div>

            <div class="py-6 px-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import { useHead } from '#app'
const emit = defineEmits(['close'])
const props = defineProps({
    title:String,
    preventBgClick:Boolean,
    size:String,
    overflow:Boolean
})
const wrap = ref(null)

const close = () => {
    wrap.value.classList.remove('!opacity-100')
    setTimeout(() => {
        emit('close')
    },150)
}

const bodyClass = ref(true)

const bgClick = () => {
    if(!props.preventBgClick){
        close()
    }
}

const pressKey = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        bgClick()
    }
}

onMounted(() => {
    setTimeout(() => {
        wrap.value.classList.add('!opacity-100')
    },1)

    window.addEventListener('keyup', pressKey)
})

onBeforeUnmount(() => {
    window.removeEventListener('keyup', pressKey)
})

useHead({
    bodyAttrs: {
        class: bodyClass ? ' scroll-fix ' : ''
    }
})
</script>