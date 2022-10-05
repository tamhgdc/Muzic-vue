<template>
    <section class="home-section flex flex-col justify-start space-y-16">
        <Gallery :items="banner" />
        <div v-if="!isLoadingHome" class="playlists-section flex flex-col space-y-16">
            <Playlists v-for="playlist in playlists" :key="playlist.title" :playlistTitle="playlist.title"
                :playlist="playlist.items" :isLoading="isLoadingHome" />
        </div>
        <div v-else class="playlists-section flex flex-col space-y-16">
            <Playlists v-for="i in 5" :isLoading="isLoadingHome" />
        </div>
        <Tabs :TabCount="2">
            <template #tabsTitle>
                <h2 class="text-4xl font-bold h-[3rem] max-w-[30rem] truncate">Mới phát hành</h2>
            </template>
            <template #heading1>
                <div class="border-2 border-gray-400 rounded-full p-2 hover:bg-third transition-colors ease-out-expo">
                    Bài Hát
                </div>
            </template>
            <template #heading2>
                <div class="border-2 border-gray-400 rounded-full p-2 hover:bg-third transition-colors ease-out-expo">
                    Albums
                </div>
            </template>
            <template #body1>
                <MusicList 
                    :list="newReleaseSongs" 
                    :isLoading="isLoadingHome" 
                    :type="1"
                    :playlistId="''"
                    class="grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-4"
                />
            </template>
            <template #body2>
                <MusicList 
                    :list="newReleaseAlbums" 
                    :isLoading="isLoadingHome" 
                    :type="0"
                    :playlistId="''"
                    class="grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-4"
                />
            </template>
        </Tabs>
        <FavoriteArtists :favoriteArists="favoriteArtists"/>
        <div class="chart w-full text-2xl">
            <div class="chart__inner container flex flex-col justify-center items-center space-y-8">
                <div class="w-full flex justify-between">
                    <h2 class="text-4xl font-bold max-w-[30rem] truncate">Bảng xếp hạng</h2>
                    <Button>
                        <span class="flex justify-center items-center space-x-4">
                            <span>Tất cả</span>
                            <img :src="arrowForward" alt="forward" class="w-[1.5rem] h-[1.5rem]">
                        </span>
                    </Button>
                </div>
                <MusicList 
                    :list="chart"  
                    :isLoading="isLoadingHome"
                    :type="1"
                    :playlistId="''"
                    class="w-full h-full flex flex-col"
                />
            </div>
        </div>
        <div class="w-full">
            <div class="w-full h-full container">
                <ul v-if="!isLoadingHome" class="flex flex-col md:flex-row items-center">
                    <li v-for="item in weekChart" :key="item.country" class="w-full h-full md:w-[calc(100%/3)] flex-auto m-3 rounded-md overflow-hidden cursor-pointer">
                        <img 
                            class="w-full h-full object-cover hover:scale-110 transition-transform ease-out-expo duration-700"
                            v-lazy="item.banner" 
                            :alt="item.country"
                        >
                    </li>
                </ul>
                <ul v-else class="flex flex-col md:flex-row items-center">
                    <li v-for="i in 3" class="w-full h-[5rem] md:w-[calc(100%/3)] flex-auto m-3 rounded-md overflow-hidden cursor-pointer">
                        <Skeleton/>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Gallery from "../components/Gallery/Gallery.vue";
import Playlists from "../components/Playlists.vue";
import Tabs from "../components/Tabs/Tabs.vue";
import MusicList from "../components/MusicList.vue";
import FavoriteArtists from "../components/FavoriteArtists.vue";
import Button from "../components/Button/Button.vue";
import Skeleton from "../components/Skeleton/Skeleton.vue";
import { ref, onMounted, toRefs, computed } from "vue";
import type { HomeData, Banner, Playlist, NewRelease, FavoriteArtist, Song, WeekChart } from "../types/Types";
import { getHome } from "../api/Home";
import { useGlobal } from "../stores/Global";
import { arrowForward } from "../composables/Icons";

const { isLoadingHome } = toRefs(useGlobal());
const homeData = ref<HomeData[]>([]);
const banner = ref<Banner[]>([]);
const playlists = ref<Playlist[]>([]);
const newRelease = ref<NewRelease>();
const favoriteArtists = ref<FavoriteArtist[]>([]);
const chart = ref<Song[]>([]);
const weekChart = ref<WeekChart[]>([]);

const setLoadingStatus = (status: boolean): void => {
    isLoadingHome.value = status;
}

const setHomeData = (data: HomeData): void => {
    homeData.value = data.items;
}

const getBanner = (): any => homeData.value.find(data => data.sectionType === "banner")?.items;
const getPlaylists = (): any => homeData.value.filter(data => data.sectionType === "playlist");
const getNewRelease = (): any => homeData.value.find(data => data.sectionType === "new-release")?.items.pop();
const getFavoriteArtists = (): any => homeData.value.find(data => data.sectionType === "mix")?.items;
const newReleaseSongs = computed(() => newRelease.value ? newRelease.value.song : []);
const newReleaseAlbums = computed(() => newRelease.value ? newRelease.value.album : []);
const getChart = (): any => homeData.value.find(data => data.sectionType === "RTChart")?.items;
const getWeekChart = (): any => homeData.value.find(data => data.sectionType === "weekChart")?.items;

onMounted(async () => {
    setLoadingStatus(true);
    const data = await getHome();
    setHomeData(data);
    banner.value = getBanner();
    playlists.value = getPlaylists();
    newRelease.value = getNewRelease();
    favoriteArtists.value = getFavoriteArtists();
    chart.value = getChart();
    weekChart.value = getWeekChart();
    setLoadingStatus(false);
});
</script>

<style lang="scss" scoped>
</style>