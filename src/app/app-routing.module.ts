import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user.component';
import {FinderComponent} from "./find/finder.component";
import {HobbiesComponent} from "./hobbies/hobbies.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'users', component: UsersComponent},
    {path: 'find', component: FinderComponent},
    {path: 'hobbies', component: HobbiesComponent},
    {path: 'user/:id', component: UserComponent}

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false, // <-- debugging purposes only
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
