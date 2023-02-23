import {Router} from 'express';
import { tokenRoleValidator } from '../../middlewares/authoritation';

const router = Router();

router.get('/all', await tokenRoleValidator('Admin'), () => console.log('get all status'));
router.get('/{id}', await tokenRoleValidator('Admin'),  () => console.log('get status by id'));
router.post('/', await tokenRoleValidator('Admin'), () => console.log('post'));
router.put('/', await tokenRoleValidator('Admin'), () => console.log('put'));
router.delete('/', await tokenRoleValidator('Admin'), () => console.log('delete'));

export default router;