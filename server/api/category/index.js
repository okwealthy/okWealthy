'use strict';

var express = require('express');
var controller = require('./category.controller');

import * as auth from '../../auth/auth.service';

import Category from './category.model';

var router = express.Router();

router.get('/', auth.hasRole('admin'),controller.index);
router.get('/business/:bid', auth.hasRole('manager'), controller.listFromBusiness);

router.get('/:id', controller.show);
router.post('/', auth.hasRole('manager'), controller.create);

router.put('/:id', auth.hasBusinessRight(Category, 'manager'), controller.upsert);
router.patch('/:id', auth.hasBusinessRight(Category, 'manager'), controller.patch);
router.delete('/:id', auth.hasBusinessRight(Category, 'manager'), controller.destroy);

module.exports = router;
