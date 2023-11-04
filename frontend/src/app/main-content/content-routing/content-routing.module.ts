import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { PostProfileComponent } from 'src/app/profile-content/post-profile/post-profile.component';
import { ViewProfileComponent } from 'src/app/profile-content/view-profile/view-profile.component';



const routes: Routes = [
  { path: "homePage", component: HomePageComponent },
  { path: "profileCreate", component: PostProfileComponent },
  { path: "edit/:postId", component: PostProfileComponent },
  { path: "viewProfile", component: ViewProfileComponent },
 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContentRoutingModule { }
