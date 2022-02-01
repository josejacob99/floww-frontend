import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CategoryTreeComponent } from './category-tree/category-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PopoverComponent } from './popover/popover.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AddNewFabComponent } from './add-new-fab/add-new-fab.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoComponent } from './sidebar/logo/logo.component';
import { SidebarFooterComponent } from './sidebar/sidebar-footer/sidebar-footer.component';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from './header/header.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionRowComponent } from './transactions/transaction-row/transaction-row.component';
import { FooterComponent } from './footer/footer.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CoreModule } from '../core/core.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewSwitchComponent } from './view-switch/view-switch.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    CategoryTreeComponent,
    DialogComponent,
    CardComponent,
    DateFilterComponent,
    PopoverComponent,
    BreadcrumbsComponent,
    AddNewFabComponent,
    SidebarComponent,
    LogoComponent,
    SidebarFooterComponent,
    HeaderComponent,
    TransactionsComponent,
    TransactionRowComponent,
    FooterComponent,
    ProgressBarComponent,
    ConfirmDialogComponent,
    SpinnerComponent,
    ViewSwitchComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTreeModule,
    MatCheckboxModule,
    MatCardModule,
    CommonModule,
    MatRippleModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  exports: [ToolbarComponent,
    MatToolbarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatCardModule,
    CategoryTreeComponent,
    DialogComponent,
    CardComponent,
    MatDatepickerModule,
    DateFilterComponent,
    MatNativeDateModule,
    PopoverComponent,
    BreadcrumbsComponent,
    AddNewFabComponent,
    SidebarComponent,
    MatSelectModule,
    HeaderComponent,
    TransactionsComponent,
    FooterComponent,
    ProgressBarComponent,
    ConfirmDialogComponent,
    SpinnerComponent,
    ViewSwitchComponent,
    LogoComponent
  ],
  providers: [],
})
export class SharedModule { }
