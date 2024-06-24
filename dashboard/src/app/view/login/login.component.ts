import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

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
        next: (res: any) => {
          // Sucesso: res é a string do token JWT
          console.log('Token recebido:', res);

          // Armazenar o token onde for necessário (por exemplo, localStorage)
          localStorage.setItem('token', res);

          // Redirecionar ou realizar outra ação após o login
          this.router.navigate(['/dashboard']); // Exemplo de redirecionamento
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