import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/core/service/auth.service';
import { UIStateService } from 'src/app/core/service/state/ui-state.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private uiState: UIStateService) { }

  loginWithGoogle(): void {
    this.uiState.showSpinner();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.authService.loginWithGoogleIdToken(data.idToken).subscribe(() => {
        this.uiState.hideSpinner();
      });
    });
  }
}
