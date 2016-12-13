'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();


import * as auth from '../../auth/auth.service';

import Product from './product.model';


router.get('/', auth.hasRole('admin'), controller.index);
router.get('/business/:bid/category/:cid', auth.hasRole('manager'), controller.listFromBusinessCategory);

router.get('/:id', controller.show);

router.post('/', auth.hasRole('manager'), controller.create);

router.put('/:id', auth.hasBusinessRight(Product, 'manager'), controller.upsert);
router.patch('/:id', auth.hasBusinessRight(Product, 'manager'), controller.patch);
router.delete('/:id', auth.hasBusinessRight(Product, 'manager'), controller.destroy);

module.exports = router;
