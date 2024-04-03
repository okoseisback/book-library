import { Prisma, users } from '@prisma/client'; // Importing Prisma client and users model from the Prisma client library.
import { User } from '@domain/interfaces/Users/interface'; // Importing the User interface from the domain layer.

export interface IUsersRepository {
  getAll(): Promise<User[]>; // Method to retrieve all users.
  getById(userId: number): Promise<User | null>; // Method to retrieve a user by ID.
  create(user: Prisma.usersCreateManyInput): Promise<users>; // Method to create a new user.
}
