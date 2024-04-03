import { Prisma, books } from '@prisma/client'; // Importing Prisma client and books model from the Prisma client library.

import { IBooksRepository } from '@domain/repositories/BooksRepository'; // Importing the interface for the BooksRepository from the domain layer.
import { Book } from '@domain/interfaces/Books/interface'; // Importing the Book interface from the domain layer.

export class BooksService {
  private bookRepository: IBooksRepository; // Declaring a private member variable for the BooksRepository interface.

  constructor(bookRepository: IBooksRepository) {
    this.bookRepository = bookRepository; // Initializing the bookRepository member variable with the provided BooksRepository instance.
  }

  async getAll(): Promise<Book[]> {
    return this.bookRepository.getAll(); // Asynchronously fetching all books using the injected bookRepository.
  }

  async getById(bookId: number): Promise<Book | null> {
    return this.bookRepository.getById(bookId); // Asynchronously fetching a book by its ID using the injected bookRepository.
  }

  async create(data: Prisma.booksCreateManyInput): Promise<books> {
    return this.bookRepository.create(data); // Asynchronously creating a new book using the injected bookRepository.
  }

  async updateScore(bookId: number, score: number): Promise<books> {
    return this.bookRepository.updateScore(bookId, score); // Asynchronously updating the score of a book using the injected bookRepository.
  }
}
