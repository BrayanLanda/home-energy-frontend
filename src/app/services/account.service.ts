import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { UpdateUserRequest } from '../models/update-user-request';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  constructor() { }

  register(user: User){
    return this.http.post<User>(`${this.baseUrl}user/register`, user);
  }

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}user/login`, credentials);
  }

  updateUser(userId: number, userData: UpdateUserRequest) {
    return this.http.put<LoginResponse>(`${this.baseUrl}user/${userId}`, userData);
  }
}
