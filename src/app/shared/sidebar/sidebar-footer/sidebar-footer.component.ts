import { Component, OnInit } from '@angular/core';
declare function require(moduleName: string): any;
@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss']
})
export class SidebarFooterComponent implements OnInit {
  public version: string = `v${require('../../../../../package.json').version}`;
  constructor() { }

  ngOnInit(): void {
  }

}
