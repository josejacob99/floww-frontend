import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input()
  noPadding = false;

  @Input()
  shadow = 0;

  @Input()
  borderRadius = 0;

  @Input()
  hoverEffect = false;


}
