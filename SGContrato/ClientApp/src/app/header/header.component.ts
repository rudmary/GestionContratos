import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model.component';
import { AuthService } from '../auth/auth.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent
{


  isExpanded = false;
  redirectUrl: string;

  public user: User;
  public isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService, private sessionService: SessionService, @Inject('BASE_URL') private baseUrl: string) {
    this.redirectUrl = `/api/Login/login?returnUrl=${this.baseUrl}/contratos`;
    this.isLoggedIn = this.sessionService.isLoggedIn();
    if (this.isLoggedIn) {
      this.router.navigate(['/contratos']);
    }
  }


 collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


  ngOnInit() {

  }

  login() {

    //this.userAuthenticated();
    this.authService.authenticateUser().subscribe(user => this.user = user, error => console.error(error), () => this.userAuthenticated());
  }

  public userAuthenticated() {
    this.isLoggedIn = true;
    this.router.navigate(['/contratos']);
  }

  logOut() {
    this.isLoggedIn = false;
    this.authService.exitUser().subscribe((response: any) => {
      console.log(response.url);
      window.open(response.url, '_blank');
      this.router.navigate(['/']);
    });
  }





}


