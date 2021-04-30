/*
============================================
; Title: role-details.component.ts
; Author: Professor Krasso
; Date:   29 April 2021
; Modified by: Karina Alvarez
; Description: Role details
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  roles: Role[];
  displayedColumns = ['role', 'functions']

  constructor(private dialog: MatDialog, private roleService: RoleService) {
    /**
     * making a query to the database
     */
    this.roleService.findAllRoles().subscribe(res => {
      this.roles = res['data'];
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

  /**
   *
   * @param roleId
   * @param text
   * ensuring user wants to delete the role before completing request
   */
  delete(roleId, text) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: "Delete Record Dialog",
        dialogBody: `Are you sure you want to delete role ${text}?`
      },
      disableClose: true,
      width: '800'
    });

    /**
     * If confirm, the role is deleted
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe(res => {
          console.log('Role deleted')
          this.roles = this.roles.filter(role =>role._id != roleId)
        })
      }
    })
  }
}
