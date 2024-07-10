// user.model.ts

import { Schema, Document } from 'mongoose';

export interface User extends Document {
  id: string;
  name: string;
  surname: string;
  username: string;
  birthdate: Date;
  blocked?: boolean;
}

export const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
  blocked: { type: Boolean, default: false }
});
