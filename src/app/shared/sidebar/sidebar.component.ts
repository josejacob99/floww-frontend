import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { TransactionTypes } from '../category-tree/category-tree.component';
import { BreakpointObserver } from '@angular/cdk/layout'
import { UIStateService } from 'src/app/core/service/state/ui-state.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  type = TransactionTypes;


  constructor(private eRef: ElementRef, public uiState: UIStateService) {}

  ngOnInit(): void {
    this.uiState.isSmallScreen$.subscribe((isSmallScreen)=> {
      isSmallScreen ? this.uiState.sidebarState = false: this.uiState.sidebarState = true;
    });

    this.uiState.sidebarState$.subscribe(data => {
      data ? this.openSidebar() : this.closeSidebar();
    });
  }

  openSidebar() {
    this.eRef.nativeElement.style.width = '500px';
  }

  closeSidebar() {
    this.eRef.nativeElement.style.width = '0px';
  }
}
