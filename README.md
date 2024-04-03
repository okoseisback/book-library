# Book Library

This project is a book library powered by **OKTAY KÖSE** (okoseisback@gmail.com). It provides functionalities to manage books using an Express.js server.

## Installation

To get started with the Book Library, follow these steps:

1. Clone the repository.
2. Install dependencies using npm:

```bash
npm install
```

3. Copy the example environment file:
Edit the `DATABASE_URL` address as appropriate.

```bash
npm run env:copy
```

## Usage

Once the server is up and running, you can interact with the Book Library API using various endpoints.

## Development

For development purposes, you can use the following npm scripts:
** The `npm run` command must be in front before running the commands. Ex: `npm run dev`

- **dev**: Run the server in development mode with hot reloading.
- **clean**: Clean the distribution folder.
- **lint**: Lint the TypeScript files.
- **lint:fix**: Fix linting issues automatically.
- **test**: Run tests using Jest.
- **test:cov**: Run tests with coverage report.
- **test:watch**: Run tests in watch mode.
- **prisma:gen**: Generate Prisma client.
- **prisma:db:migrate:reset**: Reset database migrations.
- **prisma:db:seed**: Seed the database with initial data.
- **swagger-gen**: Generate Swagger documentation.

## Quick Start for Development

```bash
npm run prisma:gen
```

```bash
npm run prisma:db:migrate:reset
```

```bash
npm run prisma:db:seed
```

```bash
npm run dev
```

## Production

1. Build the project:

```bash
npm run build
```

2. Start the server:

```bash
npm start
```

## API Documentation

When the application is started with `npm run dev` or `npm run start`, you can access the API documents with {domain}/doc. For example: http://localhost:3000/doc.

## Technologies Used

- **PostgreSQL**: Powerful relational database management system.
- **Express.js**: Web framework for Node.js.
- **Prisma**: ORM for TypeScript and Node.js.
- **Swagger UI Express**: Middleware to serve auto-generated Swagger UI.
- **Zod**: TypeScript-first schema declaration and validation library.
- And more.

## License

This project is licensed under the ISC License.