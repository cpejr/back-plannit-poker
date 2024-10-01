import { Router } from "express";
import RoomController from "../Controllers/RoomController.js";
import RoomValidator from "../Validators/RoomValidator.js";
import verifyJwt from "../Middlewares/VerifyJwt.js";


const RoomRoutes = Router();

RoomRoutes.route("/").post(verifyJwt, RoomValidator.create, RoomController.create).get(RoomController.getAll);

RoomRoutes
  .route("/:id")
  .get(verifyJwt, RoomValidator.get, RoomController.get)
  .delete(verifyJwt, RoomValidator.destroy, RoomController.destroy)
  .put(verifyJwt, RoomValidator.update, RoomController.update)
  
RoomRoutes.put('/addUser/:id', RoomValidator.addUser, RoomController.addUser);

export default RoomRoutes;
