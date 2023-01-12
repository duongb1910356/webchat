import axios from "axios";
import { Cookies } from 'react-cookie';

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // "auth-token": (config) => {
        //     Cookies.get("token")
        // }
    },
};

// axiosClient.interceptors.request.use(async (config) => {
//     const customHeaders = {};

//     const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
//     if (accessToken) {
//         customHeaders.Authorization = accessToken;
//     }

//     return {
//         ...config,
//         headers: {
//             ...customHeaders,  // auto attach token
//             ...config.headers, // but you can override for some requests
//         }
//     };
// });

export default (baseURL) => {
    return axios.create({ baseURL, ...commonConfig, });
};