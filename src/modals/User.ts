import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordLink: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

export const User = mongoose.model("User", userSchema);
