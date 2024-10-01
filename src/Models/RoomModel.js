import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  maxUsers: {
    type: Number,
    default: 18,
  },
  show:{
    type: Boolean, 
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0 
  },
});

RoomSchema.virtual('id').get(function() {
  return this.code;
});

RoomSchema.set('toJSON', { virtuals: true });
RoomSchema.set('toObject', { virtuals: true });

const RoomModel = mongoose.model("room", RoomSchema);

export default RoomModel;