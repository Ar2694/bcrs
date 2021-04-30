/*
============================================
; Title: role.create.component.ts
; Author: Professor Krasso
; Date: 30 April 2021
; Modified by: Arlix Sorto
; Description: Role create component
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;
  
  //Constructor
  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

//Create a new role through the createRole API.
  create(){
    //Create new role object
    const newRole ={ 
      text: this.form.controls['text'].value
    } // FIX ME: as Role

    //CreateRole API
    this.roleService.createRole(newRole).subscribe(res =>{
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    })
  }

}
