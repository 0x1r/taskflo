import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default: "public/avatar/profile.svg",
    },
    provider: {
      type: String,
      required: true,
      default: "email",
    },

  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
