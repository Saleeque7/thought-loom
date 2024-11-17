import { config } from "../../config/config";
import axios from 'axios'

const baseUrl = config.VITE_AXIOS_API
const userUrl = `${config.VITE_AXIOS_API}/thoughtloom`

const axiosInstance = (Url)=>{
    return axios.create({
        Url, 
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    })
}

export const authAxios  = axiosInstance(baseUrl)
export const userAxios  = axiosInstance(userUrl)
