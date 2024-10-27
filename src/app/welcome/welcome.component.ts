import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export default class WelcomeComponent implements OnInit {
  user: User | undefined;
  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {
    this.user = this._loginService.authenticatedUser;
  }
  handleLogOut() {
    this._loginService.logOut().subscribe({
      next: () => {
        this._router.navigateByUrl('/login');
      },
    });
  }
}
