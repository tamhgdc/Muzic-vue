<template>
    <div class="favorite-artists">
        <div class="favorite-artists__inner container flex flex-col space-y-8">
            <div class="favorite-artists-heading">
                <h2
                class="favorite-artists-heading__text text-4xl font-bold h-[3rem] max-w-[30rem] truncate"
                >
                Nghệ sĩ yêu thích
                </h2>
            </div>
            <Swiper
                v-if="!isLoading"
                :slides-per-view="2"
                :space-between="15"
                :breakpoints="breakpoints"
                class="favorite-artists__list w-full max-h-[50rem]"
            >
                <SwiperSlide
                    v-for="(artist, index) in artists"
                    :key="artist.encodeId"
                    class="cursor-pointer"
                >
                    <ArtistCard
                        :data="artist"
                        :footerItems="getSongs(index)"
                        :isLoading="isLoading"
                        @click="$router.push({ name: 'Playlist', params: { id: artist.encodeId } })"
                    />
                </SwiperSlide>
            </Swiper>
            <!-- Skeleton -->
            <Swiper
                v-else
                :slides-per-view="2"
                :space-between="15"
                :breakpoints="breakpoints"
                class="favorite-artists__list w-full max-h-[40rem]"
            >
                <SwiperSlide v-for="i in 5" class="cursor-pointer">
                    <ArtistCard :isLoading="isLoading" />
                </SwiperSlide>
            </Swiper>
            <!-- Skeleton -->
        </div>
    </div>
</template>

<script setup lang="ts">
import ArtistCard from "./Card/MusicCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { computed } from "vue";
import type { FavoriteArtist } from "../types/Types";
import { useGlobal } from "../stores/Global";

interface Props {
    favoriteArists: FavoriteArtist[];
}

const props = defineProps<Props>();
const globalStore = useGlobal();
const isLoading = computed(() => globalStore.isLoadingHome);
const artists = computed(() => 
    props.favoriteArists.map(artist => ({
        encodeId: artist.encodeId,
        thumbnail: artist.thumbnailM,
        title: artist.artistsNames,
    }))
);
const breakpoints = {
    "640": {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    "768": {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    "1024": {
        slidesPerView: 5,
        spaceBetween: 20,
    },
};

const getSongs = (index: number): any => props.favoriteArists[index].song.items.slice(0, 3);
</script>

<style lang="scss" scoped></style>
