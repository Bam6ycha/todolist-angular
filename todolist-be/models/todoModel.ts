import { Request } from 'express';
import mongoose from 'mongoose';

import { Model } from '../schemas/todoSchema';
import { ToDoInterface } from '../types/interfaces/interfaces';
import { getSkipLimit } from '../utilities/utilities';

export const all = async () =>
  Model.find<ToDoInterface>({
    lastModified: null,
  })
    .select('message isCompleted _id')
    .cursor();

export const pagination = (page: string, limit: string) => {
  return Model.find<ToDoInterface>({ lastModified: null })
    .skip(getSkipLimit(page, limit))
    .limit(Number(limit))
    .select('message isCompleted _id')
    .cursor();
};

export const useId = (
  id: string | mongoose.Types.ObjectId,
): Promise<ToDoInterface> =>
  Model.findById({ _id: id }).select('message isCompleted _id').exec();

export const addTodo = (request: Request): Promise<ToDoInterface> => {
  const { _id: id, isCompleted, message }: ToDoInterface = request.body;

  const todo: ToDoInterface = new Model({
    _id: id || new mongoose.Types.ObjectId(),
    isCompleted,
    message,
    lastModified: null,
  });

  return Model.create<ToDoInterface>(todo);
};

export const deleteTodo = async (request: Request): Promise<{}> => {
  const id = request.params.todoId;

  await Model.updateOne(
    { _id: id },
    {
      $set: {
        lastModified: Date.now(),
      },
    },
  ).exec();
  return {};
};

export const changeToDo = (request: Request) => {
  const id = request.params.todoId;

  return Model.updateOne<ToDoInterface>(
    { _id: id },
    { $set: request.body },
  ).exec();
};
