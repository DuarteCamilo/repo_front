import config from "../config/config";

export const fetchDentists = async () => {
    try {
        const response = await fetch(`${config.API_URL}/dentists`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dentists:', error);
        throw error;
    }
}
