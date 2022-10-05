<template>
    <div class="playlists">
        <div class="playlists__inner container flex flex-col justify-between space-y-8">
            <div class="playlists-heading text-4xl font-bold h-[3rem] max-w-[30rem]">
                <h2 v-if="!isLoading" class="playlists-heading__text truncate max-w-[30rem]" v-text="playlistTitle" />
                <Skeleton v-else/>
            </div>
            <Swiper
                v-if="!isLoading"
                :slides-per-view="2"
                :space-between="15"
                :breakpoints="breakpoints"
                class="playlists__list w-full max-h-[42rem]"
            >
                <SwiperSlide 
                    v-for="item in playlist" 
                    :key="item.encodeId"
                    class="cursor-pointer"
                >
                    <PlaylistCard 
                        :thumbnail="item.thumbnailM" 
                        :title="item.title" 
                        :artistsName="item.artistsNames" 
                        :encodeId="item.encodeId"
                        :isLoading="isLoading"
                    />
                </SwiperSlide>
            </Swiper>
            <!-- Skeleton -->
            <Swiper
                v-else
                :slides-per-view="2"
                :space-between="15"
                :breakpoints="breakpoints"
                class="playlists__list w-full max-h-[42rem]"
            >
                <SwiperSlide 
                    v-for="i in 5"
                >
                    <PlaylistCard :isLoading="isLoading"/>
                </SwiperSlide>
            </Swiper>
            <!-- Skeleton -->
        </div>
    </div>
</template>

<script setup lang="ts">
import PlaylistCard from "./Card/PlaylistCard.vue";
import Skeleton from "./Skeleton/Skeleton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import type { Playlist } from "../types/Types";

const props = defineProps<{
    playlistTitle?: string,
    playlist?: Playlist[],
    isLoading: boolean,
}>();

const breakpoints = {
    '640': {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    '768': {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    '1024': {
        slidesPerView: 5,
        spaceBetween: 20,
    },
}
</script>

<style lang="scss" scoped>
</style>