import { Prisma, PrismaClient, books } from '@prisma/client'; // Importing Prisma client, PrismaClient, and books model from the Prisma client library.
import { IBooksRepository } from '@domain/repositories/BooksRepository'; // Importing the interface for the BooksRepository from the domain layer.
import { Book } from '@domain/interfaces/Books/interface';

const prisma = new PrismaClient(); // Creating a new instance of PrismaClient.

export class BooksRepositoryImpl implements IBooksRepository {
  async getAll(): Promise<Book[]> {
    return prisma.books.findMany({
      // Asynchronously fetching all books with selected fields and ordered by name.
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getById(bookId: number): Promise<Book | null> {
    return prisma.books.findUnique({
      // Asynchronously fetching a book by its ID with selected fields.
      select: {
        id: true,
        name: true,
        score: true,
      },
      where: { id: bookId },
    });
  }

  async create(book: Prisma.booksCreateManyInput): Promise<books> {
    return prisma.books.create({ data: book }); // Asynchronously creating a new book.
  }

  async updateScore(bookId: number, score: number): Promise<books> {
    return prisma.books.update({
      // Asynchronously updating the score of a book.
      where: {
        id: bookId,
      },
      data: {
        score,
      },
    });
  }
}
