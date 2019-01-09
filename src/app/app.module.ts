import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from './users/users.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './_services/api.service';
import {AuthenticationService} from './_services/authentication.service';
import {UserComponent} from './users/user.component';
import {FinderComponent} from './find/finder.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HobbiesComponent} from './hobbies/hobbies.component';
import {ModalService} from "./_services/modal.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        UsersComponent,
        UserComponent,
        FinderComponent,
        HobbiesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    providers: [
        ApiService,
        ModalService,
        AuthenticationService

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
