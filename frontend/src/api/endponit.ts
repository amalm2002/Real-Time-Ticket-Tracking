import axiosConnection from "../services/axios/axios";

export const backendApi = {
    signup: async (data: any) => {
        const response = await axiosConnection.post('/signup', data)
        return response.data
    },
    login: async (data: any) => {
        const response = await axiosConnection.post('/login', data)
        return response.data
    },
    getAllUsers: async () => {
        const response = await axiosConnection.get('/admin/users');
        return response.data.data;
    }
}