import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../_models/user";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {
    }

    public getAllUsers() {
        return this.http.get(API_URL + '/users');
    }

    public register(user: User) {
        return this.http.post(API_URL + '/user/register', user);
    }

    // API: GET /users/:id
    public getUserById(userId: number) {
        // will use this.http.get()
    }

    // API: PUT /users/:id
    public updateUser(user: User) {
        // will use this.http.put()
    }

    // DELETE /users/:id
    public deleteUserById(userId: number) {
        // will use this.http.delete()
    }

}
