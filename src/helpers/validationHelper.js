export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const areFieldsEmpty = (fields) => {
    return fields.some(field => field.trim() === '')
}

export const isValidPassword = (password) => {
    return password.length >= 6
}

export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword
}

export const isValidDNI = (dni) => {
    return dni.length === 8 || dni.length === 10
}
