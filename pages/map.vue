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
        <div class="absolute left-4 bottom-20 w-[240px]">
            <label class="rachel sq">
                <input type="checkbox" v-model="mapConfig.overlay.flight" @change="toggleOverlay" data-id="flight">
                <div><span>비행</span></div>
            </label>

            <label class="rachel sq">
                <input type="checkbox" v-model="mapConfig.overlay.flightPlans" @change="toggleOverlay" data-id="flightPlans">
                <div><span>비행허기/촬영신청</span></div>
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

<!--                <div>-->
<!--                    {{ searchs }}-->
<!--                </div>-->
            </div>
        </div>
    </div>

    <!-- view details -->
    <div
        class="fixed -right-full sm:-right-[400px] top-0 w-full sm:w-[400px] h-screen pb-16 sm:pb-20 pt-0 sm:pt-4 transition-all z-[200]"
        :class="{'!right-0':viewDetail.open}"
    >
        <div class="w-full h-full flex flex-col bg-white rounded-l-lg shadow-sm">
            <div class="h-16 border-b border-slate-200 flex justify-between items-center px-4">
                <h4>ddd</h4>
                <div>
                    <button @click="viewDetail.open=false"><i class="fa-light fa-times text-xl"></i></button>
                </div>
            </div>
            <div class="flex-1 overflow-y-scroll p-4">
                <map-view-spot :data="viewDetail.data" v-if="viewDetail.data"></map-view-spot>
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
    flight:[],
    flightPlans:[],
    spots:[],
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
        spots:true,
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

const viewDetail = reactive({
    open:false,
    type:null,
    data:null,
})

const getPlaces = (points) => {
    fetch('/apis/map/places',{
            method:'POST',
            body:JSON.stringify({
                points:points
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                // spots
                overlays.spots.forEach((spotMarker) => {
                    spotMarker.setMap(null)
                })
                overlays.spots = []
                data.dataset.spots.forEach((spot,spotIndex) => {
                    let iconContent = []

                    if(spot.groupIdx == 1){
                        iconContent.push('<div class="bg-black relative w-[20px] h-[20px] bg-[length:14px] rounded-full bg-center bg-no-repeat bg-contain" style="background-image:url(https://i.namu.wiki/i/pc5RM1pQUsoq-BnznoDdcnZ7DNmow8Oi3XPuPmFsPEtgkcaZh4TLd4w6IANOd67B-sL4KemuLGEBY9inBwb7xJMOo9ocPK8DFb8g0pXI2xDbFLZOaL741mpdjE54l0f0CEX5SOcX_eUHzOHZIypuOg.svg)">')
                    }else{
                        iconContent.push('<div class="bg-rose-500 relative w-[20px] h-[20px] rounded-full">')
                    }

                    if(map.value.getZoom() > 10){
                        iconContent.push('<span class="pt-1 text-xs break-keep font-semibold absolute top-full left-1/2 w-24 text-center -translate-x-1/2 text-slate-800 leading-4">'+spot.name+'</span>')
                    }

                    iconContent.push('</div>')
                    console.log(iconContent.join(''))

                    overlays.spots.push(
                        new naver.maps.Marker({
                            position: new naver.maps.LatLng(spot.lat,spot.lon),
                            map: map.value,
                            title: 'Green',
                            icon: {
                                // content: '<div class="relative w-[24px] h-[24px] rounded-full"><span class="absolute top-full -translate-x-1/2 text-rose-500">asdfasdfjo sd iogsdg sdga</span></div>',
                                content:iconContent.join(''),
                                size: new naver.maps.Size(20, 20),
                                anchor: new naver.maps.Point(10, 20),
                            },
                            // draggable: true,
                            clickable:true,
                        })
                    );


                })
                overlays.spots.forEach((spotMarker,index) => {
                    naver.maps.Event.addListener(spotMarker, 'click', () => {
                        console.log('index',index)
                        console.log('click!!',data.dataset.spots[index])
                        openSpot(data.dataset.spots[index].uuid,data.dataset.spots[index])
                    });
                })

                // 비행촬영계획
                overlays.flightPlans.forEach((draw) => {
                    draw.setMap(null)
                })
                data.dataset.areas.forEach((area,areaIndex) => {
                    overlays.flightPlans.push(
                        new naver.maps.Circle({
                            map: map.value,
                            center: new naver.maps.LatLng(area.lat,area.lon),
                            radius: area.radius,
                            fillColor: '#2185c5',
                            fillOpacity: 0.2,
                            strokeWeight:0,
                            zIndex:60,
                            clickable:true,
                        })
                    );
                })

            }else{
                alert(data.message)
            }
        })
}

const openSpot = (spotId) => {

    fetch('/apis/spot/'+spotId,{
            method:'GET',
        })
        .then(response => response.json())
        .then(data => {
            if(data.result){
                viewDetail.type = 'spot'
                viewDetail.data = data.dataset.spot
                viewDetail.open = true
                viewDetail.type = 'spot'
            }else{
                alert(data.message)
            }
        })
}

const boundsChanged = (bounds) => {
    console.log('bounds',bounds)

    const swLng = bounds._sw._lng;
    const swLat = bounds._sw._lat;
    const neLng = bounds._ne._lng;
    const neLat = bounds._ne._lat;

    // 사각형 꼭짓점 시계방향
    const points = [
        [swLng, swLat], // SW
        [swLng, neLat], // NW
        [neLng, neLat], // NE
        [neLng, swLat], // SE
        [swLng, swLat]  // 다시 SW (닫아야 함)
    ];
    getPlaces(points)
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