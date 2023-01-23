import ApiClient from "./ApiClient";
import Cookies from 'js-cookie';

class Message {
    constructor(baseUrl = "/api/users") {
        this.api = ApiClient(baseUrl);
        const customHeaders = {};
        
        this.api.interceptors.request.use(async (config) => {
            const accessToken = Cookies.get('token');
            if (accessToken) {
                customHeaders.Authorization = accessToken;
            }

            return {
                ...config,
                headers: {
                    ...customHeaders,  // auto attach token
                    ...config.headers, // but you can override for some requests
                }
            };
        });  
    }

    getMessage(id){
        return (this.api.get("/message",{
            params: { id: id }
        }))
    }
}

export default new Message();