import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroPageComponent } from './main-frame/intro-page/intro-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ContentModelModule } from './main-content/content-model/content-model.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserAccessInterceptor } from './user-access/user-access.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ContentModelModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserAccessInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
