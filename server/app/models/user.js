const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Customer = require('./customer');
const Product = require('./product');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: { type: String },
  stripeCustomerId: { type: String },
  stripeProductId: {
    type: String, plan: [
      { planId: { type: String } }
    ]
  },
  stripeSubscriptionId: { tyoe: String },
  stripePlanId: { tyoe: String },
  stripeTXNtime: { type: Date },
  stripeInvoiceId: { type: String },

});



module.exports = mongoose.model('User', userSchema);


