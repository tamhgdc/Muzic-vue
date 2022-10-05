import requests from "../utils/Axios";

export const getPlaylist = async (id: string): Promise<any> => {
    const path = "/api/playlist";
    try {
        const res = await requests.get(path, {
            params: {
                id: id,
            }
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getSuggestedPlaylists = async (id: any): Promise<any> => {
    const path = "/api/playlist/section-bottom";
    try {
        const res = await requests.get(path, {
            params: {
                id: id,
            }
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
}