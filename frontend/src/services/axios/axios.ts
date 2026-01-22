import axios from "axios";
import { store } from "../store";
import { logout } from "../slice/userSlice";

const axiosConnection = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

axiosConnection.interceptors.request.use(
    (req: any) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => Promise.reject(error)
);

axiosConnection.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const token = localStorage.getItem('accessToken')

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}refresh-token`, { withCredentials: true }
                );

                const newToken = res.data.data.token;

                localStorage.setItem('accessToken', newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosConnection(originalRequest);
            } catch {
                localStorage.removeItem("accessToken");
                store.dispatch(logout())
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosConnection;
