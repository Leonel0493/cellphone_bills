import { Router } from "express";
import * as AuthActions from "../../controllers/auth/auth.controller.js";
import * as PermissionActions from "../../controllers/auth/permissons.controller.js";
import { tokenRoleValidator } from "../../middlewares/authoritation.js";

const router = Router();

router.post("/singin", AuthActions.Autenticate);

router.post("/singup", AuthActions.RegisterUser);

router.post(
  "/save-permissions",
  await tokenRoleValidator("Admin"),
  PermissionActions.AddPermissions
);

export default router;
