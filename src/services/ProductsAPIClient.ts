import axios from "axios";
import { Products } from "../dto";

const axiosInstance = axios.create({
    baseURL: "https://blisscet-store-server.onrender.com",
});

const getAuthToken = () => {
    try {
        const userDataStr = localStorage.getItem("userData");
        if (!userDataStr) {
            console.warn("No userData found in localStorage");
            return "";
        }

        const userData = JSON.parse(userDataStr);
        if (!userData.token) {
            console.warn("Token not found in userData", userData);
            return "";
        }

        return userData.token;
    } catch (error) {
        console.log("Error retrieving auth token:", error);
        return "";
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token available for request to:", config.url);
        }
        return config;
    },
    (error) => {
        console.log("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

class APIClient {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return axiosInstance
            .get<Products[]>(this.endpoint)
            .then((res) => res.data);
    };

    post = (data: Products) => {
        return axiosInstance
            .post<Products>(this.endpoint, data)
            .then((res) => res.data);
    };

    update = (data: Products) => {
        return axiosInstance
            .patch<Products>(this.endpoint, data)
            .then((res) => res.data);
    };

    delete = (data: Products) => {
        return axiosInstance
            .delete<Products>(this.endpoint, {
                data: data, // This puts the data in the request body for a DELETE request
            })
            .then((res) => res.data);
    };
}

export default APIClient;
