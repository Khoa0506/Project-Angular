import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  router: Router = inject(Router)
		fb:FormBuilder = inject(FormBuilder)
    fauthService : AuthService = inject(AuthService)

    userFrm: any
    constructor(){
      this.userFrm = this.fb.group({
        email:['',[Validators.required, Validators.email]], 
        password:['',[Validators.required]],
        confirmPassword:[''],
      });
    }


    createUser() {
      this.fauthService.CreateAccount(this.userFrm.controls['email'].value, this.userFrm.controls['password'].value)
      .then(user =>{
        console.log(user)
        this.router.navigate(["/admin/home"])
      })
    }
}
