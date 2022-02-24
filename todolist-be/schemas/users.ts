import mongoose from 'mongoose';

const toDoSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  message: String,
  isCompleted: Boolean,
  lastModified: String,
});

export const Model = mongoose.model('todo', toDoSchema);
