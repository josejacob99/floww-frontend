import { Component, OnInit } from '@angular/core';
import { TransactionTypes } from '../category-tree/category-tree.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  type = TransactionTypes;
  constructor() { }

  ngOnInit(): void {
  }

}
