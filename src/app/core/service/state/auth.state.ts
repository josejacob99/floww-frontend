import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get authenticated$() {
    return this.authenticated.asObservable();
  }

  isAuthenticated() {
    this.authenticated.next(true);
  }

  logout() {
    this.authenticated.next(false);
  }
}
