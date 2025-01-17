<template>
    <NuxtLayout>
        <nuxt-page></nuxt-page>
    </NuxtLayout>
</template>
<script setup>
useHead({
    link: [
        // { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // { rel: 'manifest', href: '/manifest.webmanifest' }
    ]
})

useSeoMeta({
    title:'응진',
    ogTitle:'EUNGJ.IN',
})


</script>