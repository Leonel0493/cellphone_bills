import { Router } from "express";
import { tokenValidator, tokenRoleValidator } from "../../middlewares/authoritation.js";
import { GetAll } from "../../controllers/catalogs/countries.controller.js";

const router = Router();

router.get("/all", await tokenRoleValidator('Admin'), GetAll);

export default router;