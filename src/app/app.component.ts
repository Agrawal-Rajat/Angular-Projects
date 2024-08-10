import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StarterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'restro';
}
