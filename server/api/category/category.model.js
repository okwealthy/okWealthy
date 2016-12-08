'use strict';

import mongoose, {Schema} from 'mongoose';

var CategorySchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  _business: { type: Schema.Types.ObjectId, ref: 'Business' }
});

export default mongoose.model('Category', CategorySchema);

