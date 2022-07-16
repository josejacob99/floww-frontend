import { Component, OnInit } from '@angular/core';
import { UIStateService } from 'src/app/core/service/state/ui-state.service';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private uiState: UIStateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.uiState.showSpinner();
    this.authService.logout();
  }

}
