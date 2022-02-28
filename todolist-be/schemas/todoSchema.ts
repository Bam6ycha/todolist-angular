import mongoose from 'mongoose';
import { ToDoInterface } from '../types/interfaces/interfaces';

const toDoSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  message: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  lastModified: { type: String },
}).set('toJSON', {
  transform: (
    _doc: ToDoInterface,
    ret: { [key: string]: string },
    _options = null,
  ) => {
    ret['id'] = ret['_id'];
    delete ret['_id'];
  },
});

export const Model = mongoose.model('todo', toDoSchema);
