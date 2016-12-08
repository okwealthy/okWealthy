/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/businesses              ->  index
 * POST    /api/businesses              ->  create
 * GET     /api/businesses/:id          ->  show
 * PUT     /api/businesses/:id          ->  upsert
 * PATCH   /api/businesses/:id          ->  patch
 * DELETE  /api/businesses/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Business from './business.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


// Gets my Businesss
export function my(req, res) {
  return Business.find({
    _owners: req.user._id
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a list of Businesss
export function index(req, res) {
  return Business.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Business from the DB
export function show(req, res) {
  return Business.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Business in the DB
export function create(req, res) {
  return Business.create(req.body)
    .then(function(entity){
      entity._business = entity._id;

      req.user._business = entity._id;
      req.user.save();

      return entity.save();
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Business in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Business.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Business in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Business.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Business from the DB
export function destroy(req, res) {
  return Business.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
