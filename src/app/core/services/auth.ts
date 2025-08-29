import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = environment.apiUrl;
  private LOGIN_URL = `${this.baseUrl}/auth/login`;
  private tokenKey = 'auth_token';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.LOGIN_URL, { username, password }).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          console.log(response.accessToken);
          this.setToken(response.accessToken);
        }
      })
    );
  }
  private setToken(accessToken: string): void {
    localStorage.setItem(this.tokenKey, accessToken);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const accessToken = this.getToken();
    if (!accessToken) {
      // Aquí podrías agregar lógica para verificar si el accessToken es válido o ha expirado
      return false;
    }
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void {
    localStorage.clear();
    // localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

}
