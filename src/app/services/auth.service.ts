import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { SharingService } from './sharing.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fauth:Auth = inject(Auth)
  sharing:SharingService = inject(SharingService)
  router:Router = inject(Router)
  constructor() { }
  async CreateAccount(email: string, password:string){    
    return await  createUserWithEmailAndPassword(this.fauth,email,password)
      .then( result => {      //promise
      var user = result.user;
      console.log(user)
      alert("Create user success!")
      }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      });					  
  }
  async signinGmail(){
    var provider = new GoogleAuthProvider();
    return await  signInWithPopup(this.fauth,provider)
    .then( result => {
      var user = result.user;
      this.sharing.isUserLoggedIn.next(true)
      console.log(user)
      alert("Log in with Google success!")
      // IdP data available in result.additionalUserInfo.profile.				
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
     
    });
  }	
  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.fauth, email, password);
      const user = result.user;
      console.log(user);
      alert("Log in success!");
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      alert("Email or password not correct");
      throw error;
    }
  }
  logout(){
    return new Promise<any>((resolve,reject)=>{
      if (this.fauth.currentUser){
        this.fauth.signOut();
        this.sharing.isUserLoggedIn.next(false)
        resolve("log out");
        this.router.navigate(["/login"])
      }else{
        reject();
      }  
    })
    }
}
