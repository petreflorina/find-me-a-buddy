import {Component, OnInit} from "@angular/core";

import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'

})

export class LoginComponent implements OnInit {

    constructor(private router: Router) {
    }

    username: string;

    password: string;

    ngOnInit() {

    }

    login(): void {

        if (this.username == 'admin' && this.password == 'admin') {
            // this.router.navigate(["user"]);
            alert('You are great!');
        } else {
            alert("Invalid credentials");
        }

    }

}
