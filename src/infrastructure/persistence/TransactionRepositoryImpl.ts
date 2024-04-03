import { Prisma, PrismaClient, transactions } from '@prisma/client'; // Importing Prisma client, PrismaClient, and transactions model from the Prisma client library.
import { ITransactionsRepository } from '@domain/repositories/TransactionsRepository'; // Importing the interface for the TransactionsRepository from the domain layer.
import { Transaction } from '@domain/interfaces/Transactions/interface'; // Importing the Transaction interface from the domain layer.

const prisma = new PrismaClient(); // Creating a new instance of PrismaClient.

export class TransactionRepositoryImpl implements ITransactionsRepository {
  async findScoresForBookId(bookId: number): Promise<Transaction[]> {
    return prisma.transactions.findMany({
      // Asynchronously fetching scores for a book by its ID.
      where: {
        bookId,
      },
      select: {
        userScore: true,
      },
    });
  }

  async pastByUserId(userId: number): Promise<Transaction[]> {
    return prisma.transactions.findMany({
      // Asynchronously fetching past transactions by user ID.
      select: {
        userScore: true,
        book: {
          select: {
            name: true,
          },
        },
      },
      where: {
        userId,
        returnedAt: {
          not: null,
        },
      },
    });
  }

  async presentByUserId(userId: number): Promise<Transaction[]> {
    return prisma.transactions.findMany({
      // Asynchronously fetching present transactions by user ID.
      select: {
        book: {
          select: {
            name: true,
          },
        },
      },
      where: {
        userId,
        returnedAt: null,
      },
    });
  }

  async borrow(transaction: Prisma.transactionsCreateManyInput): Promise<transactions> {
    return prisma.transactions.create({ data: transaction }); // Asynchronously creating a new transaction (borrowing).
  }

  async returned(transactionId: number, score: number): Promise<transactions> {
    const currentDate = new Date();

    const whereCondition: Prisma.transactionsWhereUniqueInput = {
      id: transactionId,
    };

    return prisma.transactions.update({
      // Asynchronously updating the transaction to mark it as returned and update score.
      where: whereCondition,
      data: {
        returnedAt: currentDate,
        userScore: score,
      },
    });
  }

  async isBorrowed(userId: number | null, bookId: number): Promise<transactions | null> {
    const whereCondition: Prisma.transactionsWhereInput = {
      bookId,
      returnedAt: null,
    };

    if (userId !== null) {
      whereCondition.userId = userId;
    }

    const borrow = await prisma.transactions.findFirst({
      // Asynchronously checking if a book is borrowed by a user.
      where: whereCondition,
    });

    return borrow;
  }
}
