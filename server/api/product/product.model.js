'use strict';

import mongoose, {Schema} from 'mongoose';

var ProductSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: {
  	type: Boolean,
  	default: true
  },
  _business:   { type: Schema.Types.ObjectId, ref: 'Business' },
  _category:   { type: Schema.Types.ObjectId, ref: 'Category' },
  _remixers:  [{ type: Schema.Types.ObjectId, ref: 'Remixer' }],
  _modifiers: [{ type: Schema.Types.ObjectId, ref: 'Modifier' }],
  _with:      [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model('Product', ProductSchema);
