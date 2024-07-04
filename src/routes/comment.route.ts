import express from "express";
import { createComment, deleteComment } from "../controllers/comment.controller";
import authCheck from "../middleware/auth";
import isAdmin from "../middleware/isAdmin";
import { check } from "express-validator";

const router = express.Router();

router.post("/:movieId/create-comment", [
  check("content").notEmpty().withMessage("Content is required"),
], authCheck, createComment);


router.delete("/:id", authCheck, isAdmin, deleteComment);
export default router;