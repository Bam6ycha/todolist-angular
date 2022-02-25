import * as TodoModel from '../models/todoModel';
import { ResponseCodes } from '../types/enums/responseCodes';
import { ExpressFn, ToDoInterface } from '../types/interfaces/interfaces';
import {
  hasQuery,
  sendBodyAsStream,
  writeResponseData,
} from '../utilities/utilities';

export const all: ExpressFn = async (
  request,
  response,
  next,
): Promise<void> => {
  try {
    if (hasQuery(request)) {
      next('route');
      return;
    }

    const todos = await TodoModel.all();

    await writeResponseData(todos);
    await sendBodyAsStream(response);
  } catch (error) {
    console.log(error);
  }
};

export const pagination: ExpressFn = async (request, response, _) => {
  try {
    const { page, limit } = request.query as { [key: string]: string };

    const todos: ToDoInterface[] = await TodoModel.pagination(page, limit);

    await writeResponseData(todos);
    await sendBodyAsStream(response);
  } catch (error) {
    console.log(error);

    response.status(ResponseCodes.NO_CONTENT).json({
      message: 'No content',
    });
  }
};

export const useId: ExpressFn = async (request, response, _) => {
  try {
    const id = request.params.todoId;

    const todo: ToDoInterface = await TodoModel.useId(id);

    if (todo.lastModified) {
      response.status(ResponseCodes.NO_CONTENT).json({
        error: 'Nothing was found',
      });
    } else {
      response.status(ResponseCodes.OK).json(todo);
    }
  } catch (error) {
    console.log(error);

    response.status(ResponseCodes.NOT_FOUND).json({
      error: 'Nothing was found according to this ID',
    });
  }
};

export const addTodo: ExpressFn = async (request, response, _) => {
  try {
    const { isCompleted, _id, message } = await TodoModel.addTodo(request);

    response.status(ResponseCodes.CREATED).json({ _id, message, isCompleted });
  } catch (error) {
    console.log(error);

    response.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

export const deleteTodo: ExpressFn = async (request, response, _) => {
  try {
    const result = await TodoModel.deleteTodo(request);

    response.status(ResponseCodes.OK).json(result);
  } catch (error) {
    console.log(error);

    response.status(ResponseCodes.NOT_FOUND).json({
      error: 'Nothing was found',
    });
  }
};

export const updateTodo: ExpressFn = async (request, response, _) => {
  try {
    await TodoModel.changeToDo(request);

    response.status(200).json({
      message: 'Todo was successfully updated',
    });
  } catch (error) {
    console.log(error);

    response.status(ResponseCodes.NOT_FOUND).json({
      error: 'No content found',
    });
  }
};
