import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ProfileData } from './profileInterface';
import { UpdateData } from './update-interface';

const BACKEND_URL = environment.apiUrl + "/profile/";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private posts: ProfileData[] = [];
  private postsUpdated = new Subject<{ posts: ProfileData[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                profileImage: post.profileImage,
                firstName: post.firstName,
                middleName: post.middleName,
                lastName: post.lastName,
                email: post.email,
                mobileNumber: post.mobileNumber,
                whatsAppNumber: post.whatsAppNumber,
                lineOne: post.lineOne,
                lineTwo: post.lineTwo,
                streetName: post.streetName,
                state: post.state,
                country: post.country,
                zipCode: post.zipCode,
                collegeName: post.collegeName,
                courseName: post.courseName,
                graduationYear: post.graduationYear,
                certificateName: post.certificateName,
                certificateCourseName: post.certificateCourseName,
                certifiedYear: post.certifiedYear,
                companyName: post.companyName,
                jobRole: post.jobRole,
                duration: post.duration,
                dateOfJoining: post.dateOfJoining,
                dateOfReleaving: post.dateOfReleaving,
                noticePeriod: post.noticePeriod,
                declaration: post.declaration,
                id: post._id,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      profileImage: string,
      firstName: string,
      middleName: string,
      lastName: string,
      email: string,
      mobileNumber: number,
      whatsAppNumber: number,
      lineOne: string,
      lineTwo: string,
      streetName: string,
      state: string,
      country: string,
      zipCode: number,
      collegeName: string,
      courseName: string,
      graduationYear: Date,
      certificateName: string,
      certificateCourseName: string,
      certifiedYear: Date,
      companyName: string,
      jobRole: string,
      duration: number,
      dateOfJoining: Date,
      dateOfReleaving: Date,
      noticePeriod: number,
      declaration: string
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPost(
    profileImage: File,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    mobileNumber: Blob,
    whatsAppNumber: Blob,
    lineOne: string,
    lineTwo: string,
    streetName: string,
    state: string,
    country: string,
    zipCode: Blob,
    collegeName: string,
    courseName: string,
    graduationYear: Blob,
    certificateName: string,
    certificateCourseName: string,
    certifiedYear: Blob,
    companyName: string,
    jobRole: string,
    duration: Blob,
    dateOfJoining: Blob,
    dateOfReleaving: Blob,
    noticePeriod: Blob,
    declaration: string
  ) {
    const postData = new FormData();
    postData.append("profileImage", profileImage, firstName);
    postData.append("firstName", firstName);
    postData.append("middleName", middleName);
    postData.append("lastName", lastName);
    postData.append("email", email);
    postData.append("mobileNumber", mobileNumber);
    postData.append("whatsAppNumber", whatsAppNumber);
    postData.append("lineOne", lineOne);
    postData.append("lineTwo", lineTwo);
    postData.append("streetName", streetName);
    postData.append("state", state);
    postData.append("country", country);
    postData.append("zipCode", zipCode);
    postData.append("collegeName", collegeName);
    postData.append("courseName", courseName);
    postData.append("graduationYear", graduationYear);
    postData.append("certificateName", certificateName);
    postData.append("certificateCourseName", certificateCourseName);
    postData.append("certifiedYear", certifiedYear);
    postData.append("companyName", companyName);
    postData.append("jobRole", jobRole);
    postData.append("duration", duration);
    postData.append("dateOfJoining", dateOfJoining);
    postData.append("dateOfReleaving", dateOfReleaving);
    postData.append("noticePeriod", noticePeriod);
    postData.append("declaration", declaration);

    this.http
      .post<{ message: string; post: ProfileData }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
        // this.router.navigate(["/"]);
      });
  }

  updatePost(
    id: string,
    profileImage: File,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    mobileNumber: Blob,
    whatsAppNumber: Blob,
    lineOne: string,
    lineTwo: string,
    streetName: string,
    state: string,
    country: string,
    zipCode: Blob,
    collegeName: string,
    courseName: string,
    graduationYear: Blob,
    certificateName: string,
    certificateCourseName: string,
    certifiedYear: Blob,
    companyName: string,
    jobRole: string,
    duration: Blob,
    dateOfJoining: Blob,
    dateOfReleaving: Blob,
    noticePeriod: Blob,
    declaration: string
  ) {
    let postData: ProfileData | FormData;

    postData = new FormData();
    postData.append("id", id);
    postData.append("profileImage", profileImage, firstName);
    postData.append("firstName", firstName);
    postData.append("middleName", middleName);
    postData.append("lastName", lastName);
    postData.append("email", email);
    postData.append("mobileNumber", mobileNumber);
    postData.append("whatsAppNumber", whatsAppNumber);
    postData.append("lineOne", lineOne);
    postData.append("lineTwo", lineTwo);
    postData.append("streetName", streetName);
    postData.append("state", state);
    postData.append("country", country);
    postData.append("zipCode", zipCode);
    postData.append("collegeName", collegeName);
    postData.append("courseName", courseName);
    postData.append("graduationYear", graduationYear);
    postData.append("certificateName", certificateName);
    postData.append("certificateCourseName", certificateCourseName);
    postData.append("certifiedYear", certifiedYear);
    postData.append("companyName", companyName);
    postData.append("jobRole", jobRole);
    postData.append("duration", duration);
    postData.append("dateOfJoining", dateOfJoining);
    postData.append("dateOfReleaving", dateOfReleaving);
    postData.append("noticePeriod", noticePeriod);
    postData.append("declaration", declaration);
    // if (typeof profileImage === "object") {
    //   postData = new FormData();
    //   postData.append("id", id);
    //   postData.append("profileImage", profileImage, firstName);
    //   postData.append("firstName", firstName);
    //   postData.append("middleName", middleName);
    //   postData.append("lastName", lastName);
    //   postData.append("email", email);
    //   postData.append("mobileNumber", mobileNumber);
    //   postData.append("whatsAppNumber", whatsAppNumber);
    //   postData.append("lineOne", lineOne);
    //   postData.append("lineTwo", lineTwo);
    //   postData.append("streetName", streetName);
    //   postData.append("state", state);
    //   postData.append("country", country);
    //   postData.append("zipCode", zipCode);
    //   postData.append("collegeName", collegeName);
    //   postData.append("courseName", courseName);
    //   postData.append("graduationYear", graduationYear);
    //   postData.append("certificateName", certificateName);
    //   postData.append("certificateCourseName", certificateCourseName);
    //   postData.append("certifiedYear", certifiedYear);
    //   postData.append("companyName", companyName);
    //   postData.append("jobRole", jobRole);
    //   postData.append("duration", duration);
    //   postData.append("dateOfJoining", dateOfJoining);
    //   postData.append("dateOfReleaving", dateOfReleaving);
    //   postData.append("noticePeriod", noticePeriod);
    //   postData.append("declaration", declaration);
    // } else {
    //   // postData = {
    //   //   id: id,
    //   //   profileImage: profileImage,
    //   //   firstName: firstName,
    //   //   middleName: middleName,
    //   //   lastName: lastName,
    //   //   email: email,
    //   //   mobileNumber: mobileNumber,
    //   //   whatsAppNumber: whatsAppNumber,
    //   //   lineOne: lineOne,
    //   //   lineTwo: lineTwo,
    //   //   streetName: streetName,
    //   //   state: state,
    //   //   country: country,
    //   //   zipCode: zipCode,
    //   //   collegeName: collegeName,
    //   //   courseName: courseName,
    //   //   graduationYear: graduationYear,
    //   //   certificateName: certificateName,
    //   //   certificateCourseName: certificateCourseName,
    //   //   certifiedYear: certifiedYear,
    //   //   companyName: companyName,
    //   //   jobRole: jobRole,
    //   //   duration: duration,
    //   //   dateOfJoining: dateOfJoining,
    //   //   dateOfReleaving: dateOfReleaving,
    //   //   noticePeriod: noticePeriod,
    //   //   declaration: declaration,
    //   //   creator: null
    //   // };
    //   console.log("failed to update")
    // }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

}


