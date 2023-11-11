import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interface/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  isSubmitted = false;
  errorMessage = '';
  userForm = this.FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })
  constructor(
    private UserService: UserService,
    private FormBuilder: FormBuilder,
    private Router: Router
  ) { }
  onHandleSignin() {
    if (this.userForm.valid) {
      const user: IUser = {
        email: this.userForm.value.email?.trim() || "",
        password: this.userForm.value.password || "",
      }
      this.UserService.signIn(user).subscribe(response => {
        localStorage.setItem("user", JSON.stringify(response));
        const storedUser: any = localStorage.getItem('user');
        const { user } = JSON.parse(storedUser);
        if (user.role == "admin") {
          this.Router.navigate(['/admin']);
        } else {
          this.Router.navigate(['/']);
        }
      }, (error) => {
      
        this.errorMessage = error.error.message
      }
      )
    }
  }
}
