import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, SignInData } from 'angular2-token';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  errorMessage: string;

  private signInData: SignInData = <SignInData>{};
  private output: any;

  constructor(
    private router: Router,
    private tokenService: Angular2TokenService
  ) {
    this.tokenService.init({
      signInPath: 'http://localhost:3000/api/auth/sign_in',
      validateTokenPath: 'http://localhost:3000/api/auth/validate_token'
    });
  }

  signin() {
    this.output = null;

    this.tokenService
        .signIn(this.signInData)
        .subscribe(
          res => {
              this.signInData    = <SignInData>{};
              this.output        = res;
              console.log(res);
          }, error => {
              this.signInData    = <SignInData>{};
              this.output        = error;
          }
    );
  }

  toSignup(): void {
    this.router.navigateByUrl('/signup')
  } 

  ngOnInit(): void {
  }

}