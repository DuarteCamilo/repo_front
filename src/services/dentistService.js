import axios from "axios";
import config from "../config/config";

const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const fetchDentists = async () => {
    try {
        const response = await api.get('/dentists');
        return response.data;
    } catch (error) {
        console.error('Error fetching dentists:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error fetching dentists');
    }
};

export const registerDentist = async (dentist) => {
    try {
        const response = await api.post('/dentists', dentist);
        return response.data;
    } catch (error) {
        console.error('Error registering dentist:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error registering dentist');
    }
}

export const updateDentist = async (license, dentist) => {
    try {
        const response = await api.put(`/dentists/${license}`, dentist);
        return response.data;
    } catch (error) {
        console.error('Error updating dentist:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error updating dentist');
    }
}

export const deleteDentist = async (license) => {
    try {
        const response = await api.delete(`/dentists/${license}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting dentist:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error deleting dentist');
    }
};