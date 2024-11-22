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

export const fetchDentist = async (id) => {
    try {
        const response = await api.get(`/dentists/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Error fetching dentists');
    }
};

export const fetchUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error fetching user');
    }
}

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
            inactivity_start_date: null,
            inactivity_end_date: null,
            user_id: registeredUser.id,
        };

        const response = await registerDentist(dentist);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering user';
        throw new Error(errorMessage);
    }
};

export const updateUser = async (user, id) => {
    try {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering user';
        throw new Error(errorMessage);
    }
}

export const updateDentist = async (user, dentistData) => {

    const userDataOld = await fetchUser(user.id);
    const dentistDataOld = await fetchDentist(dentistData.id)

    const omitKeys = ["is_admin", "patient_id", "dentist_id"];
    
    const finalDataUser = getDifferences(userDataOld, user, omitKeys);
    
    const finalDataDentist = getDifferences(dentistDataOld, dentistData, "");

    console.log(dentistData);
    
    try {

        if (Object.keys(finalDataUser).length > 0) {

            console.log(finalDataUser);

            const idUser = user.id;

            await updateUser(finalDataUser,idUser);

            if (Object.keys(finalDataDentist).length > 0){

                const response = await api.put(`/dentists/${dentistData.id}`, dentistData);
                return response.data;
            }
            return user;

        } else if(Object.keys(finalDataDentist).length > 0){ 

            const response = await api.put(`/dentists/${dentistData.id}`, dentistData);
            return response.data;

        }else {
            return dentistDataOld;
        }
    } catch (error) {
        console.log(error)
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error updating user';
        throw new Error(errorMessage);
    }
}

const getDifferences = (obj1, obj2, omitKeys) => {
    let differences = {};

    for (let key in obj2) {
        if (omitKeys.includes(key)) continue;

        if (obj1[key] !== obj2[key]) {
            differences[key] = obj2[key];
        }
    }

    return differences;
};

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

export const registerSchedule = async (id, schedule) => {
    try {
        const data = {
            workday_start_time : schedule.startTime,
            workday_end_time : schedule.endTime,
        }

        console.log(data);
        console.log(id);
        const response = await api.put(`/dentists/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering schedule:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error registering schedule');
    }
}

export const registerInactivity = async (id, inactivity) => {
    try {
        const data = {
            inactivity_start_date : inactivity.startDate,
            inactivity_end_date : inactivity.endDate,
        }
        
        const response = await api.put(`/dentists/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering schedule:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error registering schedule');
    }
}




export const fetchAppointments = async (dentistId) => {
    try {
        const response = await api.get('/appointments');

        const filteredAppointments = response.data.filter(appointment => appointment.dentist_id === dentistId);

        console.log(dentistId);

        return filteredAppointments;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error fetching user');
    }
};

export const fetchAppointmentLabels = async (appointmentsData) => {
    try {
        const labels = [];

        for (const appointment of appointmentsData) {
            const labelId = appointment.label_id; 

            const response = await api.get(`/appointment_labels/${labelId}`);
            
            labels.push(response.data);
        }

        return labels;
    } catch (error) {
        console.error('Error fetching appointment labels:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error fetching appointment labels');
    }
};


export const fetchPatients = async (appointmentsData) => {
    try {
        const patients = [];

        for (const appointment of appointmentsData) {
            const patient_id = appointment.patient_id; 

            const responsePatients = await api.get(`/patients/${patient_id}`);

            const response = await api.get(`/users/${responsePatients.data.user_id}`);
            
            patients.push(response.data);
        }

        return patients;
    } catch (error) {
        console.error('Error fetching appointment labels:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error fetching appointment labels');
    }
};