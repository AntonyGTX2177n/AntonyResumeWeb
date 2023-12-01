import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAccessService } from '../user-access.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    private router: Router,
    public authService: UserAccessService
    ) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  registeringUser(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      form.value.email, 
      form.value.password,
      form.value.confirmPassword,
      form.value.termsAndCondition
    );
    this.router.navigate(['Auth/login'])
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
