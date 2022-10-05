import requests from "../utils/Axios";

const path = "/api";

export const getHome = async (): Promise<any> => {
    try {
        const res = await requests.get(path);

        return res.data;
    } catch (error) {
        console.log(error);
    }
}