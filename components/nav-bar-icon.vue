<template>
    <div id="icon" class="relative" :class="{'active':props.active}">
        <span :class="{'!bg-white':props.active && props.activeColor=='white'}"></span>
        <span :class="{'!bg-white':props.active && props.activeColor=='white'}"></span>
        <span :class="{'!bg-white':props.active && props.activeColor=='white'}"></span>
        <span :class="{'!bg-white':props.active && props.activeColor=='white'}"></span>
    </div>
</template>
<style lang="less" scoped>
#icon{
    span{
        @apply absolute left-0 w-full bg-black opacity-100 transition-all;
        height:2px;

        &:nth-child(1){
            @apply top-0;
        }

        &:nth-child(2),&:nth-child(3){
            @apply top-1/2 -translate-y-1/2;
        }

        &:nth-child(4){
            @apply bottom-0;
        }
    }

    &.active{
        span{
            &:nth-child(1),&:nth-child(4){
                @apply opacity-0;
            }
            &:nth-child(2){
                @apply rotate-45;
            }

            &:nth-child(3){
                @apply -rotate-45;
            }
        }
    }
}


</style>
<script setup>
import { ref } from 'vue'
const props = defineProps(['active','activeColor','inactiveColor'])

</script>