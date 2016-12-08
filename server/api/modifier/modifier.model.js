'use strict';

import mongoose from 'mongoose';

var ModifierSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Modifier', ModifierSchema);
