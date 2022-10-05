<template>
    <div class="categories-section flex flex-col space-y-16">
        <!-- Topics -->
        <div class="topics mt-8">
            <div class="topics__inner container flex flex-col space-y-8">
                <h2 class="text-4xl font-bold h-[3rem] max-w-[30rem] truncate">Tâm trạng và hoạt động</h2>
                <div v-if="!isLoading" class="topics__list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <GenreCard v-for="(topic, index) in topics"
                        :data="topic"
                        :footerItems="getPlaylistsInTopic(index)"
                        :isLoading="isLoading"
                        class="m-3"
                        @click="$router.push({ name: 'CategoriesDetail', params: { id: topic.encodeId } })"
                    />
                </div>
                <!-- Skeleton -->
                <div v-else class="topics__list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <GenreCard v-for="i in 5"
                        :isLoading="isLoading"
                        class="m-3"
                    />
                </div>
                <!-- Skeleton -->
                <Button v-if="!isShowAllTopics" class="w-[10rem] text-3xl self-center" @click="showAllTopics">
                    Tất Cả
                </Button>
            </div>
        </div>
        <!-- Topics -->
        <!-- Nations -->
        <div class="nations">
            <div class="nations__inner container flex flex-col space-y-8">
                <h2 class="text-4xl font-bold h-[3rem] max-w-[30rem] truncate">Quốc Gia</h2>
                <div v-if="!isLoading" class="nations__list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div v-for="item in nations" 
                        :key="item.encodeId" 
                        class="nations__item m-3 aspect-square rounded-xl overflow-hidden cursor-pointer"
                    >
                        <div class="thumbnail">
                            <RouterLink :to="`/categories-detail/${item.encodeId}`">
                                <img v-lazy="item.thumbnailR" :alt="item.title" class="w-full h-full object-cover hover:scale-110 transition-transform ease-out-expo duration-[0.5s]">
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <!-- Skeleton -->
                <div v-else class="nations__list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div v-for="i in 4" 
                        class="nations__item m-3 aspect-square rounded-xl overflow-hidden cursor-pointer"
                    >
                        <Skeleton/>
                    </div>
                </div>
                <!-- Skeleton -->
            </div> 
        </div>
        <!-- Nations -->
        <!-- Genres -->
        <div v-if="!isLoading" class="genres flex flex-col space-y-16">
            <Playlists v-for="item in genres" 
                :key="item.encodeId"
                :playlistTitle="item.title"
                :playlist="item.playlists"
                :isLoading="isLoading"
            />
        </div>
        <!-- Skeleton -->
        <div v-else class="genres flex flex-col space-y-16">
            <Playlists v-for="i in 16" 
                :isLoading="isLoading"
            />
        </div>
        <!-- Skeleton -->
        <!-- Genres -->
    </div>
</template>

<script setup lang="ts">
import GenreCard from "../components/Card/MusicCard.vue";
import Button from "../components/Button/Button.vue";
import Playlists from "../components/Playlists.vue";
import Skeleton from "../components/Skeleton/Skeleton.vue";
import { getHubHome } from "../api/HubHome";
import { ref, computed, onMounted } from "vue";
import type { Hub } from "../types/Types";

const isLoading = ref<boolean>(true);
const hubData = ref<Hub>();
const topTopics = ref<number>(5);
const topics = computed(() => (
    hubData.value?.topic
    .slice(0, topTopics.value)
    .map((topic) => ({
        encodeId: topic.encodeId,
        thumbnail: topic.thumbnailR,
        title: topic.title,
        playlists: topic.playlists,
    }))
));
const isShowAllTopics = ref<boolean>(false); 
const nations = computed(() => hubData.value?.nations);
const genres = computed(() => hubData.value?.genre);

const getPlaylistsInTopic = (index: number): any => {
    if (topics.value) {
        return topics.value[index].playlists.slice(0, 3);
    }
};

const showAllTopics = (): void => {
    topTopics.value = hubData.value?.topic.length ?? 0;
    isShowAllTopics.value = true;
}

onMounted(async () => {
    isLoading.value = true;
    hubData.value = await getHubHome();
    isLoading.value = false;
});
</script>

<style lang="scss" scoped>

</style>