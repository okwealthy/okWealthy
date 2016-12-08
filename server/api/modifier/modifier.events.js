/**
 * Modifier model events
 */

'use strict';

import {EventEmitter} from 'events';
import Modifier from './modifier.model';
var ModifierEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ModifierEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Modifier.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ModifierEvents.emit(event + ':' + doc._id, doc);
    ModifierEvents.emit(event, doc);
  };
}

export default ModifierEvents;
