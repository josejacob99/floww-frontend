import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  @Input()
  text = ''

  @Input()
  iconRight = '';

  showPopover = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showPopover = false;
    }
  }

  constructor(private eRef: ElementRef) { }

  togglePopOver() {
    this.showPopover = !this.showPopover;
  }

  hide() {
    this.showPopover = false;
  }

  handleClickOnPopover() {
      this.showPopover = false;
  }
}
