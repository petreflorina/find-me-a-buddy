import { Component } from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Find me a buddy!';

  constructor(public authService: AuthenticationService) {
  }
}
