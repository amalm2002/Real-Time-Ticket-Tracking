import { Router } from "express";
import { AuthController } from "../controller/implementations/AuthController";
import { AuthService } from "../services/implementations/AuthService";
import { AuthRepository } from "../repositories/implementations/AuthRepository";
import { UserController } from "../controller/implementations/UserController";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { UserService } from "../services/implementations/UserService";
import { AuthUtility } from "../utils/auth.utils";
import { verifyJWT } from "../middlewares/auth.middleware";
import { TokenRepository } from "../repositories/implementations/TokenRepository";

const router = Router();

// Dependency Injection
const authRepo = new AuthRepository();
const userRepo = new UserRepository();
const tokenRepo = new TokenRepository()
const authUtil = new AuthUtility
const userService = new UserService(userRepo, tokenRepo);
const authService = new AuthService(authRepo, authUtil);
const authController = new AuthController(authService);
const userController = new UserController(userService);


// Register a new user account
router.post("/signup", (req, res) => authController.signup(req, res));

// Authenticate user credentials
router.post("/login", (req, res) => authController.login(req, res));

// Fetch a single user’s details using userId
router.get("/user/:userId", verifyJWT, (req, res) => userController.getUserById(req, res));
router.get("/user/token/:userId", verifyJWT, (req, res) => userController.getUserTokens(req, res));

// Fetch all registered users (Admin access only)
router.get("/admin/users", verifyJWT, (req, res) => userController.getAllUsers(req, res))

// Assign a token to a specific user (Admin action)
router.post("/admin/users/assign-token/:userId", verifyJWT, (req, res) => userController.assignToken(req, res));

router.get("/refresh-token", (req, res) => authController.refreshToken(req, res));



export default router;
