import TagsControllers from "../controllers/TagsControllers.js";
import express from "express";
import AcessoRotas from "../middlewares/AcessoRotas.js";

const tagsRouter = express.Router();
const tagsControllers = new TagsControllers();

tagsRouter.get("/:id", AcessoRotas, tagsControllers.index);

export default tagsRouter;