import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoggedInUser } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistrationResponseDto, User, UserForRegistrationDto } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPassword, ResetPasswordDto } from 'src/app/shared/models/ForgotPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<ILoggedInUser> {
    return this.http.post<ILoggedInUser>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }


  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(',')
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
// forgot password

public forgotPassword = (body: ForgotPassword) => {
  return this.http.post(`${environment.apiBaseUrl}/api/Auth/ForgotPassword`, body);
}

public resetPassword = (body: ResetPasswordDto) => {
  return this.http.post(`${environment.apiBaseUrl}/api/Auth/ResetPassword`, body);
}

public registerUser = (body: UserForRegistrationDto) => {
  return this.http.post<RegistrationResponseDto> (`${environment.apiBaseUrl}/api/Auth/register`, body);
}
}
