import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";


import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserAccessRoutingModule { }
