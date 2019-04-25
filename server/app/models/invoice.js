const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const invoiceSchema = new Schema({

  // check whether the subscripton

  invoice_id: { type: String },
  // customer_id: { type: String },
  data: []
});



module.exports = mongoose.model('Invoice', invoiceSchema);
