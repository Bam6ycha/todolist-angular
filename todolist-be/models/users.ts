import mongoose from 'mongoose';
import { getDb } from '../db';

const database = getDb() as mongoose.Mongoose;

const toDoSchema = new database.Schema({
  _id: database.Types.ObjectId,
  message: String,
  isCompleted: Boolean,
});

export const Model = () => database.model('ToDo', toDoSchema);
