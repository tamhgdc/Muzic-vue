import { defineStore } from "pinia";
import { ref } from "vue";
import type { Song } from "../types/Types";

export const useCurrentSong = defineStore('currentSongStore', () => {
    const currentSong = ref<Song>({
        encodeId: '',
        index: 0,
        artistsNames: '',
        title: '',
        thumbnailM: '',
        duration: 0,
        currentTime: 0,
        "128": '',
        "320": '',
    });
    const songProgress = ref<number>(0);

    const setCurrentSong = (song: Song): void => {
        currentSong.value = song;
    }

    const updateSongProgress = (): void => {
        const progressPercent = Math.ceil(currentSong.value.currentTime / currentSong.value.duration * 100);
        songProgress.value = progressPercent;
    }

    return {
        setCurrentSong,
        updateSongProgress,
        currentSong,
        songProgress
    }
}, {
    persist: true,
});