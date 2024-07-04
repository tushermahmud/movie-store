import express from "express";
import { getAllMovies, createMovie, deleteMovie, getMovieById } from "../controllers/movie.controller";
import authCheck from "../middleware/auth";
import isAdmin from "../middleware/isAdmin";
import { check } from "express-validator";

const router = express.Router();
/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     tags: [Movies]
 *     security:
 *       - api_key: []
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token required for authentication
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated id of the movie
 *                   name:
 *                     type: string
 *                     description: The name of the movie
 *                   description:
 *                     type: string
 *                     description: The description of the movie
 *                   runningTime:
 *                     type: number
 *                     description: The running time of the movie in minutes
 *                   thumbnail:
 *                     type: string
 *                     description: The URL of the movie thumbnail
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authCheck, getAllMovies);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - api_key: []
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token required for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - runningTime
 *               - thumbnail
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the movie
 *               description:
 *                 type: string
 *                 description: The description of the movie
 *               runningTime:
 *                 type: number
 *                 description: The running time of the movie in minutes
 *               thumbnail:
 *                 type: string
 *                 description: The image file for the movie thumbnail
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The auto-generated id of the movie
 *                 name:
 *                   type: string
 *                   description: The name of the movie
 *                 description:
 *                   type: string
 *                   description: The description of the movie
 *                 runningTime:
 *                   type: number
 *                   description: The running time of the movie in minutes
 *                 thumbnail:
 *                   type: string
 *                   description: The URL of the movie thumbnail
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.post(
  "/",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("runningTime")
      .isNumeric()
      .withMessage("Running time must be a number"),
    check("thumbnail").notEmpty().withMessage("Thumbnail URL is required"),
    check("rating").notEmpty().withMessage("Rating is required"),
    check("duration").notEmpty().withMessage("Duration is required"),
  ],
  authCheck,
  isAdmin,
  createMovie
);
export default router;

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     security:
 *       - api_key: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to delete
 *       - in: header
 *         name: x-auth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token required for authentication
 *     responses:
 *       204:
 *         description: Movie deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", authCheck, isAdmin, deleteMovie);

router.get("/:id", authCheck, getMovieById);