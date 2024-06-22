import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private Http: HttpClient) { }

  countAbonnements(){
    return this.Http.get('http://localhost:8080/dashboard/abonnements');
  };

  countSports(){
    return this.Http.get('http://localhost:8080/dashboard/sports');
  };

  countMoney(){
    return this.Http.get('http://localhost:8080/dashboard/payements');
  };

  getAbonnements(){
    return this.Http.get('http://localhost:8080/dashboard');
  };

  countAdherants(){
    return this.Http.get('http://localhost:8080/dashboard/adherants');
  };
}
