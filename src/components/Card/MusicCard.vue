<template>
    <div class="card__item relative cursor-pointer rounded-xl overflow-hidden">
        <div class="card__thumbnail">
            <img v-if="!isLoading" class="block w-full h-full object-cover transition-transform ease-out-expo duration-[0.5s]"
                v-lazy="data?.thumbnail" :alt="data?.title"
            >
            <Skeleton class="h-[30rem]" v-else />
        </div>
        <div v-if="!isLoading" class="card__layer absolute w-full h-full top-0 left-0"></div>
        <div v-if="!isLoading"
            class="card__content absolute w-full h-full top-0 flex flex-col justify-end space-y-4 p-4 text-white">
            <h3 class="text-3xl font-semibold truncate" v-text="data?.title"></h3>
            <ul class="w-full flex justify-center items-center space-x-4">
                <li v-for="item in footerItems" class="bg-gray-400 flex-auto aspect-square rounded-lg overflow-hidden">
                    <img class="block w-full h-full object-cover" v-lazy="item.thumbnailM" :alt="item.title">
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import Skeleton from '../Skeleton/Skeleton.vue';
import type { Song, Playlist } from '../../types/Types';

interface data {
    encodeId: string,
    thumbnail: string,
    title: string,
}

interface Props {
    data?: data,
    footerItems?: Song[] | Playlist[],
    isLoading: boolean,
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.card {
    &__layer {
        background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, .6));
    }

    &__item:hover > &__thumbnail > img {
        transform: scale3d(1.1, 1.1, 1.1);
    }
}
</style>