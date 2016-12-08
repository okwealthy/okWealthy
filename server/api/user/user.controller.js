'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

import mongoose, {Schema} from 'mongoose';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function createForManager(req, res) {
  var newUser = new User(req.body);
  newUser._business = req.user._business;
  newUser.provider = 'local';
  newUser.role = 'staff';
  newUser.save()
    .then(function(user) {
      res.json({ status: 'ok' });
    })
    .catch(validationError(res));
}


/**
 * Creates a new user
 */
export function createForAdmin(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      res.json({ status: 'ok' });
    })
    .catch(validationError(res));
}



/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}



/**
 * Get staff
 */
export function myStaff(req, res, next) {
  var bID = req.params.bID || '';

  return User.find({
    _business: bID
  })
  .select('-salt -password')
    .exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }

      return res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}



export function changeRole(req, res){

  var userId = req.body._id;
  var isAdmin = req.user.role === 'admin';
  var isManager = req.user.role === 'manager';

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }

      if (!isAdmin){
        if (req.body.role.toLowerCase() === 'admin' || req.body.role.toLowerCase() === 'system'){
          return res.status(401).end();
        }

        if (req.body.role.toLowerCase() === 'boss' && isManager){
          return res.status(401).end();
        }
      }

      user.role = req.body.role;
      return user.save()
        .then(function(){

          return res.json(user.profile);
        });
    })
    .catch(err => next(err));
  
}




export function updateInfo(req, res){

  var userId = req.body._id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }

      user.active = req.body.active;
      user.name = req.body.name;
      user.email = req.body.email;
      return user.save()
        .then(function(){

          return res.json(user.profile);
        });
    })
    .catch(err => next(err));
  
}


/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function forceResetPassword(req, res) {
  var userId =  String(req.body._id);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {

      user.password = newPass;
      return user.save()
        .then(() => {
          return res.status(204).end();
        })
        .catch(validationError(res));
    
    });
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
