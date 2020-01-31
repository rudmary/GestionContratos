import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService: CookieService ) { }

  isLoggedIn(): boolean {
    return this.cookieService.check('gContracts.AspNetCore');
  }
}
