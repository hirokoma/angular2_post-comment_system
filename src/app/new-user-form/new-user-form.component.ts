import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from './../user/user';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css'],
  providers: [UserService]
})
export class NewUserFormComponent implements OnInit {
  model = new User('', '', '');

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
  }

  register() {
    this.userService.register(
      this.model.email,
      this.model.password,
      this.model.passwordConfirmation
    );
  }

}
