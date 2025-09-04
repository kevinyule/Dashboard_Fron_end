import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import GlobalLoader from '../../../shared/components/global-loader/global-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, GlobalLoader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  user: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: Auth, private router: Router) {}

  login(): void {
    this.isLoading = true;
    console.log('Attempting login with', this.user, this.password);
    this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);
      },
    });
  }

  ngOnInit(): void {}
}
