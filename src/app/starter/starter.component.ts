import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.css'
})
export class StarterComponent {
  constructor(private us:UserService){}

  book(){
    this.us.navigateTo('/book')
  }

  login(){
    this.us.navigateTo('/login')
  }

  signup(){
    this.us.navigateTo('/signup');
  }

}
