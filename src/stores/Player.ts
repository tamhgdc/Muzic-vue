import { defineStore } from "pinia";
import { getSong } from "../api/Song";
import { useCurrentSong } from "./CurrentSong";
import { computed, ref } from "vue";
import { useCurrentPlaylist } from "./CurrentPlaylist";
import { usePlaylists } from "./Playlists";
import { showAlert } from "../composables/Alert";
import type { Song } from "../types/Types";

export const usePlayer = defineStore('playerStore', () => {
    const currentSongStore = useCurrentSong();
    const currentPlaylistStore = useCurrentPlaylist();
    const playlistsStore = usePlaylists();
    const player = new Audio();
    const isPlaying = ref<boolean>(false);
    const currentSongIndex = ref<number>(currentSongStore.currentSong.index?? 0);
    const volumeProgress = ref<number>(1);
    const currentSongTime = computed(() => currentSongStore.currentSong.currentTime);
    const currentSongId = computed(() => currentSongStore.currentSong.encodeId);


    const setCurrentSongIndex = (index: number): void => {
        currentSongIndex.value = index;
    }

    const getTotalSong = (): number => (currentPlaylistStore.currentPlaylist.song.total);

    // Fetch Song Data
    const fetchSong = (song: Song, index: number): Promise<Song | undefined> => {
        return new Promise<Song>(async (resolve, reject) => {
            setCurrentSongIndex(index);
            const res = await getSong(song.encodeId);

            if (res.msg === "Success") {
                resolve({...song, ...res.data, index: index});
            } else {
                reject(res.msg);
            }
        });
    }

    // Init Player
    const initPlayer = (src: string): void => {
        player.src = src;
        player.currentTime = currentSongTime.value ?? 0;
    }

    // Init Playlist
    const initPlaylist = (id: string): void => {
        const playlist = playlistsStore.getStoredPlaylist(id);
        playlist && currentPlaylistStore.setCurrentPlaylist(playlist);
    }

    // Player Status
    const setPlayerStatus = (status: boolean): void => {
        isPlaying.value = status;
    }

    // Get Song in Playlist
    const getSongInPlaylist = (index: number): Song => (currentPlaylistStore.currentPlaylist.song.items[index]);

    // Get Source Song
    const getSrcSong = (song: Song): string => (song[320] !== "VIP" ? song[320] : song[128]);

    // Play
    const play = (song?: Song): void => {
        if (song) {
            currentSongStore.setCurrentSong(song);
            const src = getSrcSong(song);
            initPlayer(src);
        }

        player.pause();
        player.addEventListener<"canplay">("canplay", () => {
            player.play();
            setPlayerStatus(true);
        });

        player.load();
    }

    const pause = (): void => {
        player.pause();
        setPlayerStatus(false);
    }

    const next = async (): Promise<void> => {
        currentSongIndex.value++;
        const totalSongs = getTotalSong();

        if (totalSongs === 0) return;
        if (currentSongIndex.value > totalSongs - 1) {
            setCurrentSongIndex(0);
        }

        pause();
        const song = getSongInPlaylist(currentSongIndex.value);
        try {
            const next_song = await fetchSong(song, currentSongIndex.value);
            play(next_song);
        } catch (err) {
            showAlert(err);
            await next();
        }
    }

    const prev = async (): Promise<void> => {
        currentSongIndex.value--;
        const totalSongs = getTotalSong();

        if (totalSongs === 0) return;
        if (currentSongIndex.value < 0) {
            setCurrentSongIndex(totalSongs - 1);
        }

        pause();
        const song = getSongInPlaylist(currentSongIndex.value);
        try {
            const prev_song = await fetchSong(song, currentSongIndex.value);
            play(prev_song);
        } catch (err) {
            showAlert(err);
            await prev();
        }
    }

    const autoplay = (): void => {
        player.addEventListener<"ended">("ended", () => {
            pause();
            next();
        });
    }

    const existedCurrentSong = (id: string): boolean => (currentSongId.value === id);

    const start = async (song: Song, index: number, playlistId: string): Promise<void> => {
        if (existedCurrentSong(song.encodeId)) {
            play(currentSongStore.currentSong);
            return;
        }

        initPlaylist(playlistId);
        try {
            const data = await fetchSong(song, index);
            play(data);
        } catch (err) {
            showAlert(err);
        }
    }

    const updateVolume = (): void => {
        volumeProgress.value = player.volume * 100;
    }

    return {
        play,
        pause,
        next,
        prev,
        autoplay,
        start,
        updateVolume,
        player,
        isPlaying,
        volumeProgress
    }
});