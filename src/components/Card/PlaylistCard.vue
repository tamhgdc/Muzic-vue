<template>
    <div class="playlists__item flex flex-col space-y-4">
        <div class="playlists__thumbnail rounded-xl overflow-hidden relative">
            <img v-if="!isLoading" class="thumbnail w-full h-full object-cover" 
                v-lazy="thumbnail" :alt="title"
            >
            <Skeleton v-else class="aspect-square"/>
            <div v-if="!isLoading" class="playlists__action absolute w-full h-full top-0 flex justify-center items-center space-x-6 text-4xl text-white bg-[rgba(0,0,0,.3)] opacity-0 invisible transition-all ease-out-expo">
                <VTooltip>
                    <img :src="heartOutline" alt="heart" class="w-[2.5rem] h-[2.5rem]">
                    <template #popper>
                        <span class="text-xl">Thêm vào thư viện</span>
                    </template>
                </VTooltip>
                <RouterLink :to="`/playlist/${encodeId}`">
                    <img :src="playCircle" alt="play" class="w-[5rem] h-[5rem]">
                </RouterLink>
                <VTooltip>
                    <img :src="ellipsisVertical" alt="ellipsis" class="w-[2.5rem] h-[2.5rem]">
                    <template #popper>
                        <span class="text-xl">Khác</span>
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="playlists__content tracking-wider flex flex-col space-y-2">
            <h3 v-if="!isLoading" class="playlists__title text-3xl font-semibold truncate" v-text="title" />
            <Skeleton v-else class="h-[2rem]"/>
            <span v-if="!isLoading" class="playlists__artists-name text-2xl font-medium text-gray-400 truncate" v-text="artistsName" />
            <Skeleton v-else class="h-[1.5rem]"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Skeleton from "../Skeleton/Skeleton.vue";
import { heartOutline, playCircle, ellipsisVertical } from "../../composables/Icons";
interface Props {
    thumbnail?: string,
    title?: string,
    artistsName?: string,
    encodeId?: string,
    isLoading: boolean,
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.playlists {
    &__item:hover > &__content {
        @apply text-emerald;
    }

    &__thumbnail {
        > img {
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
    }

    &__thumbnail:hover > img {
        transform: scale3d(1.1, 1.1, 1.1);
    }

    &__thumbnail:hover > &__action {
        opacity: 1;
        visibility: visible;
    }
}
</style>