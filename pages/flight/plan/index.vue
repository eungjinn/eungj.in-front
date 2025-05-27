<template>
    <div class="container">

        <div>
            <div
                v-for="area in areas"
                class="border-b border-slate-200"
                @click="$router.push('/flight/plan/'+area.planId)"
            >
                <div
                    class="flex items-center py-3"
                    :class="{'opacity-30':($dayjs.unix(area.endAt) < $dayjs())}"
                >
                    <div>
                        {{ area.applyNo }}
                        <div class="flex items-center">
                            <span
                                class="flex w-12 h-6 bg-slate-300 items-center justify-center rounded-lg text-xs font-semibold text-white"
                                :class="{
                                    '!bg-slate-300 !text-slate-500':area.planStatus==9,
                                    '!bg-amber-500':area.planStatus==1 || area.planStatus==4,
                                    '!bg-green-500':area.planStatus==7
                                }"
                            >
                                <template v-if="area.planStatus == 1">신청</template>
                                <template v-if="area.planStatus == 4">처리중</template>
                                <template v-if="area.planStatus == 7">완료</template>
                                <template v-if="area.planStatus == 8">반려</template>
                                <template v-if="area.planStatus == 9">취소</template>
                            </span>

                            <span class="flex ml-2 w-16 h-6 bg-rose-500 items-center justify-center rounded-lg text-xs font-semibold text-white">
                            <template v-if="area.type == 3">
                                <i class="fa-light fa-drone-alt text-lg"></i>
                                <span class="ml-1">비행</span>
                            </template>
                            <template v-if="area.type == 5">
                                <i class="fa-light fa-camera-alt text-lg"></i>
                                <span class="ml-1">촬영</span>
                            </template>
                        </span>
                        </div>
                    </div>
                    <div class="flex-1 mx-6">
                        <p class="mb-1 text-sm text-slate-500">{{ $dayjs.unix(area.startAt).format('YYYY-MM-DD(ddd)')}} ~ {{ $dayjs.unix(area.endAt).format('YYYY-MM-DD(ddd)')}}</p>
                        <h4 class="text-lg font-semibold">{{ area.address }}</h4>
                    </div>
                    <div>
                        {{ area.depName }}
                    </div>
                    <div>
                        {{ $dayjs.unix(area.createdAt).format('YYYY-MM-DD(ddd)')}}
                    </div>
                </div>
            </div>
        </div>

        <hr>
        {{ plans }}
    </div>
</template>
<script setup>
import {onMounted} from "vue";

const areas = ref(null)
const getAreas = () => {
    fetch('/apis/flight/plan',{
            method:'GET',
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                areas.value = data.dataset.areas
            }else{
                alert(data.message)
            }
        })
}

onMounted(() => {
    getAreas()
})
</script>