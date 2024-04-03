import express, { Request, Response, NextFunction } from 'express';
import { handleError } from '@domain/middleware';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { UsersService } from '@application/services/UsersService';
import { UsersRepositoryImpl } from '@infrastructure/persistence/UserRepositoryImpl';
import { BooksService } from '@application/services/BooksService';
import { BooksRepositoryImpl } from '@infrastructure/persistence/BookRepositoryImpl';
import { TransactionsService } from '@application/services/TransactionsService';
import { TransactionRepositoryImpl } from '@infrastructure/persistence/TransactionRepositoryImpl';
import { RESP_ERROR_MESSAGES, RESP_SUCCESS_MESSAGES, STATUS_CODES } from '@domain/constants';


export const userRouter = express.Router();

// Zod schema for path parameter validation
const userIdSchema = z.string().transform(userId => parseInt(userId));
const scoreSchema = z.number().min(0).max(10);

// Endpoint to fetch all users
userRouter.get('/', async (_, res: Response, next: NextFunction) => {
  try {
    const userService = new UsersService(new UsersRepositoryImpl());
    const users = await userService.getAll();
    return res.json(users);
  } catch (error) {
    handleError(res, next, error);
  }
});

// Endpoint to fetch a specific user by its ID
userRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = userIdSchema.parse(req.params.userId) as number;
    const userService = new UsersService(new UsersRepositoryImpl());
    const user = await userService.getById(userId);

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: RESP_ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const transactionService = new TransactionsService(new TransactionRepositoryImpl());
    const pastBooks = await transactionService.pastByUserId(user.id);
    const presentBooks = await transactionService.presentByUserId(user.id);

    const pastBooksMap = pastBooks.map(transaction => ({
      name: transaction?.book?.name,
      userScore: transaction.userScore,
    }));

    const presentBookMap = presentBooks.map(transaction => ({
      name: transaction?.book?.name,
    }));

    return res.json({
      ...user,
      books: {
        past: pastBooksMap,
        present: presentBookMap,
      },
    });
  } catch (error) {
    handleError(res, next, error);
  }
});

// Endpoint to create a new user
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = z
      .object({
        name: z.string().min(1),
      })
      .parse(req.body);

    const userService = new UsersService(new UsersRepositoryImpl());
    await userService.createUser({ name });
    return res.status(STATUS_CODES.CREATED).json({ message: RESP_SUCCESS_MESSAGES.USER_CREATED });
  } catch (error) {
    handleError(res, next, error);
  }
});

// Endpoint to borrow a book
userRouter.post(
  '/:userId/borrow/:bookId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, bookId } = z
        .object({
          userId: z.string().transform(userId => parseInt(userId)),
          bookId: z.string().transform(bookId => parseInt(bookId)),
        })
        .parse(req.params);

      const userService = new UsersService(new UsersRepositoryImpl());
      const user = await userService.getById(userId);
      if (!user) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: RESP_ERROR_MESSAGES.USER_NOT_FOUND });
      }

      const bookService = new BooksService(new BooksRepositoryImpl());
      const book = await bookService.getById(bookId);
      if (!book) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: RESP_ERROR_MESSAGES.BOOK_NOT_FOUND });
      }

      const transactionService = new TransactionsService(new TransactionRepositoryImpl());
      const isBookBorrowed = await transactionService.isBorrowed(null, bookId);
      if (isBookBorrowed) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: RESP_ERROR_MESSAGES.BOOK_NOT_BORROWING_STATUS });
      }

      const borrowData: Prisma.transactionsCreateManyInput = {
        userId,
        bookId,
      };

      const createBorrow = await transactionService.borrow(borrowData);
      return res.status(STATUS_CODES.CREATED).json(createBorrow);
    } catch (error) {
      handleError(res, next, error);
    }
  },
);

// Endpoint to return a borrowed book
userRouter.post(
  '/:userId/return/:bookId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, bookId } = z
        .object({
          userId: z.string().transform(userId => parseInt(userId)),
          bookId: z.string().transform(bookId => parseInt(bookId)),
        })
        .parse(req.params);

      const { score } = z
        .object({
          score: scoreSchema,
        })
        .parse(req.body);

      const userService = new UsersService(new UsersRepositoryImpl());
      const user = await userService.getById(userId);
      if (!user) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: RESP_ERROR_MESSAGES.USER_NOT_FOUND });
      }

      const bookService = new BooksService(new BooksRepositoryImpl());
      const book = await bookService.getById(bookId);
      if (!book) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: RESP_ERROR_MESSAGES.BOOK_NOT_FOUND });
      }

      const transactionService = new TransactionsService(new TransactionRepositoryImpl());
      const isBookBorrowed = await transactionService.isBorrowed(userId, bookId);
      if (!isBookBorrowed) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: RESP_ERROR_MESSAGES.BOOK_NOT_RETURNED_STATUS });
      }

      const returned = await transactionService.returned(isBookBorrowed.id, score);
      if (!returned) {
        return res
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ error: RESP_ERROR_MESSAGES.AN_UNEXPECTED_PROBLEM_FOR_BOOK_RETURN });
      }

      const allScoreForBook = await transactionService.findScoresForBookId(bookId);
      const totalScore = allScoreForBook.reduce((acc, curr) => {
        if (curr.userScore !== undefined) {
          return acc + curr.userScore;
        }
        return acc;
      }, 0);
      const avgScore = totalScore / allScoreForBook.length;

      const updateScore = await bookService.updateScore(bookId, avgScore);
      if (!updateScore) {
        return res
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ error: RESP_ERROR_MESSAGES.AN_UNEXPECTED_PROBLEM_FOR_BOOK_SCORE_UPDATE });
      }

      return res.status(STATUS_CODES.CREATED).json(updateScore);
    } catch (error) {
      handleError(res, next, error);
    }
  },
);
