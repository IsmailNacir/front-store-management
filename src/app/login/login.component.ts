import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  erorrMessage!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loginFormGroup = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleLogin() {
    let username = this.loginFormGroup.get('username')?.value;
    let password = this.loginFormGroup.get('password')?.value;

    this._loginService.login(username, password).subscribe({
      next: (user) => {
        this._loginService.authenticateUser(user).subscribe({
          next: () => {
            this._router.navigateByUrl('/welcome');
          },
        });
      },
      error: (err) => {
        this.erorrMessage = err;
      },
    });
  }
}
