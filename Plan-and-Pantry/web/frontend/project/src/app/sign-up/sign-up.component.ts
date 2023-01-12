import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  loginForm: any;
  hide: any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      }
    );

    this.hide = true;
  }
  onLogin() {

  }

  confirmValidation(): boolean {
    return this.loginForm.password == this.loginForm.confirmPassword;
  }
}
