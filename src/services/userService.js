import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": "application/json",
    },
})

export const fetchUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error fetching user');
    }
}