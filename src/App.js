import cors from "cors";
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

import { NotFoundError } from "./Errors/baseErrors.js";
import corsOptions from "./Config/cors.js";
import routes from "./routes/index.js";
//import errorHandler from "./Middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use(helmet());
app.use(routes);

// Non existing routes
app.use("*", (req, res, next) => {
  next(new NotFoundError(`Route '${req.baseUrl}' not found`));
});

// Must be after routes

//app.use(errorHandler);

export default app;
