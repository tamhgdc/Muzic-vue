import axios from "axios";

const API_PATH = import.meta.env.VITE_API_PATH;

const requests = axios.create({
    baseURL: `${API_PATH}`,
});

requests.interceptors.response.use(res => res.data);

export default requests;