export const STATUS_CODES = {
  SUCCESS: 200, // HTTP status code for successful operation.
  CREATED: 201, // HTTP status code for successful resource creation.
  NOT_FOUND: 404, // HTTP status code for resource not found.
  SERVER_ERROR: 500, // HTTP status code for server error.
};

export const RESP_ERROR_MESSAGES = {
  SERVER_ERROR: 'Internal Server Error', // Error message for internal server error.
  BOOK_NOT_FOUND: 'Book not found!', // Error message for book not found.
  USER_NOT_FOUND: 'User not found!', // Error message for user not found.
  BOOK_NOT_RETURNED_STATUS: 'This book is not in a returned status!', // Error message for book not in returned status.
  BOOK_NOT_BORROWING_STATUS: 'This book is not in a borrowing status!', // Error message for book not in borrowing status.
  AN_UNEXPECTED_PROBLEM_FOR_BOOK_RETURN: 'An unexpected problem occurred during the return!', // Error message for unexpected problem during book return.
  AN_UNEXPECTED_PROBLEM_FOR_BOOK_SCORE_UPDATE:
    'An unexpected problem occurred during the score update!', // Error message for unexpected problem during score update.
};

export const RESP_SUCCESS_MESSAGES = {
  BOOK_CREATED: 'Book created successfully!', // Success message for book creation.
  USER_CREATED: 'User created successfully!', // Success message for user creation.
};

export const WELCOME_SIGNATURE = (PORT: string | number) => {
  // Starting the server and listening on the specified port.
  console.log(`
    _                 _         _ _ _                          
   | |__   ___   ___ | | __    | (_) |__  _ __ __ _ _ __ _   _ 
   | '_ \\ / _ \\ / _ \\| |/ /____| | | '_ \\| '__/ _\` | '__| | | |
   | |_) | (_) | (_) |   <_____| | | |_) | | | (_| | |  | |_| |
   |_.__/ \\___/ \\___/|_|\\_\\    |_|_|_.__/|_|  \\__,_|_|   \\__, |
                                                         |___/ 
  
   Powered by OKTAY KÖSE(okoseisback@gmail.com)          v1.0.0
  `);
  console.log('-------------------------------------------------------------------')
  console.log(`🍷 Server is running on http://localhost:${PORT}`); // Logging a message indicating that the server is running.
}