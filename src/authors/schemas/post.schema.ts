import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: Boolean,
    defaultValue: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
});
