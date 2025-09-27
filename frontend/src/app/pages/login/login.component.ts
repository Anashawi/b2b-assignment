import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    this.loading = true;
    this.error = '';

    try {
      const success = await this.auth.login(this.username, this.password);
      if (success) {
        this.router.navigate(['/products']);
      } else {
        this.error = 'Invalid username or password';
      }
    } catch (e) {
      this.error = 'Invalid username or password';
    } finally {
      this.loading = false;
    }
  }
}
