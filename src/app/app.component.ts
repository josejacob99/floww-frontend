import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { UIStateService } from './core/service/state/ui-state.service';
import { SwUpdateService } from './core/service/sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'floww';

  constructor(private observer: BreakpointObserver, private uiState: UIStateService, private authService: AuthService, private swUpdate: SwUpdateService) {

  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
      this.uiState.isSmallScreen = res.matches;
    });

    this.authService.verifyUser().subscribe();
    this.swUpdate.checkForUpdate();
  }
}
