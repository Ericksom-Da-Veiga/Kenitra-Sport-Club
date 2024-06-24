import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mail!: string;
  password!: string;
  error!: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ){
  }

  Login(){
    if (this.mail && this.password) {
      var inputData = {
        mail: this.mail,
        password: this.password
      };

      this.loginService.MakeLogin(inputData).subscribe({
        next: (token: any) => {
          localStorage.setItem('token', token);

          const tokenPayload: any = jwt_decode(token);
          localStorage.setItem('role', tokenPayload.role);

          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.error = "email ou mot passe incorrect"
        }
      });
    } else {
      this.error = "email et mot-pass sont obligatoires"
    }
  }
}