import { TransactionsService } from '../src/application/services/TransactionsService';
import { ITransactionsRepository } from '../src/domain/repositories/TransactionsRepository';
import { Transaction } from '../src/domain/interfaces/Transactions/interface';

describe('Transactions', () => {
  let transactionsService: TransactionsService;
  let mockRepository: ITransactionsRepository;

  beforeEach(() => {
    mockRepository = {
      findScoresForBookId: jest.fn(),
      isBorrowed: jest.fn(),
      borrow: jest.fn(),
      returned: jest.fn(),
      pastByUserId: jest.fn(),
      presentByUserId: jest.fn(),
    };

    transactionsService = new TransactionsService(mockRepository);
  });

  describe('findScoresForBookId', () => {
    it('should call findScoresForBookId method of repository with correct id', async () => {
      const bookId = 1;
      await transactionsService.findScoresForBookId(bookId);

      expect(mockRepository.findScoresForBookId).toHaveBeenCalledWith(bookId);
    });

    it('should return transactions for the book from repository', async () => {
      const bookId = 1;
      const expectedTransactions: Transaction[] = [{ id: 1, bookId, userScore: 5 }];
      (mockRepository.findScoresForBookId as jest.Mock).mockResolvedValue(expectedTransactions);

      const result = await transactionsService.findScoresForBookId(bookId);

      expect(result).toEqual(expectedTransactions);
    });
  });

  describe('isBorrowed', () => {
    it('should call isBorrowed method of repository with correct userId and bookId', async () => {
      const userId = 1;
      const bookId = 1;
      await transactionsService.isBorrowed(userId, bookId);

      expect(mockRepository.isBorrowed).toHaveBeenCalledWith(userId, bookId);
    });

    it('should return transaction if book is borrowed from repository', async () => {
      const userId = 1;
      const bookId = 1;
      const expectedTransaction: Transaction = {
        id: 1,
        userId,
        bookId,
        userScore: 5,
      };
      (mockRepository.isBorrowed as jest.Mock).mockResolvedValue(expectedTransaction);

      const result = await transactionsService.isBorrowed(userId, bookId);

      expect(result).toEqual(expectedTransaction);
    });

    it('should return null if book is not borrowed from repository', async () => {
      const userId = 1;
      const bookId = 1;
      (mockRepository.isBorrowed as jest.Mock).mockResolvedValue(null);

      const result = await transactionsService.isBorrowed(userId, bookId);

      expect(result).toBeNull();
    });
  });
});
