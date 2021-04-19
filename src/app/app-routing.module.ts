/*
============================================
; Title: security-question.service.ts
; Author: Professor Krasso
; Date:   16 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description:
;===========================================
*/

//These are files being imported from external files
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';

// These are the paths added to the routes array
// Each of these path will take you to the designated component
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent
      },
      {
        path: 'user/create/new',
        component: UserCreateComponent
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent
      },
    ],
  //  canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component:AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
