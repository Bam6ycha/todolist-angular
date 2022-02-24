import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Model } from '../schemas/users';
import { ToDoInterface } from '../types/interfaces/interfaces';
import { getSkipLimit } from '../utilities/utilities';

export const all = (): Promise<ToDoInterface[]> =>
  Model.find<ToDoInterface>({
    lastModified: null,
  }).exec();

export const pagination = (
  page: string,
  limit: string,
): Promise<ToDoInterface[]> =>
  Model.find<ToDoInterface>({ lastModified: null })
    .skip(getSkipLimit(page, limit))
    .limit(Number(limit))
    .exec();

export const useId = (
  id: string | mongoose.Types.ObjectId,
): Promise<ToDoInterface> => Model.findById({ _id: id }).exec();

export const addTodo = (request: Request): Promise<ToDoInterface> => {
  const { id, isCompleted, message }: ToDoInterface = request.body;
  const todo: ToDoInterface = new Model({
    _id: id || new mongoose.Types.ObjectId(),
    isCompleted,
    message,
    lastModified: null,
  });
  return Model.create(todo);
};
