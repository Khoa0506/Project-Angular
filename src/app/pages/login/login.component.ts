import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authSrv:AuthService = inject(AuthService)
  router:Router = inject(Router) 
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  tryGoogleLogin() {
    this.authSrv.signinGmail()
      .then(() => {
        console.log("Đăng nhập bằng Google thành công!");
        this.router.navigate(["/admin/home"]);
      })
      .catch(error => {
        console.error("Đăng nhập bằng Google thất bại:", error);
        this.errorMessage = "Đăng nhập bằng Google thất bại. Vui lòng thử lại sau.";
      });
    }
  tryFirebaseLogin() {
    if (this.email === '' || this.password === '') {
      console.error("Email và mật khẩu không được để trống.");
      this.errorMessage = "Email và mật khẩu không được để trống.";
      return;
    }
  
    this.authSrv.login(this.email, this.password)
      .then(() => {
        console.log("Đăng nhập thành công!", this.email);
        this.router.navigate(["/admin/home"]);
      })
      .catch(error => {
        console.error("Đăng nhập thất bại:", error);
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
          this.errorMessage = "Email hoặc mật khẩu không đúng.";
        } else {
          this.errorMessage = "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.";
        }
      });
  }
  
}