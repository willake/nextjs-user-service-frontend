import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
})

// add auth token if logged in
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt-token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default api
