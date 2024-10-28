import config from "../config/config";

export const fetchPatients = async () => {
    try {
        const response = await fetch(`${config.API_URL}/patients`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}
