<template>
    <div class="relative w-full h-screen pb-16 flex">
        <div class="absolute right-4 top-4 z-30">
            <button @click="setMapType('normal')">일반</button>
            <button @click="setMapType('hybrid')">위성</button>
            <div>

            </div>
        </div>
        <div id="map" class="w-full h-full"></div>

        <!-- 설정 -->
        <div class="absolute left-4 bottom-4 w-[240px]">
            <label class="rachel sq">
                <input type="checkbox" v-model="mapConfig.overlay.flight" @change="toggleOverlay" data-id="flight">
                <div><span>비행</span></div>
            </label>
        </div>

        <!-- 좌척 검색 -->
        <div class="absolute left-4 top-4 w-[240px]">
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <label class="flex ">
                    <input type="text" class="h-14 outline-none px-4" placeholder="검색어" v-model="searchs.keyword" @keyup.enter="doSearch">
                    <button @click="doSearch"><i class="fa-light fa-search"></i></button>
                </label>

                <div v-if="searchs.results">
                    <div
                        v-for="poi in searchs.results.poi.list"
                        class="px-3 py-2 border-b border-slate-200"
                        @click="moveMapLatLon(poi.lat,poi.lon)"
                    >
                        <h4 class="font-medium">{{ poi.name }}</h4>
                        <p class="text-xs text-slate-600 mt-1">{{ poi.address }}</p>
                    </div>
                </div>

                <div>
                    {{ searchs }}
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import {onMounted} from "vue";

const route = useRoute()

const { data:data } = await useAsyncData(() => $fetch('/apis/map/statics',{
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

const moveMapLatLon = (lat,lon) => {
    map.value.setCenter(new naver.maps.LatLng(lat,lon))
}

const map = ref(null)
const overlays = {
    flight:[]
}
const generateMap = () => {
    const center = new naver.maps.LatLng('37.492787', '127.041680')
    map.value = new naver.maps.Map('map', {
        center: center,
        zoom: 16
    });


    drawOverlayFlight()





    let bc
    naver.maps.Event.addListener(map.value, "bounds_changed", function(bounds) {
        clearTimeout(bc)
        bc = setTimeout(()=>{
            boundsChanged(bounds)
        },100)
    });
}

const toggleOverlay = (e) => {
    const id = e.target.dataset.id
    const show = e.target.checked
    overlays[id].forEach((o) => {
        o.setVisible(show)
    })
}

const drawOverlayFlight = () => {
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
        overlays.flight.push(
            new naver.maps.Polygon({
                map: map.value,
                paths: paths,
                fillColor: '#ff0000',
                fillOpacity: 0.2,
                strokeColor: '#ff0000',
                strokeOpacity: 0.6,
                strokeWeight: 3,
                zIndex:50,
            })
        );
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
        overlays.flight.push(
            new naver.maps.Polygon({
                map: map.value,
                paths: paths,
                fillColor: '#00ff00',
                fillOpacity: 0.3,
                strokeColor: '#00ff00',
                strokeOpacity: 0.6,
                strokeWeight: 3,
                zIndex:30
            })
        );
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
        overlays.flight.push(
            new naver.maps.Polygon({
                map: map.value,
                paths: paths,
                fillColor: '#0000ff',
                fillOpacity: 0.3,
                strokeColor: '#0000ff',
                strokeOpacity: 0.6,
                strokeWeight: 3,
                zIndex:30
            })
        );
    })
}

const mapConfig = reactive({
    overlay:{
        flight:true,
        flightPlan:true,
    }
})

const searchs = reactive({
    keyword:'',
    result:null,
})
const doSearch = (e) => {
    console.log(e)
    if(!searchs.keyword){
        alert('검색어를 입력하세요')
        return
    }

    fetch('/apis/map/search?keyword='+searchs.keyword,{
            method:'GET',
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                searchs.results = data.dataset.results

                if(data.dataset.results.poi.list.length > 0){
                    moveMapLatLon(data.dataset.results.poi.list[0].lat,data.dataset.results.poi.list[0].lon)
                    data.dataset.results.poi.list.forEach((d) => {
                        console.log(d)

                        new naver.maps.Marker({
                            position: new naver.maps.LatLng(d.lat,d.lon),
                            map: map.value
                        });
                    })
                }

            }else{
                alert(data.message)
            }
        })
}

const getFlightPlans = () => {

}

const boundsChanged = (bounds) => {
    console.log('bounds',bounds)
    console.log(bounds._sw)
}

onMounted(() => {
    generateMap()

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            moveMapLatLon(lat,lon)
            console.log(position.coords)
        }, (err) => {
            console.error(err)
        })
    }else{
        console.error('geolocation error')
    }
})
</script>