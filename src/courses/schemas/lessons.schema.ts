import * as mongoose from 'mongoose';

export const LessonsSchema = new mongoose.Schema({
  seqNo: Number,
  description: String,
  duration: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
});
