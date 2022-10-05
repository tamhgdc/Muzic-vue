<template>
    <div class="player text-2xl fixed w-full h-[10rem] bottom-[7rem] bg-secondary z-[999] shadow-lg">
        <div class="player__inner container pt-6 h-full flex justify-between space-x-6">
            <div class="flex space-x-4">
                <div class="thumbnail w-[5rem] h-[5rem] rounded-md overflow-hidden relative">
                    <img :src="thumbnail" :alt="title" class="w-full h-full object-cover">
                    <Visualizer v-if="isPlaying" class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"/>
                </div>
                <div class="content w-[15rem] max-w-[15rem] md:w-[30rem] md:max-w-[30rem] lg:w-[30rem] lg:max-w-[30rem] flex flex-col space-y-2">
                    <h3 v-text="title" class="font-bold truncate"></h3>
                    <span v-text="artistsNames" class="text-gray-400 truncate"></span>
                </div>
            </div>
            <div class="control flex space-x-8 md:w-[25%] lg:w-[25%] md:justify-between lg:justify-between">
                <div class="next w-[2.5rem] h-[2.5rem] cursor-pointer bg-emerald rounded-sm hover:shadow-md">
                    <img :src="prev" alt="prev" class="w-full h-full" @click="playerStore.prev">
                </div>
                <div class="relative w-[2.5rem] h-[2.5rem] cursor-pointer bg-emerald rounded-sm hover:shadow-md">
                    <img v-if="isPlaying" 
                        :src="pause" 
                        alt="pause" 
                        class="w-full h-full absolute"
                        @click="playerStore.pause"
                    >
                    <img v-else 
                        :src="play" 
                        alt="play" 
                        class="w-full h-full absolute"
                        @click="playerStore.play(currentSong)"
                    >
                </div>
                <div class="w-[2.5rem] h-[2.5rem] cursor-pointer bg-emerald rounded-sm hover:shadow-md">
                    <img :src="next" alt="next" class="w-full h-full" @click="playerStore.next">
                </div>
            </div>
        </div>
        <div 
            class="progress-bar absolute w-full h-[0.5rem] top-0 left-0 bg-white cursor-pointer"
            :style="{'--width': `${songProgress}%`}"
            @click="handleProgressChange"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            ref="progressBar"
        >
            <div 
                class="progress-bar__dot absolute w-[1.5rem] h-[1.5rem] top-[50%] translate-y-[-50%] rounded-full bg-emerald cursor-pointer invisible opacity-0"
                :style="{'left': `${songProgress - 0.5}%`}"
            />
            <span 
                class="current-time text-gray-400 absolute top-[-2.5rem] left-[1rem] invisible opacity-0 pointer-events-none transition-all ease-out-expo"
                v-text="getTime(currentSong.currentTime)"
            />
            <span 
                class="total-time text-gray-400 absolute top-[-2.5rem] right-[1rem] invisible opacity-0 pointer-events-none transition-all ease-out-expo" 
                v-text="getTime(currentSong.duration)" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Visualizer from '../Visualizer.vue';
import { ref } from "vue";
import { useCurrentSong } from '../../stores/CurrentSong';
import { usePlayer } from '../../stores/Player';
import { computed } from "vue";
import { next, prev, play, pause } from "../../composables/Icons";
import { getTime } from "../../composables/GetTime";
import { useEventListener } from '../../composables/Event';

const currentSongStore = useCurrentSong();
const playerStore = usePlayer();
const progressBar = ref<Element>();
const isMouseDown = ref<boolean>(false);

const currentSong = computed(() => currentSongStore.currentSong);
const thumbnail = computed(() => currentSongStore.currentSong.thumbnailM);
const title = computed(() => currentSongStore.currentSong.title);
const artistsNames = computed(() => currentSongStore.currentSong.artistsNames);
const isPlaying = computed(() => playerStore.isPlaying);
const songProgress = computed(() => currentSongStore.songProgress);


const handleProgressChange = (e: MouseEvent): void => {
    const progressOffset = progressBar.value ? Math.floor(e.offsetX / progressBar.value.clientWidth * 100) : 0;
    const rewindTime = Math.floor(progressOffset * currentSong.value.duration / 100);
    playerStore.player.currentTime = rewindTime;
}

const handleMouseDown = (): void => {
    isMouseDown.value = true;
}

const handleMouseMove = (e: MouseEvent): void => {
    if (!isMouseDown.value) return;
    handleProgressChange(e);
}

useEventListener(document, 'mouseup', () => {
    isMouseDown.value = false;
});

playerStore.autoplay();

// Update Song Progress
useEventListener(playerStore.player, 'timeupdate', () => {
    currentSong.value.currentTime = Math.floor(playerStore.player.currentTime);
    currentSongStore.updateSongProgress();
});
</script>

<style lang="scss" scoped>
.progress-bar {
    &::before {
        content: '';
        width: var(--width);
        @apply absolute h-full top-0 left-0 bg-emerald transition-all ease-linear duration-500;
    }

    &:hover {
        .progress-bar__dot {
            visibility: visible;
            opacity: 1;
        }

        > .current-time,
        > .total-time {
            visibility: visible;
            opacity: 1;
        }
    }
}

.progress-bar__dot {
    @apply transition-all ease-linear duration-500;
}
</style>