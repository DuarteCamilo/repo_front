const config = {
    development: {
        API_URL: 'http://localhost:3000',
    },
    production: {
        API_URL: 'https://api.myapp.com',
    }
}

const env = process.env.NODE_ENV || 'development'

export default config[env]