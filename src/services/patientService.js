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

export const registerCompleteShift = async (appointment_label,appointment) => {
    try {
        const responseAppointmentLabel = await registerAppointmentLabel(appointment_label);

        const appointmentData = {
            ...appointment,
            label_id : responseAppointmentLabel.id,
        };

        console.log(appointmentData);

        const response = await registerAppointment(appointmentData);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Error registering shift';
        throw new Error(errorMessage);
    }
};

export const registerAppointmentLabel = async (appointment_label) => {
    try {
        const response = await api.post('/appointment_labels', appointment_label);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Error registering appointment label');
    }
}

export const registerAppointment = async (appointment) => {
    try {
        const response = await api.post('/appointments', appointment);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Error registering appointment label');
    }
}

export const fetchAppointments = async (patientId) => {
    try {
        const response = await api.get('/appointments');

        const filteredAppointments = response.data.filter(appointment => appointment.patient_id === patientId);

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


export const fetchDentists = async (appointmentsData) => {
    try {
        const dentists = [];

        for (const appointment of appointmentsData) {
            const dentist_id = appointment.dentist_id; 

            const responseDentist = await api.get(`/dentists/${dentist_id}`);

            const response = await api.get(`/users/${responseDentist.data.user_id}`);
            
            dentists.push(response.data);
        }

        return dentists;
    } catch (error) {
        console.error('Error fetching appointment labels:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error fetching appointment labels');
    }
};