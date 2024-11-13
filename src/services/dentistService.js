import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": "application/json",
    },
})

export const fetchDentists = async () => {
    try {
        const response = await api.get('/dentists');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Error fetching dentists');
    }
};

export const registerUser = async (user) => {
    try {
        const response = await api.post('/users', user);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering user';
        throw new Error(errorMessage);
    }
}

export const registerDentist = async (dentist) => {
    try {
        const response = await api.post('/dentists', dentist);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Error registering dentist');
    }
}

export const registerCompleteDentist = async (user, dentistData) => {
    try {
        const registeredUser = await registerUser(user);

        const dentist = {
            ...dentistData,
            workday_start_time: '06:21:50.095Z',
            workday_end_time: '06:21:50.095Z',
            user_id: registeredUser.id,
        };

        const response = await registerDentist(dentist);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering user';
        throw new Error(errorMessage);
    }
};

export const updateUser = async (user) => {
    try {
        const response = await api.put(`/users/${user.id}`, user);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering user';
        throw new Error(errorMessage);
    }
}

export const updateDentist = async (user, dentistData) => {
    console.log('dentistData:', dentistData);
    try {
        const response = await api.put(`/dentists/${dentistData.id}`, dentistData);
        await updateUser(user);
        return response.data;
    } catch (error) {
        console.log(error)
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error updating user';
        throw new Error(errorMessage);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering user';
        throw new Error(errorMessage);
    }
}

export const deleteDentist = async (dentistId, userId) => {
    try {
        const response = await api.delete(`/dentists/${dentistId}`);
        await deleteUser(userId);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering user';
        throw new Error(errorMessage);
    }
}

export const registerSchedule = async (license, schedule) => {
    try {
        const response = await api.post(`/dentists/${license}/schedule`, schedule);
        return response.data;
    } catch (error) {
        console.error('Error registering schedule:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error registering schedule');
    }
}