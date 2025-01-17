<template>
    <div class="flex justify-center mt-8" v-if="pager.length > 0">
        <button class="flex px-4 h-6 items-center text-slate-400" :class="{'!text-rose-500 font-bold':p.active}" v-for="p in pager" @click="$emit('move',p.num)">{{ p.num }}</button>
    </div>
</template>
<script>
export default{
    props:['pager']
}
</script>