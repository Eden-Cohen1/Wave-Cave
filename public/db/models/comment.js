import mongoose from "mongoose";
import { generateKey } from "../../../server.js";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id: String,
});

commentSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = generateKey();
  }
  next();
});

export const Comment = mongoose.model("Comment", commentSchema);
export async function createComment(body, currentUser) {
  const comment = new Comment({
    user: currentUser,
    text: body,
  });
  try {
    return await comment.save();
  } catch (err) {
    console.error("Error Commenting:", err);
    throw err;
  }
}
