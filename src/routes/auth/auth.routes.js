import { Router } from 'express';
import * as AuthActions from '../../controllers/auth/auth.controller.js'

const router = Router();

router.post('/singin', AuthActions.Autenticate);

router.post('/singup', AuthActions.RegisterUser);

export default router;