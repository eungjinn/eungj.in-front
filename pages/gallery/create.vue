<template>
    <div class="container">
        <SlickList axis="xy" v-model:list="dataset.images" class="grid grid-cols-3 lg:grid-cols-6 gap-0 -mx-2">
            <SlickItem v-for="(image,imageIndex) in dataset.images" :key="image" :index="imageIndex" class="p-2">
                <div class="pb-full relative border border-slate-200">
                    <div v-if="imageIndex == 0" class="absolute left-0 top-0 flex h-8 bg-black bg-opacity-50 text-white text-xs items-center px-4 z-20 w-full lg:w-auto justify-center">대표 이미지</div>
                    <div class="absolute left-0 top-0 w-full h-full bg-cover bg-center" :style="{'background-image':'url('+image.path+')'}"></div>
                </div>
            </SlickItem>

            <div class="pb-full relative">
                <div class="p-2 absolute left-0 top-0 w-full h-full">
                    <div class="relative h-full">
                        <button @click="addImage" class="absolute left-0 top-0 w-full h-full bg-white">
                            <div class="absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col border border-dashed border-slate-300 text-slate-400 cursor-pointer">
                                <i class="fa-light fa-image text-xl mb-4"></i>
                                <span>이미지 추가</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>



        </SlickList>

        <input type="file" ref="inputItemImage" @change="changeItemImage" class="hidden" accept="image/*" multiple>

        <div>
            {{ dataset }}
        </div>

        <button @click="saveGallery" class="btn btn-primary">저장</button>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort';

const dataset = reactive({
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

        dataset.images.push({
            file:image,
            path:URL.createObjectURL(image)
        })
    }
}

const saveGallery = async () => {
    const formData = new FormData()

    if(dataset.images.length > 0){
        dataset.images.forEach((image,index) => {
            formData.append('image['+index+'][file]',image.file)
            formData.append('image['+index+'][index]',index)

            if(image.uuid){
                formData.append('image['+index+'][uuid]',image.uuid)
            }
        })
    }else{
        // alert('사진이 없습니다')
    }

    formData.append('title','aaa');

    const adminAT = localStorage.getItem('adminAT')
    const response = await fetch('/api/gallery',{
        method:'POST',
        body:formData,
        headers:{
            'Authorization':'Bearer '+adminAT
        }
    })
    const data = await response.json()

}
</script>