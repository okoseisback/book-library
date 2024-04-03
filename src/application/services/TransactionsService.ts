import { Prisma, transactions } from '@prisma/client'; // Importing Prisma client and transactions model from the Prisma client library.

import { ITransactionsRepository } from '@domain/repositories/TransactionsRepository'; // Importing the interface for the TransactionsRepository from the domain layer.
import { Transaction } from '@domain/interfaces/Transactions/interface'; // Importing the Transaction interface from the domain layer.

export class TransactionsService {
  private transactionRepository: ITransactionsRepository; // Declaring a private member variable for the TransactionsRepository interface.

  constructor(transactionRepository: ITransactionsRepository) {
    this.transactionRepository = transactionRepository; // Initializing the transactionRepository member variable with the provided TransactionsRepository instance.
  }

  async findScoresForBookId(id: number): Promise<Transaction[]> {
    return this.transactionRepository.findScoresForBookId(id); // Asynchronously fetching scores for a book by its ID using the injected transactionRepository.
  }

  async isBorrowed(userId: number | null, bookId: number): Promise<transactions | null> {
    return this.transactionRepository.isBorrowed(userId, bookId); // Asynchronously checking if a book is borrowed by a user using the injected transactionRepository.
  }

  async borrow(transaction: Prisma.transactionsCreateManyInput): Promise<transactions> {
    return this.transactionRepository.borrow(transaction); // Asynchronously borrowing a book using the injected transactionRepository.
  }

  async returned(id: number, score: number): Promise<transactions> {
    return this.transactionRepository.returned(id, score); // Asynchronously marking a transaction as returned and updating its score using the injected transactionRepository.
  }

  async pastByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.pastByUserId(userId); // Asynchronously fetching past transactions for a user using the injected transactionRepository.
  }

  async presentByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.presentByUserId(userId); // Asynchronously fetching present transactions for a user using the injected transactionRepository.
  }
}
