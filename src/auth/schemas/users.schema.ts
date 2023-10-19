import * as mongoose from 'mongoose';

export const UsersSchema: mongoose.Schema = new mongoose.Schema({
  email: String,
  roles: Array,
  passwordHash: String
});
