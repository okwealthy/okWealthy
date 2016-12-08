/**
 * Remixer model events
 */

'use strict';

import {EventEmitter} from 'events';
import Remixer from './remixer.model';
var RemixerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RemixerEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Remixer.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RemixerEvents.emit(event + ':' + doc._id, doc);
    RemixerEvents.emit(event, doc);
  };
}

export default RemixerEvents;
