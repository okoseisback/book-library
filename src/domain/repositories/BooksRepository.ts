import { Prisma, books } from '@prisma/client'; // Importing Prisma client and books model from the Prisma client library.
import { Book } from '@domain/interfaces/Books/interface'; // Importing the Book interface from the domain layer.

export interface IBooksRepository {
  getAll(): books[] | Promise<Book[]>; // Method to retrieve all books.
  getById(bookId: number): Promise<Book | null>; // Method to retrieve a book by ID.
  create(book: Prisma.booksCreateManyInput): Promise<books>; // Method to create a new book.
  updateScore(bookId: number, score: number): Promise<books>; // Method to update the score of a book.
}
