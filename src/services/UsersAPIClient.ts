import axios from "axios";
import { updateUser, updatePassword } from "../dto";

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

class UserAPIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
    };

    post = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then((res) => res.data);
    };

    update = (data: updateUser) => {
        // If there's a file to upload, use FormData
        if (data.userAvatar instanceof File) {
            const formData = new FormData();

            // Add the file to FormData
            formData.append("userAvatar", data.userAvatar);

            // Add other fields to FormData
            if (data._id) formData.append("_id", data._id);
            if (data.username) formData.append("username", data.username);
            if (data.firstName) formData.append("firstName", data.firstName);
            if (data.lastName) formData.append("lastName", data.lastName);
            if (data.email) formData.append("email", data.email);

            // Use FormData with multipart/form-data content type
            return axiosInstance
                .patch<updateUser>(`${this.endpoint}/${data._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data);
        } else {
            // No file, use regular JSON
            return axiosInstance
                .patch<updateUser>(`${this.endpoint}/${data._id}`, data)
                .then((res) => res.data);
        }
    };

    updatePassword = (data: updatePassword) => {
        return axiosInstance
            .patch(`${this.endpoint}/${data._id}`, data)
            .then((res) => res.data);
    };

    delete = (id: string) => {
        return axiosInstance
            .delete<T>(`${this.endpoint}/${id}`)
            .then((res) => res.data);
    };
}

export default UserAPIClient;
