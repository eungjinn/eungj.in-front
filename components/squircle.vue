<template>
    <div class="image">
        <div :style="{'background-image':'url('+image+')'}"></div>
    </div>
</template>
<style lang="less" scoped>
.image{
    >div{
        @apply bg-cover bg-center pb-full bg-slate-200;

    }
    -webkit-mask-image:url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e");
    mask-image:url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e");
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
}
</style>
<script>
export default {
    props:['image']
}
</script>