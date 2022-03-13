export enum TransactionTypes {
  Income = 'income',
  Expenses = 'expense',
  Debt = 'debt',
  Lend = 'lend',
}

export interface ITransaction {
  id?: string;
  user: string;
  date: Date | string;
  category: string;
  remarks: string;
  amount: string;
  type: TransactionTypes;
  tags: string[];
}
