import { Document, Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
  userName: string;
  email: string;
  password: string;

  verifyPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
  userName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function ( this:UserDocument,next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.verifyPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
