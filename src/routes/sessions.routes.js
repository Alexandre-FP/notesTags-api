import { SessionsController } from "../controllers/SessionsController.js";
import express from "express";

const sessionController = new SessionsController();
const sessionRouter = express.Router();

sessionRouter.post("/", sessionController.login);

export default sessionRouter; 