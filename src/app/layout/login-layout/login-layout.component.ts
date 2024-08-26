import { Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginLayoutComponent {

}
