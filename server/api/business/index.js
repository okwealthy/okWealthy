'use strict';

var express = require('express');
var controller = require('./business.controller');
var Business = require('./business.model');
import * as auth from '../../auth/auth.service';

import User from '../user/user.model';

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', auth.hasRole('manager'), controller.create);

router.get('/my', auth.hasRole('manager'), controller.my);
router.get('/:id', auth.hasRole('manager'), controller.show);

router.put('/:id', auth.hasBusinessRight(User, 'manager'), controller.upsert);

// router.patch('/:id', auth.bossInBusiness(), controller.patch);
// router.delete('/:id', auth.bossInBusiness(), controller.destroy);

module.exports = router;
