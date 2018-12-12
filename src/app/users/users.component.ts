import {Component, OnInit} from '@angular/core';
import {User} from "../_models/user";
import {ApiService} from "../_services/api.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

    users: Array<User> = [];

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    public  getUsers() {
        this.apiService.getAllUsers().subscribe((data: Array<User>) => {
            this.users = data;
        });
    }

}
