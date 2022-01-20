import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { ActiveCategoryComponent } from './active-category/active-category.component';
import { CoreModule } from 'src/app/core/core.module';



export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '', component: HomeComponent
  },
];


@NgModule({
  declarations: [
    HomeComponent,
    SummaryCardComponent,
    CategoryOverviewComponent,
    ActiveCategoryComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    CoreModule

  ],
  exports: [],
  providers: [],
})
export class HomeModule { }
