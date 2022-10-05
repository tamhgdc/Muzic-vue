import { defineStore } from "pinia";
import { ref } from "vue";
import type { Playlist } from "../types/Types";

export const useCurrentPlaylist = defineStore('currentPlaylistStore', () => {
    const currentPlaylist = ref<Playlist>({
        encodeId: '',
        title: '',
        thumbnailM: '',
        releaseDate: '',
        sortDescription: '',
        artistsNames: '',
        artists: [],
        contentLastUpdate: 0,
        song: {
            items: [],
            total: 0,
        },
        items: [],
        like: 0,
    });

    const setCurrentPlaylist = (playlist: Playlist) => {
        currentPlaylist.value = playlist;
    }

    return {
        setCurrentPlaylist,
        currentPlaylist,
    }
}, {
    persist: true,
});