import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class SiteGuard implements CanActivate {


  constructor(private sessionService: SessionService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.sessionService.isLoggedIn()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
