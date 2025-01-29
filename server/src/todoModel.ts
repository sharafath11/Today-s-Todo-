import { Schema, model, Document } from 'mongoose';
interface IUser extends Document {
  todo: string;
  status:boolean,
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new Schema<IUser>({
  todo:{type:String,required:true},
  status:{type:Boolean,default:false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
export const todoModal = model<IUser>('TODO', userSchema);