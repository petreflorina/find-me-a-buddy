import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home/home.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "./material.module";
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from "./register/register.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
