/* eslint-disable class-methods-use-this */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  private getSumByTransactionValue(type: string): number {
    const sum = this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((prev, curr) => {
        return prev + curr.value;
      }, 0);

    return sum;
  }

  public getBalance(): Balance {
    const income = this.getSumByTransactionValue('income');
    const outcome = this.getSumByTransactionValue('outcome');
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
