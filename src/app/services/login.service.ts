import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  appUsers: User[] = [];
  authenticatedUser: User | undefined;

  constructor() {
    this.appUsers.push({
      id: UUID.UUID(),
      username: 'user',
      password: '0000',
      roles: ['ADMIN', 'USER'],
    });
    this.appUsers.push({
      id: UUID.UUID(),
      username: 'user1',
      password: '1111',
      roles: ['USER'],
    });
    this.appUsers.push({
      id: UUID.UUID(),
      username: 'user2',
      password: '2222',
      roles: ['USER'],
    });
  }

  login(username: string, password: string): Observable<User> {
    let user = this.appUsers.find((u) => u.username == username);

    if (!user) return throwError(() => new Error('User not found'));

    if (user.password != password)
      return throwError(() => new Error('Bad credentials'));

    return of(user);
  }

  authenticateUser(user: User): Observable<boolean> {
    this.authenticatedUser = user;

    localStorage.setItem(
      'AUTH_USER',
      JSON.stringify({ username: user.username, roles: user.roles })
    );

    return of(true);
  }

  hasRole(role: string): Observable<boolean> {
    return of(this.authenticatedUser!.roles.includes(role));
  }

  logOut(): Observable<boolean> {
    this.authenticatedUser = undefined;
    localStorage.clear();
    return of(true);
  }
}
