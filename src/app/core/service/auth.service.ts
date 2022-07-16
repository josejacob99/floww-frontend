import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AUTH_TOKEN } from '../constants/local-storage.constant';
import { AuthenticationPayload } from '../interface/authentication.interface';
import { AuthStateService } from './state/auth.state';
import { UIStateService } from './state/ui-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint = 'auth'
  constructor(private http: HttpClient, private router: Router,
    private authState: AuthStateService,
    private uiState: UIStateService,
    private socialAuthService: SocialAuthService) { }

  loginWithGoogleIdToken(token: string): Observable<AuthenticationPayload> {
    return this.http.post<AuthenticationPayload>(`${environment.api}${this.endPoint}/verify-google-id-token`, { token })
      .pipe(tap(data => this.authenticate(data.accessToken)));
  }

  logout() {
    this.socialAuthService.signOut().then(()=> {
      localStorage.removeItem(AUTH_TOKEN);
      this.authState.logout();
      this.uiState.hideSpinner();
    });
    this.router.navigate(['/auth']);
  }

  authenticate(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);
    this.authState.isAuthenticated();
    this.router.navigate(['/home']);
  }

  verifyUser(): Observable<AuthenticationPayload> {
    return this.http.get<AuthenticationPayload>(`${environment.api}${this.endPoint}`)
      .pipe(tap(data => this.authenticate(data.accessToken)));
  }

  get getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }
}
