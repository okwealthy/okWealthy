'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

import User from './user.model';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/admin/changeRole', auth.hasRole('admin'), controller.changeRole);
router.put('/admin/forceResetPassword', auth.hasRole('admin'), controller.forceResetPassword);
router.put('/admin/updateInfo', auth.hasRole('admin'), controller.updateInfo);
router.post('/admin', auth.hasRole('admin'), controller.createForAdmin);


router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);


router.put('/manager/updateInfo', auth.hasBusinessRight(User, 'manager'), controller.updateInfo);
router.get('/my/:bID', auth.hasRole('manager'), controller.myStaff);

router.post('/manager', auth.hasRole('manager'), controller.createForManager);
router.delete('/my/:id', auth.hasBusinessRight(User, 'manager'), controller.destroy);
router.put('/changeRole', auth.hasBusinessRight(User, 'manager'), controller.changeRole);
router.put('/forceResetPassword', auth.hasBusinessRight(User, 'manager'), controller.forceResetPassword);





router.get('/:id', auth.isAuthenticated(), controller.show);


router.post('/', controller.create);



module.exports = router;
