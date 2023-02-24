import {Router} from 'express';
import { tokenRoleValidator } from '../../middlewares/authoritation.js';
import * as BrandsMethods from '../../controllers/catalogs/brands.controller.js'

const router = Router();

router.get('/all', await tokenRoleValidator('Admin'), BrandsMethods.GetAllBrands);
router.get('/:id', await tokenRoleValidator('Admin'),  BrandsMethods.GetBrandById);
router.post('/', await tokenRoleValidator('Admin'), BrandsMethods.SaveBrand);
router.put('/', await tokenRoleValidator('Admin'), BrandsMethods.UpdateBrand);
router.delete('/:id', await tokenRoleValidator('Admin'), BrandsMethods.DisableBrand);

export default router;