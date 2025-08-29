import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  private isBrowser: boolean;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.LOGIN_URL, { username, password }).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
        }
      })
    );
  }

  private setToken(accessToken: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, accessToken);
    }
  }

  private getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const accessToken = this.getToken();
    if (!accessToken) return false;

    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }
}
