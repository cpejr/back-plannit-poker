import { Router } from "express";

import userRoutes from "./UserRoutes.js";
import roomRoutes from "./RoomRoutes.js";

const routes = Router();

routes
  .use("/user", userRoutes)
  .use("/room", roomRoutes)

export default routes;
