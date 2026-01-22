import axiosConnection from "../services/axios/axios";

export const backendApi = {
    // Authentication side api call
    signup: async (data: { name: string, email: string, password: string }) => {
        const response = await axiosConnection.post('/signup', data)
        return response.data
    },
    login: async (data: { email: string, password: string }) => {
        const response = await axiosConnection.post('/login', data)
        return response.data
    },
    // Admin side api call
    getAllUsers: async () => {
        const response = await axiosConnection.get('/admin/users');
        return response.data.data;
    },
    assignToken: async (userId: string) => {
        const response = await axiosConnection.post(`/admin/users/assign-token/${userId}`);
        return response.data.data;
    },
    // User side api call 
    getUserById: async (userId: string) => {
        const response = await axiosConnection.get(`/user/${userId}`);
        return response.data.data;
    }
}