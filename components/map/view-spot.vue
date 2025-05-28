<template>
    <section class="mb-12">
        <h4 class="text-xl font-semibold">{{ data.name }}</h4>
        <p class="text-sm mt-2 text-slate-600">{{ data.address }}</p>
    </section>

    <section v-if="data.links.length > 0">
        <div class="title">
            <h5>링크</h5>
        </div>
        <ul>
            <li v-for="link in data.links">
                <a :href="link.url" target="_blank" class="flex items-stretch border border-slate-200 rounded-lg overflow-hidden mb-2 last:mb-0">
                    <div class="w-24 h-24 shrink-0">
                        <div class="w-full h-full bg-cover bg-center" :style="{'background-image':'url('+link.image+')'}"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex flex-col justify-between p-2">
                            <h6 class="line-clamp-2 text-sm font-medium tracking-tight ">{{ link.title }}</h6>
<!--                            <div class="flex">-->
<!--                                <div class="w-6">-->
<!--                                    <i class="fa-brands fa-instagram"></i>-->
<!--                                </div>-->
<!--                                <div class="flex-1">-->
<!--                                    <span class="block text-xs text-slate-500 leading-1">{{ link.url }}</span>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </section>
<!--    <hr>-->
<!--    <div>-->
<!--        {{ data }}-->
<!--    </div>-->
</template>
<script setup>
const props = defineProps(['data'])

</script>