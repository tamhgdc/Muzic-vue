import { defineStore } from "pinia";
import { ref } from "vue";
import { getPlaylist, getSuggestedPlaylists } from "../api/Playlist";
import type { Playlist, SectionBottom } from "../types/Types";

export const usePlaylists = defineStore('playlistsStore', () => {
    const playlists = ref<Playlist[]>([]);

    const existedPlaylist = (id: string | any): boolean => {
        return playlists.value.some(playlist => {
            return playlist.encodeId === id;
        });
    }

    const fetchPlaylist = async (id: string | any) => {
        if (existedPlaylist(id)) return;
        
        const data = await getPlaylist(id);
        playlists.value.push(data.data);
    }

    const getStoredPlaylist = (id: string | any) => {
        return playlists.value.find(playlist => playlist.encodeId === id);
    }

    return {
        fetchPlaylist,
        existedPlaylist,
        getStoredPlaylist,
        playlists,
    }
});