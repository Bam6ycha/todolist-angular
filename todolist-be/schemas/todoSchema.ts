import mongoose from 'mongoose';

const toDoSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  message: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  lastModified: { type: String },
});

export const Model = mongoose.model('todo', toDoSchema);
