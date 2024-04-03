import { Prisma, users } from '@prisma/client'; // Importing Prisma client and users model from the Prisma client library.

import { IUsersRepository } from '@domain/repositories/UsersRepository'; // Importing the interface for the UsersRepository from the domain layer.
import { User } from '@domain/interfaces/Users/interface'; // Importing the User interface from the domain layer.

export class UsersService {
  private userRepository: IUsersRepository; // Declaring a private member variable for the UsersRepository interface.

  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository; // Initializing the userRepository member variable with the provided UsersRepository instance.
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll(); // Asynchronously fetching all users using the injected userRepository.
  }

  async getById(userId: number): Promise<User | null> {
    return this.userRepository.getById(userId); // Asynchronously fetching a user by their ID using the injected userRepository.
  }

  async createUser(user: Prisma.usersCreateManyInput): Promise<users> {
    return this.userRepository.create(user); // Asynchronously creating a new user using the injected userRepository.
  }
}
