import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {ApiService} from '../_services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

    id: number;
    user: User;

    constructor(private apiService: ApiService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getUser();
    }

    public  getUser() {
        // this.apiService.getUserById(id).subscribe((data: User) => {
        //     this.user = data;
        // });
        this.user = new User();
        this.user.lastName = 'Petre';
        this.user.firstName = 'Florina';
        this.user.email = 'pflo@gmail.com';
    }
}
