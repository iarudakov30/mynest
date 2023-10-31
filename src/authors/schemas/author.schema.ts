import * as mongoose from 'mongoose';
import { Gender } from '../models/author.types';

export const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    defaultValue: true
  },
  gender: {
    type: String,
    enum: Gender,
    defaultValue: Gender.Other
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});
