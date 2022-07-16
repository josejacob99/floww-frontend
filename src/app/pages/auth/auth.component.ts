import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/core/service/auth.service';
import { UIStateService } from 'src/app/core/service/state/ui-state.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private uiState: UIStateService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user) {
        this.loginWithGoogle(user.idToken)
      }
    });
  }

  loginWithGoogle(idToken: string): void {

    this.authService.loginWithGoogleIdToken(idToken).subscribe(() => {
      this.uiState.hideSpinner();
    });

  }
}
