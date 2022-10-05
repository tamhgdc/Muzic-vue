<template>
    <div class="playlist-detail flex flex-col space-y-16 justify-center items-center">
        <div class="playlist-detail__inner w-full container flex flex-col space-y-16 lg:flex-row lg:space-x-16">
            <div class="flex flex-col justify-center items-center space-y-6 mt-8 w-[70%] self-center md:w-[60%] lg:w-[35%] lg:h-full lg:self-start lg:sticky lg:top-[15%]">
                <div class="thumbnail w-[80%] aspect-square rounded-xl overflow-hidden">
                    <img v-if="!isLoading" v-lazy="playlist?.thumbnailM" :alt="playlist?.title" class="w-full h-full object-cover hover:scale-110 transition-transform ease-out-expo duration-[0.5s]">
                    <Skeleton v-else/>
                </div>
                <div v-if="!isLoading" class="flex flex-col space-y-4 justify-between items-center">
                    <h2 class="text-4xl font-bold text-center truncate-multi" v-text="playlist?.title"></h2>
                    <span class="text-gray-400 text-2xl font-medium" v-text="`Cập nhật: ${updatedAt}`"></span>
                    <span class="text-gray-400 text-2xl font-medium text-center truncate-multi" v-text="playlist?.artistsNames"></span>
                    <span class="text-gray-400 text-2xl font-medium text-center truncate-multi" v-text="`Lượt thích: ${formatNumber(like)}`"></span>
                </div>
                <div v-else class="w-full h-[10rem] flex flex-col space-y-4 justify-between items-center">
                    <Skeleton v-for="i in 4"/>
                </div>
            </div>
            <div class="w-full">
                <MusicList :list="songList" :isLoading="isLoading" :type="1" :playlistId="playlistId"/>
            </div>
        </div> 
        <div class="artist-section w-full">
            <div class="container">
                <h2 class="text-4xl font-bold h-[3rem] max-w-[30rem] truncate">Nghệ sĩ tham gia</h2>
                <ul class="artist__list w-full grid grid-cols-2 md:grid-cols-4">
                    <li 
                        v-for="artist in artists" 
                        :key="artist.id"
                        class="artist__item m-8 flex flex-col justify-center items-center space-y-6 hover:text-emerald ease-out-expo transition-colors cursor-pointer"
                    >
                        <div class="thumbnail w-full aspect-square rounded-full overflow-hidden">
                            <img 
                                v-if="!isLoading"
                                v-lazy="artist.thumbnail" 
                                :alt="artist.name"
                                class="w-full h-full object-cover hover:scale-110 transition-transform ease-out-expo duration-[0.5s]"
                            >
                            <!-- Skeleton -->
                            <Skeleton v-else/>
                            <!-- Skeleton -->
                        </div>
                        <div v-if="!isLoading" class="flex flex-col justify-center items-center space-y-2">
                            <h3 class="text-2xl font-bold truncate" v-text="artist.name"></h3>
                            <span class="text-xl font-medium text-gray-400 truncate" v-text="`Follower: ${formatNumber(artist.totalFollow)}`"></span>
                        </div>
                        <!-- Skeleton -->
                        <div v-else class="w-full h-[4rem] flex flex-col justify-center items-center space-y-2">
                            <Skeleton v-for="i in 2"/>
                        </div>
                        <!-- Skeleton -->
                    </li>
                </ul>
            </div>
        </div>
        <div class="suggested-playlists-section w-full flex flex-col space-y-16">
            <Playlists 
                v-for="item in suggestedPlaylists" 
                :key="item.title"
                :playlistTitle="item.title"
                :playlist="item.items"
                :isLoading="isLoading"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import MusicList from '../components/MusicList.vue';
import Skeleton from '../components/Skeleton/Skeleton.vue';
import Playlists from '../components/Playlists.vue';
import { usePlaylists } from '../stores/Playlists';
import { useRoute } from "vue-router";
import { timestampToDate } from "../composables/GetTime";
import { formatNumber } from "../composables/FormatNumber";
import type { Playlist, SectionBottom, Artist } from "../types/Types";
import { ref, computed, watchEffect } from "vue";
import { getSuggestedPlaylists } from '../api/Playlist';

const route = useRoute();
const playlistStore = usePlaylists();
const isLoading = ref<boolean>(true);
const playlist = ref<Playlist>();
const songList = computed(() => playlist.value ? playlist.value.song.items : []);
const playlistId = computed(() => playlist.value ? playlist.value.encodeId : '');
const updatedAt = ref<string>('');
const like = computed(() => playlist.value?.like ?? 0);
const sectionBottomData = ref<SectionBottom[]>([]);
const artistSection = computed(() => sectionBottomData.value.find(data => data.sectionType === "artist"));
const artists = computed(() => artistSection.value?.items.slice(0, 4) as Artist[]);
const suggestedPlaylists = computed(() => sectionBottomData.value.filter(data => data.sectionType === "playlist"));

watchEffect(async () => {
    if (route.name === "Playlist" && route.params.id) {
        isLoading.value = true;
        await playlistStore.fetchPlaylist(route.params.id);
        playlist.value = playlistStore.getStoredPlaylist(route.params.id);
        updatedAt.value = playlist.value ? timestampToDate(playlist.value.contentLastUpdate) : '';
        sectionBottomData.value = await getSuggestedPlaylists(route.params.id);
        isLoading.value = false;
    }
})
</script>

<style lang="scss" scoped>

</style>