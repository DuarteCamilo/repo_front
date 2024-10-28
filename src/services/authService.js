import config from "../config/config";

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${config.API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        return await response.json()
    } catch (error) {
        console.error('Error en la autenticación:', error)
        throw error;
    }
}