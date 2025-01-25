import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface loginData{
  mail: string,
  password: string
}
export interface loginResponse{
  token: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  MakeLogin(inputData: any): Observable<any> {
    return this.http.post('http://localhost:8080/login', inputData, { responseType: 'text' });
  }
}
