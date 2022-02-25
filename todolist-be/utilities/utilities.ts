import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

import { ResponseCodes } from '../types/enums/responseCodes';
import {
  CorsDefaultInterface,
  ToDoInterface,
} from '../types/interfaces/interfaces';

export const corsOptions: CorsDefaultInterface = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: ResponseCodes.NO_CONTENT,
};

export const getSkipLimit = (page: string, limit: string): number => {
  return +page === 1 ? 0 : +limit;
};

export const hasQuery = (request: Request): boolean => {
  const { page, limit } = request.query;

  if (page && limit) {
    return true;
  }

  return false;
};

export const writeResponseData = async (
  data: ToDoInterface[],
): Promise<void> => {
  const pathToFile = path.join(`./todolist-be`, `/data`, '/data.json');

  await fs.appendFile(pathToFile, JSON.stringify(data));
};

export const sendBodyAsStream = async (response: Response): Promise<void> => {
  const pathToFile = path.join(`./todolist-be`, `/data`, '/data.json');
  const readStream = (await fs.open(pathToFile, 'r')).createReadStream();

  readStream.pipe<Response<ToDoInterface[]>>(response.status(ResponseCodes.OK));

  readStream.on('end', () => {
    fs.rm(pathToFile);
  });
};
