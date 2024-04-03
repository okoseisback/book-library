import { BooksService } from '../src/application/services/BooksService';
import { IBooksRepository } from '../src/domain/repositories/BooksRepository';
import { Book } from '../src/domain/interfaces/Books/interface';

describe('Books', () => {
  let booksService: BooksService;
  let mockRepository: IBooksRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      updateScore: jest.fn(),
    };

    booksService = new BooksService(mockRepository);
  });

  describe('getAll', () => {
    it('should call getAll method of repository', async () => {
      await booksService.getAll();

      expect(mockRepository.getAll).toHaveBeenCalled();
    });

    it('should return books from repository', async () => {
      const expectedBooks: Book[] = [
        { id: 1, name: 'Book 1' },
        { id: 2, name: 'Book 2' },
      ];
      (mockRepository.getAll as jest.Mock).mockResolvedValue(expectedBooks);

      const result = await booksService.getAll();

      expect(result).toEqual(expectedBooks);
    });
  });

  describe('getById', () => {
    it('should call getById method of repository', async () => {
      const bookId = 1;
      await booksService.getById(bookId);

      expect(mockRepository.getById).toHaveBeenCalledWith(bookId);
    });

    it('should return book from repository', async () => {
      const bookId = 1;
      const expectedBook: Book = { id: bookId, name: 'Book 1' };
      (mockRepository.getById as jest.Mock).mockResolvedValue(expectedBook);

      const result = await booksService.getById(bookId);

      expect(result).toEqual(expectedBook);
    });
  });

  describe('create', () => {
    it('should call create method of repository with correct data', async () => {
      const newBookData = { name: 'New Book' };
      await booksService.create(newBookData);

      expect(mockRepository.create).toHaveBeenCalledWith(newBookData);
    });

    it('should return created book from repository', async () => {
      const newBookData = { name: 'New Book' };
      const expectedBook: Book = { id: 1, ...newBookData };
      (mockRepository.create as jest.Mock).mockResolvedValue(expectedBook);

      const result = await booksService.create(newBookData);

      expect(result).toEqual(expectedBook);
    });
  });

  describe('updateScore', () => {
    it('should call updateScore method of repository with correct arguments', async () => {
      const bookId = 1;
      const newScore = 5;
      await booksService.updateScore(bookId, newScore);

      expect(mockRepository.updateScore).toHaveBeenCalledWith(bookId, newScore);
    });

    it('should return updated book from repository', async () => {
      const bookId = 1;
      const newScore = 5;
      const expectedBook: Book = { id: bookId, name: 'Book 1', score: newScore };
      (mockRepository.updateScore as jest.Mock).mockResolvedValue(expectedBook);

      const result = await booksService.updateScore(bookId, newScore);

      expect(result).toEqual(expectedBook);
    });
  });
});
