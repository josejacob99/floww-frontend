import { Component, OnInit } from '@angular/core';
import { UIStateService } from 'src/app/core/service/state/ui-state.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;

  constructor(private uiState: UIStateService) { }

  ngOnInit(): void {
    this.uiState.spinnerState$.subscribe(state => this.showSpinner = state);
  }

}
