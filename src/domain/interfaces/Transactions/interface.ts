export interface Transaction {
  id?: number;
  userId?: number;
  bookId?: number;
  userScore?: number; // Optional score/rating given by the user for the transaction.
  book?: {
    name?: string; // Optional name/title of the book associated with the transaction.
  };
}
