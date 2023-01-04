import ApiClient from "./ApiClient";

class Auth {
    constructor(baseUrl = "/api/users") {
        this.api = ApiClient(baseUrl);
    }

    createAccount(data){
        return (this.api.post("/register", data));
    }

    login(data){
        try {
            return (this.api.post("/login", data))

        } catch (error) {
            console.log("er")
        }
    }

    test() {
        return (this.api.get("/test").data);
    }
}

export default new Auth();