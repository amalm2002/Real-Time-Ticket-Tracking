import { Router } from "express";
import { AuthController } from "../controller/implementations/AuthController";
import { AuthService } from "../services/implementations/AuthService";
import { AuthRepository } from "../repositories/implementations/AuthRepository";
import { UserController } from "../controller/implementations/UserController";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { UserService } from "../services/implementations/UserService";

const router = Router();

// Dependency Injection
const authRepo = new AuthRepository();
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const authService = new AuthService(authRepo);
const authController = new AuthController(authService);
const userController = new UserController(userService);


// Register a new user account
router.post("/signup", (req, res) => authController.signup(req, res));

// Authenticate user credentials
router.post("/login", (req, res) => authController.login(req, res));

// Fetch a single user’s details using userId
router.get("/users/:userId", (req, res) => userController.getUserById(req, res));

// Fetch all registered users (Admin access only)
router.get("/admin/users", (req, res) => userController.getAllUsers(req, res))

// Assign a token to a specific user (Admin action)
router.post("/admin/users/assign-token/:userId", (req, res) => userController.assignToken(req, res));


export default router;
