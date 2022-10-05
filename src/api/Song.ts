import requests from "../utils/Axios";

const path = "/api/song";

export const getSong = async (id: string): Promise<any> => {
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