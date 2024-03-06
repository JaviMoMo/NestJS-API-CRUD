import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.entity';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isCompleted: boolean;

  @Prop({ required: true, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;
}

export const TaskEntity = SchemaFactory.createForClass(Task);
