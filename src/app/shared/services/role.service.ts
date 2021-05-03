/*
============================================
; Title: role.service.ts
; Author: Professor Krasso
; Date:   29 April 2021
; Modified by: Karina Alvarez
; Description: Role Service
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @returns an observably of type any
   */
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  /**
   *
   * @param roleId string of role
   * @returns an observably of type anu
   */
  findRolesById(roleId: string): Observable<any> {
    return this.http.get(`/api/roles/${roleId}`)
  }

  /**
   *
   * @param role string of role
   * @returns an observably of type any
   */
  createRole(role: Role): Observable<any> {
    return this.http.post(`/api/roles`, {
      text: role.text
    })
  }

  /**
   *
   * @param roleId string of role
   * @param role string of role
   * @returns an observably of type any
   */
  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.post(`/api/roles/${roleId}`, {
      text: role.text
    })
  }

  /**
   *
   * @param roleId string of role
   * @returns an observable of any
   */
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`/api/roles/${roleId}`)
  }

  /**
   *
   * @param username string of user
   * @returns an observable of any
   */
  findUserRole(username: string): Observable<any> {
    return this.http.get(`/api/users/${username}/role`)
  }
}
