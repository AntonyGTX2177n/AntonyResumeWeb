import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../home-page/home-page.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ContentRoutingModule } from '../content-routing/content-routing.module';
import { HeaderComponent } from 'src/app/main-frame/header/header.component';
import { PostProfileComponent } from 'src/app/profile-content/post-profile/post-profile.component';
import { ViewProfileComponent } from 'src/app/profile-content/view-profile/view-profile.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    PostProfileComponent,
    ViewProfileComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ContentRoutingModule, 
    ReactiveFormsModule
  ]
})
export class ContentModelModule { }
