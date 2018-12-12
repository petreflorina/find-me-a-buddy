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
        // this.apiService
        //     .getAllUsers()
        //     .subscribe(
        //         (users) => {
        //             console.log('aa');
        //             console.log(users);
        //             // this.users = users;
        //         }
        //     );
    }

    public  getUsers() {
        this.apiService.getAllUsers().subscribe((data: Array<User>) => {
            this.users = data;
        });
    }

}
