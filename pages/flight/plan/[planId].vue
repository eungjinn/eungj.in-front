<template>
    <div class="relative w-full h-screen flex">
        <div class="flex-1 relative sticky top-0 ">
            <div class="absolute right-4 top-4 z-30">
                <button @click="setMapType('normal')">일반</button>
                <button @click="setMapType('hybrid')">위성</button>
            </div>
            <div id="mapPlan" class=" w-full h-full"></div>
        </div>
        <div class="w-[400px] bg-white px-4">
            <template v-if="plan">
                <ul>
                    <li
                        v-for="area in plan.areas"
                        class="flex items-center px-4 py-2"
                        @click="mapMoveTo(area.lat,area.lon)"
                    >
                        <div>
                            <h4>{{ area.address }}</h4>
                            <div class="flex">
                                <span class="text-xs text-slate-500 ml-3">{{ area.purpose }}</span>
                                <span class="text-xs text-slate-500 ml-3">{{ area.target }}</span>
                            </div>
                            <div class="flex">
                                <span class="text-xs text-slate-500 ml-3">{{ area.radius }}m</span>
                                <span class="text-xs text-slate-500 ml-3">{{ area.altitude }}m</span>
                                <span class="text-xs text-slate-500 ml-3">{{ area.speed }}km/h</span>
                            </div>

                        </div>
                    </li>
                </ul>

                <div class="text-sm leading-relaxed bg-slate-100 rounded-lg p-4">
                    <div v-html="formatLineBreak(plan.proContent)"></div>
                    <div v-html="formatLineBreak(plan.proContent)"></div>
                    <div v-html="formatLineBreak(plan.proContent)"></div>
                    <div v-html="formatLineBreak(plan.proContent)"></div>
                </div>
            </template>

        </div>
    </div>
</template>
<script setup>
import {onMounted} from "vue";

const route = useRoute()
const planId = route.params.planId

const mapMoveTo = (lat,lon) => {
    map.value.setCenter(new naver.maps.LatLng(lat, lon))
}

const setMapType = (type) => {
    console.log(type)
    console.log(naver.maps.MapTypeId)
    map.value.setMapTypeId(type)
}

const plan = ref(null)
const getPlan = () => {
    fetch('/apis/flight/plan/'+planId,{
            method:'GET',
        })
        .then(response => response.json())
        .then(data =>{
            if(data.result){
                plan.value = data.dataset.plan
                generateMap()
            }else{
                alert(data.message)
            }
        })
}

useHead({
    script: [
        {
            type: 'text/javascript',
            src: "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=o0t1a3gqes",
        },
    ]
})

const map = ref(null)
const generateMap = () => {
    console.log('generate map')
    const center = new naver.maps.LatLng('37.492787', '127.041680')
    map.value = new naver.maps.Map('mapPlan', {
        center: center,
        zoom: 16
    });

    const circles = []
    plan.value.areas.forEach((area,areaIndex) => {
        circles[areaIndex] = new naver.maps.Circle({
            map: map.value,
            center: new naver.maps.LatLng(area.lat,area.lon),
            radius: area.radius,
            fillColor: '#2185c5',
            fillOpacity: 0.7,
            strokeWeight:0,
            zIndex:5,
            clickable:true,
        });
        naver.maps.Event.addListener(circles[areaIndex], 'mouseover', () => {
            circles[areaIndex].setOptions({
                fillOpacity: 0.2
            });
        });
        naver.maps.Event.addListener(circles[areaIndex], 'mouseout', () => {
            circles[areaIndex].setOptions({
                fillOpacity: 0.7
            });
        });
    })
}

const formatLineBreak = (value) => {
    return value.replace(/\n/g, '<br>');
}

onMounted(() => {
    getPlan()
})
</script>