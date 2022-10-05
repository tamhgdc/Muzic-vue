import requests from "../utils/Axios";

const path = "/api/hub/detail";

export const getHubDetail = async (id: string | any): Promise<any> => {
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