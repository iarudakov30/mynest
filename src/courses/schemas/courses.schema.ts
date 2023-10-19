import * as mongoose from 'mongoose';

export const CoursesSchema = new mongoose.Schema({
  seqNo: {
    type: Number,
    required: true
  },
  url: String,
  description: String,
  price: Number,
  promo: Boolean,
  title: String,
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }
  ]
});
