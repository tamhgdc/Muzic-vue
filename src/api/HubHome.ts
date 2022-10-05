import requests from "../utils/Axios";

const path = "/api/hub/home";

export const getHubHome = async (): Promise<any> => {
    try {
        const res = await requests.get(path);

        return res.data;
    } catch (error) {
        console.log(error)
    }
}