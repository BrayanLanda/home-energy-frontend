import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { UpdateUserRequest } from '../models/update-user-request';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  // Signal para mantener el estado del usuario actual
  currentUser = signal<LoginResponse | null>(null);

  constructor() {
    // Intentar recuperar usuario del localStorage al iniciar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
   }

  register(user: User){
    return this.http.post<User>(`${this.baseUrl}user/register`, user);
  }

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}user/login`, credentials)
    .pipe(
      tap(response => {
        // Guardar usuario en signal y localStorage
        this.currentUser.set(response);
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  updateUser(userId: number, userData: UpdateUserRequest) {
    return this.http.put<LoginResponse>(`${this.baseUrl}user/${userId}`, userData);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}
