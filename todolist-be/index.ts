import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './utilities/utilities';

import { connect } from './db';
import * as todoController from './controllers/todoController';
import { ResponseCodes } from './types/enums/responseCodes';

const app = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((_: Request, response: Response, next: NextFunction) => {
  response.header('Content-Type', 'application/json');
  next('route');
});

const port: string = process.env.PORT || '3000';

app.get('/todos', todoController.all);
app.get('/todos/?', todoController.pagination);
app.get('/todos/:todoId', todoController.useId);

app.post('/todos', todoController.addTodo);

app.delete('/todos/:todoId', todoController.deleteTodo);

app.patch('/todos/:todoId', todoController.updateTodo);

app.use((_, response, next) => {
  const error = new Error('Nothing was found');
  next(error);
});

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  res.status(ResponseCodes.NOT_FOUND).json({
    error: {
      message: `${err.message}`,
    },
  });
});

const startServer = async () => {
  await connect();

  app.listen(port, (): void => {
    console.log(`Server is running on port : ${port}`);
  });
};
startServer();
