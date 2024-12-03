import { getEnvVariables } from "../helpers"
import axios from {axios}

const {VITE_API_URL} = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})


// Configurar interceptores


export default calendarApi