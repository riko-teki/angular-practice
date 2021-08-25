import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //認証済みの場合は、ホーム画面へ遷移
    if (this.authService.isAuthenticated()) {
      const factory = sessionStorage.getItem('factory');
      if (factory) {
        this.router.navigate(['maintenances-group', factory]);
        return false;
      } else {
        this.authService.signOut();
        this.router.navigate(['login']);
      }
    }
    return true;
  }
}
