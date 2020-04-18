import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import routes from './routes';

config();

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  public database(): void {
    mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public middlewares(): void {
    this.app.use(express.json());
  }

  public routes(): void {
    this.app.use(routes);
  }
}

export default new App().app;
