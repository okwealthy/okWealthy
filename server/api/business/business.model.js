'use strict';

import mongoose, {Schema} from 'mongoose';


var BusinessSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: {
  	type: Boolean,
  	default: true
  },
  _business: { type: Schema.Types.ObjectId, ref: 'Business' }, 
  _owners: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
	timestamps: true
});

export default mongoose.model('Business', BusinessSchema);
