import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileData } from '../profileInterface';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserAccessService } from 'src/app/user-access/user-access.service';
import { mimeType } from './mime-type.validator';
import { UpdateData } from '../update-interface';


@Component({
  selector: 'app-post-profile',
  templateUrl: './post-profile.component.html',
  styleUrls: ['./post-profile.component.css']
})
export class PostProfileComponent implements OnInit, OnDestroy {

  imagePreview: string;
  isLoading = false;
  profile: ProfileData;
  upDateProfile: UpdateData;
  prifileCreationForm: FormGroup;
  private mode = "content/profileCreate";
  private postId: string;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(
    public porfileService: ProfileService,
    public route: ActivatedRoute,
    private authService: UserAccessService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.prifileCreationForm = new FormGroup({
      profileImage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      middleName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      mobileNumber: new FormControl(null, { validators: [Validators.required] }),
      whatsAppNumber: new FormControl(null, { validators: [Validators.required] }),
      lineOne: new FormControl(null, { validators: [Validators.required] }),
      lineTwo: new FormControl(null, { validators: [Validators.required] }),
      streetName: new FormControl(null, { validators: [Validators.required] }),
      state: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      zipCode: new FormControl(null, { validators: [Validators.required] }),
      collegeName: new FormControl(null, { validators: [Validators.required] }),
      courseName: new FormControl(null, { validators: [Validators.required] }),
      graduationYear: new FormControl(null, { validators: [Validators.required] }),
      certificateName: new FormControl(null, { validators: [Validators.required] }),
      certificateCourseName: new FormControl(null, { validators: [Validators.required] }),
      certifiedYear: new FormControl(null, { validators: [Validators.required] }),
      companyName: new FormControl(null, { validators: [Validators.required] }),
      jobRole: new FormControl(null, { validators: [Validators.required] }),
      duration: new FormControl(null, { validators: [Validators.required] }),
      dateOfJoining: new FormControl(null, { validators: [Validators.required] }),
      dateOfReleaving: new FormControl(null, { validators: [Validators.required] }),
      noticePeriod: new FormControl(null, { validators: [Validators.required] }),
      declaration: new FormControl(null, { validators: [Validators.required] }),
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "content/edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.porfileService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.profile = {
            id: postData._id,
            profileImage: postData.profileImage,
            middleName: postData.middleName,
            firstName: postData.firstName,
            lastName: postData.lastName,
            email: postData.email,
            mobileNumber: postData.mobileNumber,
            whatsAppNumber: postData.whatsAppNumber,
            lineOne: postData.lineOne,
            lineTwo: postData.lineTwo,
            streetName: postData.streetName,
            state: postData.state,
            country: postData.country,
            zipCode: postData.zipCode,
            collegeName: postData.collegeName,
            courseName: postData.courseName,
            graduationYear: postData.graduationYear,
            certificateName: postData.certificateName,
            certificateCourseName: postData.certificateCourseName,
            certifiedYear: postData.certifiedYear,
            companyName: postData.companyName,
            jobRole: postData.jobRole,
            duration: postData.duration,
            dateOfJoining: postData.dateOfJoining,
            dateOfReleaving: postData.dateOfReleaving,
            noticePeriod: postData.noticePeriod,
            declaration: postData.declaration,
            creator: postData.creator
          };
          this.prifileCreationForm.setValue({
            profileImage: this.profile.profileImage,
            firstName: this.profile.firstName,
            middleName: this.profile.middleName,
            lastName: this.profile.lastName,
            email: this.profile.email,
            mobileNumber: this.profile.mobileNumber,
            whatsAppNumber: this.profile.whatsAppNumber,
            lineOne: this.profile.lineOne,
            lineTwo: this.profile.lineTwo,
            streetName: this.profile.streetName,
            state: this.profile.state,
            country: this.profile.country,
            zipCode: this.profile.zipCode,
            collegeName: this.profile.collegeName,
            courseName: this.profile.courseName,
            graduationYear: this.profile.graduationYear,
            certificateName: this.profile.certificateName,
            certificateCourseName: this.profile.certificateCourseName,
            certifiedYear: this.profile.certifiedYear,
            companyName: this.profile.companyName,
            jobRole: this.profile.jobRole,
            duration: this.profile.duration,
            dateOfJoining: this.profile.dateOfJoining,
            dateOfReleaving: this.profile.dateOfReleaving,
            noticePeriod: this.profile.noticePeriod,
            declaration: this.profile.declaration,
          });
        });
      } else {
        this.mode = "content/profileCreate";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.prifileCreationForm.patchValue({ profileImage: file });
    this.prifileCreationForm.get("profileImage").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  testPost() {
    console.log(this.prifileCreationForm.value);
  }


  onSavePost() {
    if (this.prifileCreationForm.invalid) {
      return console.log("form is not valid");
    }
    this.isLoading = true;
    if (this.mode === "content/profileCreate") {
      const dataPosted = this.porfileService.addPost(
        this.prifileCreationForm.value.profileImage,
        this.prifileCreationForm.value.firstName,
        this.prifileCreationForm.value.middleName,
        this.prifileCreationForm.value.lastName,
        this.prifileCreationForm.value.email,
        this.prifileCreationForm.value.mobileNumber,
        this.prifileCreationForm.value.whatsAppNumber,
        this.prifileCreationForm.value.lineOne,
        this.prifileCreationForm.value.lineTwo,
        this.prifileCreationForm.value.streetName,
        this.prifileCreationForm.value.state,
        this.prifileCreationForm.value.country,
        this.prifileCreationForm.value.zipCode,
        this.prifileCreationForm.value.collegeName,
        this.prifileCreationForm.value.courseName,
        this.prifileCreationForm.value.graduationYear,
        this.prifileCreationForm.value.certificateName,
        this.prifileCreationForm.value.certificateCourseName,
        this.prifileCreationForm.value.certifiedYear,
        this.prifileCreationForm.value.companyName,
        this.prifileCreationForm.value.jobRole,
        this.prifileCreationForm.value.duration,
        this.prifileCreationForm.value.dateOfJoining,
        this.prifileCreationForm.value.dateOfReleaving,
        this.prifileCreationForm.value.noticePeriod,
        this.prifileCreationForm.value.declaration,
      );
      // console.log(this.prifileCreationForm.value)
      this.router.navigate(["/content/homePage"]);  

    } else {
      this.porfileService.updatePost(
        this.postId,
        this.prifileCreationForm.value.profileImage,
        this.prifileCreationForm.value.firstName,
        this.prifileCreationForm.value.middleName,
        this.prifileCreationForm.value.lastName,
        this.prifileCreationForm.value.email,
        this.prifileCreationForm.value.mobileNumber,
        this.prifileCreationForm.value.whatsAppNumber,
        this.prifileCreationForm.value.lineOne,
        this.prifileCreationForm.value.lineTwo,
        this.prifileCreationForm.value.streetName,
        this.prifileCreationForm.value.state,
        this.prifileCreationForm.value.country,
        this.prifileCreationForm.value.zipCode,
        this.prifileCreationForm.value.collegeName,
        this.prifileCreationForm.value.courseName,
        this.prifileCreationForm.value.graduationYear,
        this.prifileCreationForm.value.certificateName,
        this.prifileCreationForm.value.certificateCourseName,
        this.prifileCreationForm.value.certifiedYear,
        this.prifileCreationForm.value.companyName,
        this.prifileCreationForm.value.jobRole,
        this.prifileCreationForm.value.duration,
        this.prifileCreationForm.value.dateOfJoining,
        this.prifileCreationForm.value.dateOfReleaving,
        this.prifileCreationForm.value.noticePeriod,
        this.prifileCreationForm.value.declaration,
      );
      this.router.navigate(["/content/homePage"]);  
    }
    this.prifileCreationForm.reset();
    
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
