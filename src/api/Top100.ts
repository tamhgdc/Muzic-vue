import requests from "../utils/Axios";

const path = "/api/top-100";

export const getTop100 = async (): Promise<any> => {
    try {
        const res = await requests.get(path);

        return res.data;
    } catch (error) {
        console.log(error);
    }
}
