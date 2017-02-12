import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorMessage: string;

  private registerData: RegisterData = <RegisterData>{};
  private output: any;

  constructor(
    private router: Router,
    private tokenService: Angular2TokenService
  ) {
    this.tokenService.init({
      registerAccountPath: 'http://localhost:3000/api/auth'
    });
  }

  signup() {
    this.output = null;

    this.tokenService
        .registerAccount(this.registerData)
        .subscribe(
          res => {
              this.registerData  = <RegisterData>{};
              this.output        = res;
              console.log(res)
          }, error => {
              this.registerData  = <RegisterData>{};
              this.output        = error;
          }
    );
  }

  ngOnInit(): void {
  }

}