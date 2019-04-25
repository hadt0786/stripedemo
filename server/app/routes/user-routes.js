const express = require('express');

var User = require('../models/user');
var Product = require('../models/product');
var Customer = require('./../models/customer');


const router = express.Router();
var stripe = require("stripe")("sk_test_pxM1ADUZGQHtSc4lW34SH2CV00U1NA1k5v");

router.get('/data', (req, res) => {
  res.send('Content yet to be added to database');
});

/***Stripe user api */

//create a customer



// create customer in mongodb

router.post('/createUser', (req, res) => {
  console.log("creating user");
  let user = new User({
    email: req.body.email,
    name: req.body.description,
    stripeCustomerId: req.body.stripeCustomerId
  });

  user.save(err, user => {
    console.log(user)
    if (err) res.status(500).send(user);
    if (user) res.status(200).send(user);
  })

});

// all customer
router.get('/allstripeCustomer', (req, res) => {
  stripe.customers.list(
    { limit: 1000 }

  ).then(customers => {
    res.status(200).send(customers);
  }).catch(err => {
    res.status(500).send(err);
  });
});

/**Stripe User api ends */

/**** PRODUCT APIS */

// 1-  create a product
router.post('/createproduct', (req, res) => {

  return stripe.products.create({
    name: 'Zibtek Membership',
    type: 'service',
    attributes: ['monthly', 'annualy'],
    // description: 'Zibtek Membership'
    // description: 'Super awesome, one-of-a-kind memebership',
  }).then(product => {
    console.log(product, " product ");
    // User.findOneAndUpdate({'stripeProductId':}, $set{stripeProductId:product.id});
    res.status(200).send(product);

  }).catch();


});

//2 - get all product

router.get('/getallproduct', (req, res) => {

  stripe.products.list(
    { limit: 100 }

  ).then(products => {
    res.status(200).send(products);
    // let productDetail = {
    //   productId, name
    // }
    // products.data.forEach(element => {
    //   productDetail.productId = element.id;
    //   productDetail.name = element.name;
    //   // modify
    // });
    // res.status(200).send(productDetail);
  }).catch(err => {
    res.status(500).send(err);
  });

});



/***END Product apis */


/*** Plan */

// get all plans for particular product

router.get('/getallplans', (req, res) => {
  // send the product id
  let productID = req.body.productID;

  stripe.plans.list(
    { limit: 100 }

  ).then(
    (plans) => {

      res.status(200).send(plans);
    }
  ).catch(err => {
    res.status(500).send(err);
  });

});


/**Plan APIS ens */

// if new customer then create a customer





// create a customer in stripe


router.post('/createstripecustomer', (req, res) => {

  stripe.customers.create({
    description: 'AKASH MOHAN CHAUDHARY',
    email: 'akash@zibtek.in',

    source: "tok_visa" // obtained with Stripe.js
  }).then(customer => {

    // save this customer.id in type ref user database


    // saving to local customer database


    // end


    return res.status(200).send(customer);
  }).catch(err => {
    return res.status(500).send(err);
  });

});


// save the customer


router.post("/charge", (req, res) => {
  console.log(" charge ");

  (async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
    });
  })();

  let amount = 500;
  let customer = {
    id: 'cus_123456789',
  }

  let token = "tok_1ELnQmGnl0mXzhZKvriVHS5Z";

  stripe.products.create({
    name: 'Zibtek Membership',
    type: 'service',
    attributes: ['monthly', 'annualy'],
    description: 'Super awesome, one-of-a-kind t-shirt',
  });


  stripe.customers.create({
    email: req.body.stripeEmail || 'akash@zibtek.in',
    source: 'tok_visa',


  })
    .then(customer =>


      // create a source --> card

      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id,
        // active: true,
        // interval: 'monthly'
      })
    )
    .then(charge => res.status(200).send({
      'message': charge
    }));
});


// main - payment api
router.post('/attachsource', (req, res) => {

  // console.log(req.body, " request body ");

  let customerId = req.body.customerId;
  let source = 'tok_visa';

  // attach a source

  stripe.customers.createSource(customerId, {
    source: source,
  }).then(source => {
    console.log(source, " source ");

    stripe.charges.create({
      amount: 10,
      currency: 'USD',
      customer: customerId,
      source: source,
      receipt_email: 'akash@zibtek.in',
    }).then(
      source => {
        console.log(source);
        res.status(200).send(source);
      }
    ).catch(err => {
      res.status(500).send(err);
      console.log(err);
    });

    // for one time
    stripe.invoiceItems.create({
      customer: customerId,
      amount: 10,
      currency: 'USD',
      description: 'One-time setup fee',
    }, function (err, invoiceItem) {
      // asynchronously called
      stripe.invoices.create({
        customer: customerId,
        auto_advance: true, // auto-finalize this draft after ~1 hour
      }).then(
        invoice => {
          // res.status(200).send(invoice);
          console.log(invoice, " invoice ");

        }
      );

      // one time ends

      // for sibscription



      // sibscription ends


    });



  }).catch(err => {
    console.log(err);
  });



  stripe.invoices.sendInvoice(invoice.id, function (err, invoice) {
    // asynchronously called
  });


});





router.post("/subscriptioncharge", (req, res) => {
  console.log(" subscriptioncharge ");
  console.log(req.body, " body ");

  let amount = 500;

  stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [
      {
        plan: req.body.planID,
      },
    ]
  }).then(subscription => res.status(200).send(subscription)
  ).catch(err =>
    res.status(500).send(err)
  );

  // invoice

});

router.post('/createcustomer', (req, res) => {
  console.log(req.body, "customer");
  // console.log(req.body, " body");


  stripe.customers.create({
    description: req.body.username,
    email: req.body.email,
    "shipping.address.line1": req.body.address,


  }).then(customer => {
    res.status(200).send(customer);
  }).catch(err => {
    res.status(500).send(err);
  });



});



router.post("/createProduct", (req, res) => {
  console.log(" subscriptioncharge ");


  let amount = 500;

  // create a services for sibscription

  stripe.products.create({
    name: 'testing Product',
    type: 'service',
  }).then(product).catch();

});

// get all invoices for the customer






module.exports = router;
