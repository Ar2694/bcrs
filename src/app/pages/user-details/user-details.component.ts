/*
============================================
; Title: user-details.component.ts
; Author: Professor Krasso
; Date:   18 April 2021
; Modified by: Karina Alvarez
; Description: User details page
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
              private router: Router, private userService: UserService,
              private roleService: RoleService) {

    this.userId = this.route.snapshot.paramMap.get('userId');

    this.userService.findUserById(this.userId).subscribe(res => {


      /**
       * form containing user information
       */
      this.user = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.form.controls.username.setValue(this.user.username);
        this.form.controls.firstname.setValue(this.user.firstname);
        this.form.controls.lastname.setValue(this.user.lastname);
        this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
        this.form.controls.address.setValue(this.user.address);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.role.setValue(this.user.role['role']);

        //finding the roles and subscribing
        this.roleService.findAllRoles().subscribe(res => {
          this.roles = res['data'];
        }, err => {
          console.log(err);
        })
      })
      }

  /**
   * user fields
   */
  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * saving updates into user fields and returning to users page
   */
  saveUser() {
    const updatedUser = {} as User;
    updatedUser.username = this.form.controls.username.value;
    updatedUser.firstname = this.form.controls.firstname.value;
    updatedUser.lastname = this.form.controls.lastname.value;
    updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
    updatedUser.address = this.form.controls.address.value;
    updatedUser.email = this.form.controls.email.value;
    updatedUser.role = this.form.controls.role.value;

    console.log('savedUser object');
    console.log(updatedUser);

    this.userService.updateUser(this.userId, updatedUser).subscribe(res => {
      this.router.navigate(['/users'])
    }, err => {
      console.log(err);
    })
  }

  //no updates - canceling and returning back to the users page
  cancel() {
    this.router.navigate(['/users'])
  }

}
