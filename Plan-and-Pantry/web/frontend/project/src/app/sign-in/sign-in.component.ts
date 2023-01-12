import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  loginForm: any;
  hide: any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      }
    );

    this.hide = true;
  }
  onLogin() {

  }
}
