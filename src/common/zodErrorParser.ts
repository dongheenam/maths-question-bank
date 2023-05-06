import { ZodError } from 'zod';

const zodErrorParser = <T extends any>(error: Error | ZodError<T>) => {
  if (error instanceof ZodError) {
    const errorMessage = error.flatten().formErrors.join(' / ');
    return errorMessage;
  } else {
    return error.message;
  }
};
export default zodErrorParser;
