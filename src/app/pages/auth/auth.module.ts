import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

export const authRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '', component: AuthComponent,
    children: [
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'signup', component: SignUpComponent
    },
    {
      path: 'forgot-password', component: ForgotPasswordComponent
    },
  ]
  },
];


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    MatToolbarModule,
    RouterModule.forChild(authRoutes),
    SharedModule,
    FlexLayoutModule,
    SocialLoginModule
  ],
  exports: [],
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1095327336712-jr6nno76qdo9njcpho21p5rat1puqq7o.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }    ],
})
export class AuthModule { }
