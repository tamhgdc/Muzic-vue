<template>
    <section class="categories-detail flex flex-col">
        <div class="categories-cover w-full mt-8">
            <div class="categories-cover__inner container">
                <div class="categories-cover__thumb relative rounded-xl overflow-hidden">
                    <img :src="data?.cover" :alt="data?.title" class="w-full h-full object-cover">
                    <div class="categories-cover__layer absolute top-0 left-0 w-full h-full"></div>
                </div>
            </div>
        </div>
        <div class="categories-playlists mt-[-3rem]">
            <div class="categories-playlists__inner container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <PlaylistCard 
                    v-for="playlist in playlists"
                    :key="playlist.encodeId"
                    :title="playlist.title"
                    :thumbnail="playlist.thumbnailM"
                    :artistsName="playlist.artistsNames"
                    :encodeId="playlist.encodeId"
                    :isLoading="isLoading"
                    class="m-4 cursor-pointer"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import PlaylistCard from '../components/Card/PlaylistCard.vue';
import { getHubDetail } from '../api/HubDetail';
import { watchEffect, ref, computed } from 'vue';
import { useRoute } from "vue-router";
import type { HubDetail } from '../types/Types';


const route = useRoute();
const isLoading = ref<boolean>(true);
const data = ref<HubDetail>();
const playlists = computed(() => data.value?.sections[0].items);

watchEffect(async () => {
    if (route.name === 'CategoriesDetail') {
        isLoading.value = true;
        data.value = await getHubDetail(route.params.id);
        isLoading.value = false;
    }
});
</script>

<style lang="scss" scoped>
.categories-cover__layer {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, .6));
}
</style>