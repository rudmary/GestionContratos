import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { isNullOrUndefine } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = this.baseUrl + "api";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public authenticateUser(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/Login/login`)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public login(redirectUrl: string): void {
    window.location.href = `${this.apiURL}/Login/login?returnUrl=${this.baseUrl}${redirectUrl}`;
  }

  public exitUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    return this.http.get(`${this.apiURL}/logout`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/Login`);
  }

  public getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/Login/${userId}`);
  }
}
