import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem('token'); // Usar localStorage ao invés de sessionStorage
    
    if (authToken) {
      const tokenPayload: any = jwt_decode(authToken);
      const requiredRole = next.data['role'];
      
      if (requiredRole && tokenPayload.role !== requiredRole) {
        this.router.navigate(['/dashboard']); // Redirecionar se o usuário não tiver o papel necessário
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);

      return false;
    }
  }

}
