import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import UserValidator from "../Validators/UserValidator.js";
import verifyJwt from "../Middlewares/VerifyJwt.js";


const userRoutes = Router();

userRoutes.route("/").post(UserValidator.create, UserController.create).get(UserController.readAll);

userRoutes
  .route("/:id")
  .get(verifyJwt, UserValidator.get, UserController.read)
  .delete(verifyJwt, UserValidator.destroy, UserController.destroy)
  .put(verifyJwt, UserValidator.update, UserController.update);

export default userRoutes;
