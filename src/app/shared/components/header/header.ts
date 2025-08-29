import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(private authService: Auth) { }

  // isAuthenticated(): boolean {
  //   return this.authService.isAuthenticated();
  // }

  logout(): void {
    this.authService.logout();
  }

}
