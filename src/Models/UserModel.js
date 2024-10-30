import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: false,
    trim: true,
  },
  vote: {
    type: Number,
  },
  type: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  }
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
