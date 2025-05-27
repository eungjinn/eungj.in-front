<template>
    <div class="relative w-full h-screen flex">
        <div class="flex-1 relative sticky top-0 ">
            <div class="absolute right-4 top-4 z-30">
                <button @click="setMapType('normal')">일반</button>
                <button @click="setMapType('hybrid')">위성</button>
                <div>

                </div>
            </div>
            <div id="map" class=" w-full h-full"></div>
        </div>
    </div>

</template>
<script setup>
import {onMounted} from "vue";

const route = useRoute()

const { data:data } = await useAsyncData(() => $fetch('/apis/flight/statics',{
    method:'GET',
    responseType:'json',
}))
console.log(data.value)

const setMapType = (type) => {
    console.log(type)
    console.log(naver.maps.MapTypeId)
    map.value.setMapTypeId(type)
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
    const center = new naver.maps.LatLng('37.492787', '127.041680')
    map.value = new naver.maps.Map('map', {
        center: center,
        zoom: 9
    });

    // FlightZone 설정
    data.value.dataset.zones.prh.forEach((zone) => {
        const paths = []
        zone.polygon.forEach((p1) => {
            const path = []
            p1.forEach(p2 => {
                path.push(new naver.maps.LatLng(p2[1], p2[0]))
            })
            paths.push(path)
        })
        new naver.maps.Polygon({
            map: map.value,
            paths: paths,
            fillColor: '#ff0000',
            fillOpacity: 0.2,
            strokeColor: '#ff0000',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            zIndex:50,
        });
    })

    // FlightZone 설정
    data.value.dataset.zones.res.forEach((zone) => {
        const paths = []
        zone.polygon.forEach((p1) => {
            const path = []
            p1.forEach(p2 => {
                path.push(new naver.maps.LatLng(p2[1], p2[0]))
            })
            paths.push(path)
        })
        new naver.maps.Polygon({
            map: map.value,
            paths: paths,
            fillColor: '#00ff00',
            fillOpacity: 0.3,
            strokeColor: '#00ff00',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            zIndex:30
        });
    })

    // FlightZone 설정
    data.value.dataset.zones.ctr.forEach((zone) => {
        const paths = []
        zone.polygon.forEach((p1) => {
            const path = []
            p1.forEach(p2 => {
                path.push(new naver.maps.LatLng(p2[1], p2[0]))
            })
            paths.push(path)
        })
        new naver.maps.Polygon({
            map: map.value,
            paths: paths,
            fillColor: '#0000ff',
            fillOpacity: 0.3,
            strokeColor: '#0000ff',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            zIndex:30
        });
    })


    // area
    const circles = []
    data.value.dataset.areas.forEach((area,areaIndex) => {
        circles[areaIndex] = new naver.maps.Circle({
            map: map.value,
            center: new naver.maps.LatLng(area.lat,area.lon),
            radius: area.radius,
            fillColor: '#2185c5',
            fillOpacity: 0.7,
            strokeWeight:0,
            zIndex:200,
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



    let bc
    naver.maps.Event.addListener(map.value, "bounds_changed", function(bounds) {
        clearTimeout(bc)
        bc = setTimeout(()=>{
            console.log(bounds)
        },100)
    });
}

onMounted(() => {
    generateMap()
})
</script>