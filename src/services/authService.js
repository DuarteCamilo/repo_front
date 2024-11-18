import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": "application/json",
    },
})

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
}
