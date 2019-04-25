const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  stripeCustomerId: { type: String }
});

module.exports = mongoose.model('Customer', customerSchema);
