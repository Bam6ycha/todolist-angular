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
  _id: string | mongoose.Types.ObjectId;
  message: string;
  isCompleted: boolean;
}
