import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '@config/upload';
import errorHandler from '@shared/infra/http/middlewares/errors';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());
app.use(errorHandler);

const port = process.env.PORT ?? 3333;

app.listen(port, () =>
  console.log(`🚀 Server started on http://localhost:${port}`),
);
