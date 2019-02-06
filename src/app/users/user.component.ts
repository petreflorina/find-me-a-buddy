import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {ApiService} from '../_services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Hobby} from "../_models/hobby";

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
        this.apiService.getUser().subscribe((data: User) => {
            this.user = new User(data);
        });

    }
}
