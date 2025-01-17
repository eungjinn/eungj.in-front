<template>


    <div class="bg-black">
        <h2 class="text-white">개발 테스트중</h2>
        <div class="container">
            <div class="masonry-layout">
                <div class="item"><img src="https://cafeptthumb-phinf.pstatic.net/MjAyNTAxMTdfMTMy/MDAxNzM3MDczNjE5NTc2.ejojeaZCNdICd6E10qOFFEtPuT6hQXf9eJgfGrC2Qz0g.BNar4htelOxsKMAIH_vS42eKv2D7oFip02e9KvByOFIg.JPEG/DAZ00806.jpeg?type=w1600"></div>
                <div class="item"><img src="https://cafeptthumb-phinf.pstatic.net/MjAyNTAxMTdfNDQg/MDAxNzM3MDczMzk1Njcw.0JCmNkdExJ-a5Q3-iN5uQWPzVRSkQyw1_5c01aEP7HUg.Kdkyg_WvLeaPNAUWzG__VUGZ6tvVl05J8PSiOvkd9LIg.JPEG/DAZ00940.jpeg?type=w1600"></div>
                <div class="item"><img src="https://cafeptthumb-phinf.pstatic.net/MjAyNTAxMTVfMjQy/MDAxNzM2OTQ2NjY3NzYz.CisGRnZfw7UL8q4mqmc_-6SqBc8S43y--yr5kzBzTXIg.BqeCPp6KuO4rWbvRTy8mZHAutuUA8Xu9wXoBtMp3E0Mg.JPEG/DAZ03780-Enhanced-NR-Edit-Edit-Edit.jpeg?type=w1600"></div>
                <div class="item"><img src="https://cafeptthumb-phinf.pstatic.net/MjAyNTAxMTVfMTAw/MDAxNzM2OTQ2NjY1OTU5.qbKssV-USufBzI4O8EDMxkgvLesGRLImYhfORGmIR6Mg.5HlZhS6V94yhBvws_9ID3m2Giq5uQaOqZiySZsuoWLkg.JPEG/DAZ03229-Enhanced-NR-Edit.jpeg?type=w1600"></div>
                <div class="item"><img src="https://cafeptthumb-phinf.pstatic.net/MjAyNTAxMTVfMjEx/MDAxNzM2OTQ2Njc1NDI2.kotBmFV2oLWQ_xK3NLF9JK7CD4hWru4Hn7lnBs5mtW4g.fWahw2xeL_rRhb_Ddpkz5nVrqC8Qn5ZzTyj8w0UUqAog.JPEG/DAZ02757-Enhanced-NR-Edit.jpeg?type=w1600"></div>
            </div>
        </div>
    </div>



</template>
<style lang="less" scoped>

.masonry-layout {
    column-count: 2; /* Control the number of columns */
    column-gap: 2rem; /* Gap between columns */
}

.item {
    @apply p-4 border border-slate-300 bg-white overflow-hidden;
    break-inside: avoid; /* Prevent items from breaking in between columns */
    margin-bottom: 2rem; /* Add margin between items */
    img{
        @apply hover:scale-150 transition-all;
    }
}
</style>
<script setup>
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort';

const data = reactive({
    images:[]
})

const inputItemImage = ref(null)
const addImage = () => {
    inputItemImage.value.click()
}

const changeItemImage = (e) => {
    for(let i=0;i<e.target.files.length;i++){
        const image = e.target.files[i]
        if(!image.type.includes('image')){
            return
        }

        data.images.push({
            file:image,
            path:URL.createObjectURL(image)
        })
    }
}
</script>