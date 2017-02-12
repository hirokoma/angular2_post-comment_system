import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class UserService {

  constructor(
    private _tokenService: Angular2TokenService,
    private router: Router
  ) {
    this._tokenService.init({
      registerAccountPath: 'http://localhost:3000/api/auth',
      validateTokenPath:   'http://localhost:3000/api/auth/validate_token',
      signInPath:          'http://localhost:3000/api/auth/sign_in'
    });
  }

  signIn(email, password) {
    this._tokenService.signIn({
      email:    email,
      password: password
    })
    .subscribe(
      res   => {
        console.log(this._tokenService.currentUserData);
        this.router.navigate(['']);
      },
      error => console.log(error),
    );
  }

  register(email, password, passwordConfirmation) {
    this._tokenService.registerAccount({
      email:                email,
      password:             password,
      passwordConfirmation: passwordConfirmation,
    })
    .subscribe(
      res   => console.log(res),
      error => console.log(error),
    );
  }

}
