import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  displayName: any
  userService:UserService = inject(UserService)

  router:Router = inject(Router)

  fauthService:AuthService = inject(AuthService)

  sharingService:SharingService = inject(SharingService)
  constructor() { 

      
			this.sharingService.isUserLoggedIn
      .subscribe(value=> {
          if(value){
            this.userService.getCurrentUser()
          .then(user=> {
            this.displayName = user.displayName!=null? user.displayName: user.email
            console.log("display Name:",this.displayName);
          });	
          }else{
          this.displayName=""
        }
      }
      )
  }
  logout(){
    this.fauthService.logout().then(()=>{
      //this.router.navigate(["item"])
      location.href="/login"
    })
  }
}
