const express = require('express');
const User = require('./../models/user');
const Invoice = require('./../models/invoice');
const router = express.Router();
var stripe = require("stripe")("sk_test_pxM1ADUZGQHtSc4lW34SH2CV00U1NA1k5v");



router.get('/testing/customerID', (req, res) => {


});



router.post('/invoice/recurring/subscription', (req, res) => {

  console.log(req.body, " body ");
  let invoice_id = req.body.invoice_id;
  let data = req.body.data;

  let invoice = new Invoice({

    invoice_id: invoice_id,
    // customer_id: customer_id,
    data: [data]

  }).save((err, result) => {
    if (err) {
      console.log(data);
      res.status(500).send(err);
    }
    if (result) res.status(200).send(result);
  })


});

router.get('/invoice/data', (req, res) => {

  let searchCustomerById = req.body.customerid;

  Invoice.findOne({ customerid: searchCustomerById }, function (err, doc) {
    if (err) res.status(500).send(err);
    if (doc) res.status(200).send(doc);
  });


});


// get all invoices from stripe filter by customer

router.get('/invoices/getallinvoices/:customerId', (req, res) => {


  stripe.invoices.list(

    { "customer": req.params.customerID }
  ).then(invoices => {
    res.status(200).send(invoices);
  }).catch(err => {
    res.status(500).send(err);
  });

})



module.exports = router;

