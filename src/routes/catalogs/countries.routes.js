import { Router } from "express";
import { tokenValidator } from "../../middlewares/authoritation.js";
import { GetAll } from "../../controllers/catalogs/countries.controller.js";

const router = Router();

router.get("/all", await tokenValidator, GetAll);

export default router;