import { Request } from 'express';
import { ResponseCodes } from '../types/enums/responseCodes';
import { CorsDefaultInterface } from '../types/interfaces/interfaces';

export const corsOptions: CorsDefaultInterface = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: ResponseCodes.NO_CONTENT,
};

export const getSkipLimit = (page: string, limit: string): number => {
  return +page === 1 ? 0 : +limit;
};

export const hasQuery = (request: Request) => {
  const { page, query } = request.query;
  if (page && query) {
    return true;
  }

  return false;
};
