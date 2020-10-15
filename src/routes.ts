import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import OrphanageController from "./controllers/OrphanagesController";
import OrphanagesValidations from "./controllers/OrphanagesValidations";

const routes = Router();
const upload = multer(uploadConfig);

// index, show, create, update, delete

routes.get("/orphanages", OrphanageController.index);

routes.get("/orphanages/:id", OrphanageController.show);

routes.post(
  "/orphanages",
  upload.array("images"),
  OrphanagesValidations.create,
  OrphanageController.create
);

export default routes;
