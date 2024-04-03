import { Prisma, PrismaClient, users } from '@prisma/client'; // Importing Prisma client, PrismaClient, and users model from the Prisma client library.
import { User } from '@domain/interfaces/Users/interface'; // Importing the User interface from the domain layer.
import { IUsersRepository } from '@domain/repositories/UsersRepository'; // Importing the interface for the UsersRepository from the domain layer.

const prisma = new PrismaClient(); // Creating a new instance of PrismaClient.

export class UsersRepositoryImpl implements IUsersRepository {
  async getAll(): Promise<User[]> {
    return prisma.users.findMany({
      // Asynchronously fetching all users with selected fields and ordered by name.
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getById(userId: number): Promise<User | null> {
    return prisma.users.findUnique({
      // Asynchronously fetching a user by its ID with selected fields.
      select: {
        id: true,
        name: true,
      },
      where: { id: userId },
    });
  }

  async create(user: Prisma.usersCreateManyInput): Promise<users> {
    return prisma.users.create({ data: user }); // Asynchronously creating a new user.
  }
}
