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
        console.log("l",email);
        console.log(password);
        const response = await api.post('/login', { email, password });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
}

export const registerUser = async(user,patient) => {
    try {
        const response = await api.post('/users', user);

        console.log(response);

        const today = new Date().toISOString().split('T')[0];

        const dataPatient = {
            ...patient,
            admission_date : today,
            user_id : response.data.id,
        }

        console.log(dataPatient);

        await api.post('/patients', dataPatient);
    } catch (error) {
        console.error('Error logging in:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
}