/*
============================================
; Title:  base.response.js
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Douglas Jenkins
; Description: User Create
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

// required fields that need a value
  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],

    })
  }

  /**
   * Creates a new user with seven (7) fields required
   */
  createUser() {
    const newUser = {} as User;
    newUser.username = this.form.controls.username.value,
    newUser.password = this.form.controls.password.value,
    newUser.firstname = this.form.controls.firstname.value,
    newUser.lastname = this.form.controls.lastname.value,
    newUser.phoneNumber = this.form.controls.phoneNumber.value,
    newUser.address = this.form.controls.address.value,
    newUser.email = this.form.controls.email.value,

    this.userService.createUser(newUser).subscribe(res => {
      this.router.navigate(['/users'])
    }, err => {
      console.log(err);
    })
  }

  // sends you out of the user create
  cancel(){
    this.router.navigate(['/users']);
  }

}
