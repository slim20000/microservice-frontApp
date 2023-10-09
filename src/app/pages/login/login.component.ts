import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AppAuthService} from "./_services/app-auth.service";
import {AppService} from "./_services/app.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private appService: AppService,
              private appAuthService: AppAuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }
  public register() {
    this.router.navigate(['/register']);
  }
  login(loginForm: NgForm) {
    this.appService.login(loginForm.value).subscribe(
      (response: any) => {
        this.appAuthService.setRole(response.user.role);
        this.appAuthService.setToken(response.token);
        this.appAuthService.setUserId(response.user.id.toString());
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'login success',
          showConfirmButton: false,
          timer: 1500
        });
        const role = response.user.role;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'CANDIDATE') {
          this.fetchAndNavigateCandidate(response.user.id);
        } else {
          this.router.navigate(['/company']);
        }
        this.toastr.success('Logged in successfully!');
      },
      (error) => {
        this.toastr.error('Login failed. Please try again.');
        if (error.status === 401 || 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or password is incorrect!',
            footer: '<a href="">Forgot your password?</a>'
          });
        } else {
          this.toastr.error('Login failed. Please try again.');
        }
      }
    );
  }
  fetchAndNavigateCandidate(userId: any): void {
    this.appService.getCandidateByUserId().subscribe(
      (candidateData: any) => {
        this.router.navigate(['/create-candidate']);
      },
      (error) => {
        console.log("Error fetching candidate data:", error);
        this.router.navigate(['/create-candidate']);

      }
    );
  }
  ngOnDestroy() {
  }

}
