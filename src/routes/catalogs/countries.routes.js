import { Router } from 'express'
import { GetAll } from '../../controllers/catalogs/countries.controller.js';

const router = Router();

router.get('/all', GetAll);

export default router;