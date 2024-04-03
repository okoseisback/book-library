import { Response, NextFunction } from 'express';
import { z } from 'zod';

// Middleware to handle Zod validation errors
export function handleError(res: Response, next: NextFunction, err: any, ) {
  if (err instanceof z.ZodError) {
    // Zod validation error occurred
    const errorMessages = err.errors.map((error: any) => ({
      code: error.code,
      message: error.message,
      path: error.path.join('.'),
    }));

    // Send a 400 Bad Request response with validation error details
    return res.status(400).json({ error: 'Validation failed', details: errorMessages });
  }
  
  // Pass the error to the next middleware if it's not a Zod error
  next(err);
}
