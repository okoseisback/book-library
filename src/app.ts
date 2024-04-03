import express from 'express'; // Importing the Express framework.
import cors from 'cors'; // Importing the Cors.
import swaggerUi from 'swagger-ui-express'; // Importing the Swagger UI Express extension.
import swaggerFile from '../swagger-output.json'; // Importing the Swagger file.

import { userRouter } from '@application/controllers/UsersController'; // Importing userRouter from UsersController.
import { bookRouter } from '@application/controllers/BooksController'; // Importing bookRouter from BooksController.

const app = express(); // Creating an instance of the Express framework.

app.use(express.json()); // Middleware to parse JSON requests.

// Serving Swagger documentation interface.
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Enable CORS for localhost:3000 only
app.use(cors({
    origin: 'http://localhost:3000',
}));

// User routes
app.use('/users', userRouter); // Mounting userRouter to handle requests starting with '/users'.

// Book routes
app.use('/books', bookRouter); // Mounting bookRouter to handle requests starting with '/books'.

export default app; // Exporting the Express app instance.
