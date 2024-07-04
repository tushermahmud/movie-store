import { validationResult } from "express-validator";
import { Request, Response } from "express";
import Movie from "../modals/Movie";

export const getAllMovies = async (req: Request, res: Response) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const createMovie = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.status(201).json(newMovie);
};

export const deleteMovie = async (req: Request, res: Response) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  res.status(200).json(movie);
};

