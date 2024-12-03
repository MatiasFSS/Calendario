import { getEnvVariables } from "../helpers"
import axios from "axios"

const {VITE_API_URL} = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})


// Configurar interceptores
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token':localStorage.getItem('token')
    }

    return config
})


export default calendarApi