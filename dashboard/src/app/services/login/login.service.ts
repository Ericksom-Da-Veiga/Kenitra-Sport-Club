import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface loginData{
  mail: string,
  password: string
}
export interface loginResponse{
  token: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  MakeLogin(inputData: loginData){
    return this.http.post<loginResponse>('http://localhost:8080/login',null).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token );
        sessionStorage.setItem("username", value.name )
      })
    )
  }
}
