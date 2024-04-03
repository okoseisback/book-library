import app from './app'; // Importing the Express app instance from app.js.
import { WELCOME_SIGNATURE } from '@domain/constants';

const port = process.env.PORT || 3000; // Setting the port number from environment variable or defaulting to 3000.

app.listen(port, () => WELCOME_SIGNATURE(port));



