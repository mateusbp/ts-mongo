import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserI extends Document {
  name?: string;
  email: string;
  password: string;
}

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
      min: 6,
    },
  },
  { timestamps: true },
);

UserSchema.pre<UserI>('save', async function generatePassword(next) {
  const hash = await bcrypt.hash(this.password, 8);
  this.password = hash;

  next();
});

export default model<UserI>('User', UserSchema);
