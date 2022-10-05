<template>
    <div class="top100-section">
        <div v-if="!isLoading" class="top100 flex-flex-col space-y-16 mt-8">
            <Playlists v-for="item in top100"
                :key="item.title"
                :playlistTitle="item.title"
                :playlist="item.items"
                :isLoading="isLoading"
            />
        </div>
        <!-- Skeleton -->
        <div v-else class="top100 flex-flex-col space-y-16 mt-8">
            <Playlists v-for="i in 4"
                :isLoading="isLoading"
            />
        </div>
        <!-- Skeleton -->
    </div>
</template>

<script setup lang="ts">
import Playlists from "../components/Playlists.vue";
import type { Top100 } from "../types/Types";
import { getTop100 } from "../api/Top100";
import { ref, onMounted } from "vue";

const isLoading = ref<boolean>(true);
const top100 = ref<Top100[]>([]);

onMounted(async () => {
    isLoading.value = true;
    top100.value = await getTop100();
    isLoading.value = false;
})
</script>

<style lang="scss" scoped>

</style>