import express from 'express';

import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './utilities/utilities';
import { connect } from './db';

const app = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: string = process.env.PORT || '3000';

app.get('/todos/', (_, response) => {
  response.send('Hello API');
});

const startServer = async () => {
  await connect();

  app.listen(port, (): void => {
    console.log(`Server is running on port : ${port}`);
  });
};
startServer();
