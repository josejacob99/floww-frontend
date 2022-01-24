import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input()
  progress = 0;

  get percentageMargin(): string {
    if(this.progress < 10) {
      return '-13px';
    }

    return '-15px'
  }
}
