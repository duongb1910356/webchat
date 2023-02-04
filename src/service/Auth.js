import ApiClient from "./ApiClient";
import Cookies from 'js-cookie';

class Auth {
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

    fetchProfile(){
        return (this.api.get("/fetchProfile"));
    }

    createAccount(data) {
        return (this.api.post("/register", data));
    }

    login(data) {
        return (this.api.post("/login", data))
    }

    test(uid) {
        return (this.api.get("/test", uid).data);
    }

    getListFriend(uid){
        console.log("route>>> ",uid)
        return (this.api.get("/getListFriend",{
            params: { uid: uid }
        }))
    }

    createGroup(data){
        // console.log("data service ", data)
        return (this.api.post("/group", data))
    }

    getListGroup(uid){
        return (this.api.get("/listgroup",{
            params: { uid: uid }
        }))
    }
}

export default new Auth();