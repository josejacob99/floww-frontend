export interface ICategories {
  expense: ICategory;
  income: ICategory;
}

export interface ICategory {
  name: string;
  path: string[];
  expanded: boolean;
  icon?: string;
  children: ICategory[];
}
