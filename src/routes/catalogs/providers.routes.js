import {Router} from 'express';
import { tokenRoleValidator } from '../../middlewares/authoritation';

const router = Router();

router.get('/all', await tokenRoleValidator('Admin'), () => console.log('get all providers'));
router.get('/{id}', await tokenRoleValidator('Admin'),  () => console.log('get provider by id'));
router.post('/', await tokenRoleValidator('Admin'), () => console.log('post'));
router.put('/', await tokenRoleValidator('Admin'), () => console.log('put'));
router.delete('/', await tokenRoleValidator('Admin'), () => console.log('delete'));

export default router;