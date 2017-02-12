import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';

  constructor(
    private router: Router,
    private tokenService: Angular2TokenService
  ) {
    this.tokenService.init({
      validateTokenPath: 'http://localhost:3000/api/auth/validate_token'
    });
  }



  toSignin(): void {
    this.router.navigateByUrl('/signin');
  }

}
