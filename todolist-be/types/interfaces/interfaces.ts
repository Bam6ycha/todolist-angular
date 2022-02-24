import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export interface CorsDefaultInterface {
  origin: string;
  methods: string;
  preflightContinue: boolean;
  optionsSuccessStatus: number;
}

export interface StateInterface {
  db: null | mongoose.Mongoose;
}

export interface ToDoInterface {
  id: string | mongoose.Types.ObjectId;
  message: string;
  isCompleted: boolean;
  lastModified?: string | null;
}

export type ExpressFn = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;
