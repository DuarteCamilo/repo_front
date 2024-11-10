import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
    },
})

export const fetchPatients = async () => {
    try {
        const response = await api.get('/patients');
        return response.data
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw new Error(error.response?.data?.message || 'Error fetching patients')
    }
}
