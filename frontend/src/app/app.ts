import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  protected readonly title = signal('frontend');
}
