import { config } from "../../config/config";
import { userLogout } from "../Redux/userSlice";
import { store } from "../Redux/store";
import { refreshApi } from "./api";
import axios from "axios";
import { authAxios } from "./ApiUrl";

const baseUrl = config.VITE_AXIOS_API

const CreateInstance  = ( Url , accessTokenKey  , action  ,contentType)=>{
    const instance  = axios.create({
        Url,
        headers: { "Content-Type": contentType },
        withCredentials: true,
    })

    instance.interceptors.request.use(
        (config)=>{
            const accessToken = localStorage.getItem(accessTokenKey);
            if (accessToken) {
              config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
           
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          if (error.response && error.response.status === 401 && !originalRequest._retry ) {
            originalRequest._retry = true;
            try {
              const response = await authAxios.post(refreshApi);
             
    
              const { accessToken } = response.data;

              localStorage.setItem(accessTokenKey, accessToken);

              originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
              return instance(originalRequest);
            } catch (err) {
              store.dispatch(action());
              return Promise.reject(err);
            }
          }
    
          if (!error.response) {
            console.error('Network error or no response received:', error.message);
          } else {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          }
    
          return Promise.reject(error);
        }
      );
      return instance;
}

export const userAxiosInstance = CreateInstance(baseUrl , 'accessTokenuserKey',userLogout ,"application/json")
export const userformAxiosInstance = CreateInstance(baseUrl , 'accessTokenuserKey',userLogout ,"multipart/form-data")