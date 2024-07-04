import { validationResult } from "express-validator";
import { Request, Response } from "express";
import Movie from "../modals/Movie";

export const getAllMovies = async (req: Request, res: Response) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
