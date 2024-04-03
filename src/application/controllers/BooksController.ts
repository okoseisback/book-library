import express, { Request, Response, NextFunction } from 'express';
import { handleError } from '@domain/middleware';
import { z } from 'zod';

import { BooksService } from '@application/services/BooksService';
import { BooksRepositoryImpl } from '@infrastructure/persistence/BookRepositoryImpl';
import { RESP_ERROR_MESSAGES, RESP_SUCCESS_MESSAGES, STATUS_CODES } from '@domain/constants';

// Zod schema for path parameter validation
const bookIdSchema = z.string().transform(bookId => parseInt(bookId));

// Zod schema for request body validation
const bookSchema = z.object({
  name: z.string().min(1),
});

export const bookRouter = express.Router();

// Endpoint to fetch all books
bookRouter.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const booksService = new BooksService(new BooksRepositoryImpl());
    const books = await booksService.getAll();
    return res.json(books);
  } catch (error) {
    handleError(res, next, error);
  }
});

// Endpoint to fetch a specific book by its ID
bookRouter.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate path parameter
    const bookId = bookIdSchema.parse(req.params.bookId);

    const booksService = new BooksService(new BooksRepositoryImpl());
    const book = await booksService.getById(bookId);
    if (!book) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: RESP_ERROR_MESSAGES.BOOK_NOT_FOUND });
    }

    const roundedScore =
      book.score !== undefined ? (book.score !== -1 ? book.score.toFixed(2) : -1) : -1;

    return res.json({
      ...book,
      score: roundedScore,
    });
  } catch (error) {
    handleError(res, next, error);
  }
});

// Endpoint to create a new book
bookRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const { name } = bookSchema.parse(req.body);

    const bookService = new BooksService(new BooksRepositoryImpl());
    await bookService.create({ name });
    return res.status(STATUS_CODES.CREATED).json({ message: RESP_SUCCESS_MESSAGES.BOOK_CREATED });
  } catch (error) {
    handleError(res, next, error);
  }
});
