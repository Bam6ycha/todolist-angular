import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './utilities/utilities';

import { connect } from './db';
import * as todoController from './controllers/todoController';

const app = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: string = process.env.PORT || '3000';

app.get('/todos', todoController.all);
app.get('/todos/?', todoController.pagination);
app.get('/todos/:todoId', todoController.useId);

app.post('/todos', todoController.addTodo);

const startServer = async () => {
  await connect();

  app.listen(port, (): void => {
    console.log(`Server is running on port : ${port}`);
  });
};
startServer();
