'use strict';

import mongoose, {Schema} from 'mongoose';

var CategorySchema = new mongoose.Schema({
  name: String,
  active: {
  	type: Boolean,
  	default: true
  },
  _business: { type: Schema.Types.ObjectId, ref: 'Business' }
});

export default mongoose.model('Category', CategorySchema);

