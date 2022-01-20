import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';


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
    FlexLayoutModule
  ],
  exports: [],
  providers: [],
})
export class AuthModule { }
