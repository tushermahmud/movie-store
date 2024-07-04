import express from "express";
import {
  createUser,
  forgetPassword,
  login,
  resetPassword,
} from "../controllers/user.controller";
import { check } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * /user/createUser:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user with username, email, and password.
 *     tags:
 *       - User Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirm_password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for the new user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address for the new user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the new user.
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 description: Confirmation of the password for validation.
 *     responses:
 *       200:
 *         description: User created successfully. Returns the user data and a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully.
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Validation error or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User already exists!
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error!
 */
router.post(
  "/createUser",
  [
    check("email").notEmpty().isEmail().withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 6, max: 30 })
      .withMessage("Password must be between 6 and 30 characters"),
    check("username")
      .notEmpty()
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters"),
    check("confirm_password")
      .notEmpty()
      .withMessage("Confirm password is required"),
  ],
  createUser
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Logs in a user by checking email and password.
 *     tags:
 *       - User Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account.
 *     responses:
 *       200:
 *         description: Login successful. Returns user token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error, such as missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email address"
 *       401:
 *         description: Unauthorized. Incorrect email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Your credentials are invalid"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error!"
 */
router.post(
  "/login",
  [
    check("email").notEmpty().isEmail().withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 6, max: 30 })
      .withMessage("Password must be between 6 and 30 characters"),
  ],
  login
);


/**
 * @swagger
 * /user/forgot-password:
 *   put:
 *     summary: Request a password reset
 *     description: Sends a password reset link to the user's email if the user exists.
 *     tags:
 *       - User Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user requesting password reset.
 *     responses:
 *       200:
 *         description: Email with password reset link sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email has been sent to user@example.com"
 *       400:
 *         description: Validation error, such as missing or invalid email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email address"
 *       404:
 *         description: No user found with the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User doesn't exist"
 *       500:
 *         description: Internal server error or error sending email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error!"
 */
router.put(
  "/forgot-password",
  [
    check("email", "Email is empty!!").notEmpty(),
    check("email", "Invalid email!!").isEmail(),
  ],
  forgetPassword
);


/**
 * @swagger
 * /user/password/reset:
 *   put:
 *     summary: Reset a user's password
 *     description: Resets the user's password using a unique reset password link sent to the user's email.
 *     tags:
 *       - User Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetPasswordLink
 *               - newPassword
 *             properties:
 *               resetPasswordLink:
 *                 type: string
 *                 description: Reset password link required to verify the user's email address and allow password reset.
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Password reset successfully. Returns success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
  *                 message:
 *                   type: string
 *                   example: "You have successfully Reset the password!"
 *       400:
 *         description: Validation error, such as missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid reset password link"
 *       404:
 *         description: No user found with the provided reset link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The User doesn't Exist!"
 *       500:
 *         description: Internal server error or error during password reset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error!"
 */
router.put("/password/reset", resetPassword);

export default router;
