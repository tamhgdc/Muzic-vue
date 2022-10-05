interface HomeData {
    data: any;
    sectionType: string,
    title: string,
    items: [],
}

interface Banner {
    type: number,
    banner: string,
    cover: string,
    description: string,
    encodeId: string,
}

interface NewRelease {
    album: Playlist[],
    song: Song[],
}

interface WeekChart {
    banner: string,
    country: string,
    cover: string,
    endData: string,
    startDate: string,
}

interface Playlist {
    encodeId: string,
    title: string,
    thumbnailM: string,
    releaseDate: string,
    sortDescription: string,
    artistsNames: string,
    artists: Artist[],
    contentLastUpdate: number,
    song: {
        items: Song[],
        total: number,
    }
    items: any,
    like: number
}

interface Artist {
    id: string,
    name: string,
    link: string,
    alias: string,
    playlistId: string,
    cover: string,
    thumbnail: string,
    totalFollow: number
}

interface FavoriteArtist {
    encodeId: string,
    thumbnailM: string,
    artistsNames: string,
    song: {
        items: [],
    }
}

interface Song {
    encodeId: string,
    index: number,
    artistsNames: string,
    title: string,
    thumbnailM: string,
    duration: number,
    currentTime: number,
    "128": string,
    "320": string,
}

interface SectionBottom {
    data: any;
    sectionType: string,
    title: string,
    items: any[],
}

interface Section {
    sectionType: string,
    title: string,
    items: Playlist[],
}

interface Hub {
    nations: HubDetail[],
    topic: HubDetail[],
    genre: HubDetail[],
}

interface HubDetail {
    encodeId: string,
    cover: string,
    title: string,
    sections: Section[],
    thumbnailR: string,
    description: string,
    playlists: Playlist[],
}

interface Top100 {
    data: any[];
    sectonType: string,
    title: string,
    items: [],
}

export type { HomeData, Banner, NewRelease, WeekChart, Playlist, Artist, FavoriteArtist, Song, SectionBottom, Section, Hub, HubDetail, Top100 }