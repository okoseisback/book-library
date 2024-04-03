import { Prisma } from './.prisma/client';
import { UsersService } from '../src/application/services/UsersService';
import { IUsersRepository } from '../src/domain/repositories/UsersRepository';
import { User } from '../src/domain/interfaces/Users/interface';

describe('Users', () => {
  let usersService: UsersService;
  let mockRepository: IUsersRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
    };

    usersService = new UsersService(mockRepository);
  });

  describe('getAll', () => {
    it('should call getAll method of repository', async () => {
      await usersService.getAll();

      expect(mockRepository.getAll).toHaveBeenCalled();
    });

    it('should return users from repository', async () => {
      const expectedUsers: User[] = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ];
      (mockRepository.getAll as jest.Mock).mockResolvedValue(expectedUsers);

      const result = await usersService.getAll();

      expect(result).toEqual(expectedUsers);
    });
  });

  describe('getById', () => {
    it('should call getById method of repository with correct id', async () => {
      const userId = 1;
      await usersService.getById(userId);

      expect(mockRepository.getById).toHaveBeenCalledWith(userId);
    });

    it('should return user from repository', async () => {
      const userId = 1;
      const expectedUser: User = { id: userId, name: 'User 1' };
      (mockRepository.getById as jest.Mock).mockResolvedValue(expectedUser);

      const result = await usersService.getById(userId);

      expect(result).toEqual(expectedUser);
    });
  });

  describe('createUser', () => {
    it('should call create method of repository with correct data', async () => {
      const newUser: Prisma.usersCreateManyInput = { name: 'New User' };
      await usersService.createUser(newUser);

      expect(mockRepository.create).toHaveBeenCalledWith(newUser);
    });

    it('should return created user from repository', async () => {
      const newUser: Prisma.usersCreateManyInput = { name: 'New User' };
      const expectedUser: User = { id: 1, name: newUser.name };
      (mockRepository.create as jest.Mock).mockResolvedValue(expectedUser);

      const result = await usersService.createUser(newUser);

      expect(result).toEqual(expectedUser);
    });
  });
});
