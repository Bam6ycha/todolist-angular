import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { StateInterface } from './types/interfaces/interfaces';

dotenv.config();

const API_URL = `mongodb+srv://Bam6ycha:${process.env.API_PASSWORD}@cluster0.t4qvm.mongodb.net/Todo-list?retryWrites=true&w=majority`;

const state: StateInterface = {
  db: null,
};

export const connect = async () => {
  try {
    if (state.db) {
      return;
    }
    state.db = await mongoose.connect(API_URL);
  } catch (error) {
    console.log(error);
  }
};
