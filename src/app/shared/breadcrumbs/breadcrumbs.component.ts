import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryStateService } from 'src/app/core/service/state';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  categories$: Observable<string[]> = of([]);

  constructor(private categoryState: CategoryStateService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryState.category$
  }

}
