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
    userId: req.user.id,
    movieId: req.params.movieId,
  });
  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentsByMovieId = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId });
    res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
