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
        return this.http.get(API_URL + '/user');
    }

    public register(user: User) {
        return this.http.post(API_URL + '/user/register', user);
    }

    public getUser() {
        return this.http.get(API_URL + '/user/account');
    }

    public getHobbies() {
        return this.http.get(API_URL + '/info/hobby');
    }

    public getCountries() {
        return this.http.get(API_URL + '/user/match');
    }

    public getCities(countryId: number) {
        return this.http.get(API_URL + '/info/country/' + countryId + '/city');
    }

    public getMatch(params) {
        return this.http.get(API_URL + '/user/match', {params: params});
    }
}
