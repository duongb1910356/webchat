import ApiClient from "./ApiClient";

class Auth {
    constructor(baseUrl = "/api/users") {
        this.api = ApiClient(baseUrl);
    }

    test() {
        return (this.api.get("/test"));
    }
}

export default new Auth();