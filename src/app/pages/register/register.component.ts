import {Component, OnInit} from '@angular/core';
import {AppService} from "../login/_services/app.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSubmitting = false;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  userData = {
    id: 0,
    username: '',
    email: '',
    password: '',
    verificationCode: '',
    role: ''
  };

  private appService: AppService;

  constructor(appService: AppService, private router: Router) {
    this.appService = appService;
  }

  ngOnInit(): void {
  }

  setRole(role: string) {
    this.userData.role = role;
  }

  verifyEmail() {
    this.appService.verifyEmail(this.userData.verificationCode).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Email successfully verified!',
          showConfirmButton: true
        });
        console.log('Email successfully verified!');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email verification failed. Please try again or check the verification code.',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        console.error('Email verification failed. Please try again or check the verification code.');
      }
    );
  }

  onRegister() {
    console.log('Register method called');
    this.isSubmitting = true;
    console.log(this.userData);
    this.appService.registerUser(this.userData).subscribe(
      response => {
        console.log('User successfully registered!');
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Enter the verification code sent to your email.',
          showConfirmButton: true
        });
        this.successMessage = 'User successfully registered! Enter the verification code sent to your email.';
      },
      error => {
        const errorMsg = error.error.message || 'Registration failed. Please try again.';
        console.error(errorMsg);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMsg,
          footer: '<a href="">Need help?</a>'
        });
      }
    );
  }

  ngOnDestroy() {
  }
}
