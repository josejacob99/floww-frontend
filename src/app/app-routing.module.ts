import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'create',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/ce-transaction/cetx.module').then(mod => mod.CetxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
