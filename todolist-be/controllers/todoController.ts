import * as TodoModel from '../models/todoModel';
import { ResponseCodes } from '../types/enums/responseCodes';
import { ExpressFn, ToDoInterface } from '../types/interfaces/interfaces';
import { hasQuery } from '../utilities/utilities';

export const all: ExpressFn = async (
  request,
  response,
  next,
): Promise<void> => {
  try {
    if (!hasQuery(request)) {
      next();
      return;
    }
    const todos = await TodoModel.all();
    response.status(ResponseCodes.OK).json(todos);
  } catch (error) {
    next(error);
  }
};

export const pagination: ExpressFn = async (request, response, next) => {
  try {
    const { page, limit } = request.query as { [key: string]: string };

    const todos: ToDoInterface[] = await TodoModel.pagination(page, limit);
    response.status(200).json(todos);
  } catch (error) {
    next(error);
    response.status(ResponseCodes.NO_CONTENT).json({
      message: 'No content',
    });
  }
};

export const useId: ExpressFn = async (request, response, next) => {
  try {
    const id = request.params.todoId;
    const todo: ToDoInterface = await TodoModel.useId(id);
    if (todo.lastModified) {
      response.status(ResponseCodes.NOT_FOUND).json({
        error: 'Nothing was found',
      });
    } else {
      response.status(ResponseCodes.OK).json(todo);
    }
  } catch (error) {
    next(error);
  }
};

export const addTodo: ExpressFn = async (request, response, next) => {
  try {
    const todo = await TodoModel.addTodo(request);
    response.status(ResponseCodes.CREATED).json(todo);
  } catch (error) {
    next(error);
    response.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};
