import { Prisma, transactions } from '@prisma/client'; // Importing Prisma client and transactions model from the Prisma client library.
import { Transaction } from '@domain/interfaces/Transactions/interface'; // Importing the Transaction interface from the domain layer.

export interface ITransactionsRepository {
  findScoresForBookId(bookId: number): Promise<Transaction[]>; // Method to find scores for a book by its ID.
  pastByUserId(userId: number): Promise<Transaction[]>; // Method to retrieve past transactions by user ID.
  presentByUserId(userId: number): Promise<Transaction[]>; // Method to retrieve present transactions by user ID.
  isBorrowed(userId: number | null, bookId: number): Promise<transactions | null>; // Method to check if a book is borrowed by a user.
  borrow(transaction: Prisma.transactionsCreateManyInput): Promise<transactions>; // Method to borrow a book.
  returned(bookId: number, score: number): Promise<transactions>; // Method to mark a transaction as returned with a score update.
}
