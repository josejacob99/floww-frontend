import { Component, OnInit } from '@angular/core';
import { HomeViews, UIStateService } from 'src/app/core/service/state/ui-state.service';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['./view-switch.component.scss']
})
export class ViewSwitchComponent implements OnInit {
  currentView = HomeViews.Transactions;
  constructor(private uiState: UIStateService) { }

  ngOnInit(): void {
    this.uiState.homeView$.subscribe(data => {
      this.currentView = data;
    });
  }

  get icon() {
    return this.currentView === HomeViews.Transactions ? 'insert_chart' : 'swap_horiz';
  }

  switchView() {
    this.uiState.toggleHomeView();
  }

}
