import { validationResult } from "express-validator";
import { Request, Response } from "express";
import Comment from "../modals/Comment";

export const createComment = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newComment = new Comment({
    content: req.body.content,
    userId: req.user._id,
    movieId: req.params.movieId,
  });
  await newComment.save();
  res.status(201).json(newComment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json(comment);
};
