const config = {
    development: {
        API_URL: 'http://localhost:3000',
    },
    production: {
        API_URL: 'http://54.165.154.95:9000',
    }
}

const env = process.env.NODE_ENV || 'development'

export default config[env]