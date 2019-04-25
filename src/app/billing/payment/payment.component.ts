import { HttpHeaders, HttpClient } from '@angular/common/http';
import { from } from 'rxjs/observable/from';
import { filter, ignoreElements } from 'rxjs/operators';


import {
  Component, OnInit, AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';



import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';



import { NgForm } from '@angular/forms';

// service

import { StripeServiceService } from './../stripe-service/stripe-service.service'
import { interval, ArgumentOutOfRangeError } from 'rxjs';
import { InvokeFunctionExpr } from '@angular/compiler';

declare var stripe: any;
declare var elements: any;



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  oldCustomer: boolean = false;
  newCustomer: boolean = true;

  constructor(private cd: ChangeDetectorRef,
    private _paymentService: StripeServiceService
  ) { }

  chooseUser(data) {
    if (data == 'first') {
      this.newCustomer = true;
      this.oldCustomer = false;
    }
    if (data == 'old') {
      this.newCustomer = false;
      this.oldCustomer = true;
    }
  }

  planData: any;

  stripeCharge: any;
  stripeCurrency: any = 'USD'
  plan(data) {
    this.planData = data;

    if (this.planData === 'manual' || this.planData === 'month') {
      // charge him monthly
      this.stripeCharge = 10;

    }
    if (this.planData === 'quater') {
      this.stripeCharge = 25;
    }
    if (this.planData === 'annual') {
      this.stripeCharge = 75;
    }


    console.log(this.planData, " plan selected ");
  }

  // creating a service for making a one time charge




  SignupForm: FormGroup;


  products: [{
    productid, productname
  }
  ];


  // filter all data to send

  getProduct(data) {
    console.log(data, " data for product ");
    if (data === 'Zibtek Memebership') {

    }
  }

  stripeProduct;
  stripeCustomer;
  stripePlan;
  stripeCard;

  filterPlan: {
    currency,
    id,
    interval, nickname, amount
  }

  selectedPlans;
  planByProduct;
  planByProductArrays = [];
  planTag = false;
  productId;
  productSelected(productId, productName, data) {
    this.productId = productId;
    if (data == -'manual') { }
    this.planTag = true;
    console.log(productId, productName, " on selected product ");
    console.log(this.stripePlan.data, " stripe plan ");
    this.stripePlan.data.forEach(plans => {
      if (plans.product == productId) {
        console.log(plans, " plans ");
        this.planByProduct = plans;
        console.log(this.planByProduct, " plan by product")
        this.planByProductArrays.push(this.planByProduct);

      }
      console.log(this.planByProductArrays, " fctg");
      // console.log(this.filterPlan, " edited stripe plan");

    });

  }

  selectedCustomerId;
  selectedCustomerEmail;
  selectedCustomerInvoice;

  invoiceTag = false;
  customerSelected(customerId, customerEmail) {
    this.selectedCustomerId = customerId;
    this.selectedCustomerEmail = customerEmail;


    this._paymentService.getCustomerInvoices(customerId).subscribe(data => {
      console.log(data, " data from invoices");
      this.selectedCustomerInvoice = data;
      console.log(this.selectedCustomerInvoice, " invoices from user");
      this.saveInvoice();

    }, err => {
      console.log(err, " error ");
    })

    // /getallinvoices/: customerId


    console.log(customerId, customerEmail, " customer on select ");
  }

  // rendering the selected invoice

  // invoiceObject: {
  //   invoice_id,
  //   data
  // }

  saveInvoice() {
    // console.log(this.selectedCustomerInvoice, " Invoice ");

    this.selectedCustomerInvoice.data.forEach(invoice => {

      console.log(invoice.id, " invoice id");
      let invoiceObject = {
        data: this.selectedCustomerInvoice.data,
        invoice_id: invoice.id
      };
      // console.log(invoice.customer, " customer id");
      // this.invoiceObject.invoice_id = invoice.id;
      console.log(invoiceObject, " invoice object");
      this._paymentService.saveInvoicetoMongod(invoiceObject).subscribe(data => {
        console.log(data, " from the mongodb data base");
      }, err => {
        console.log(err, " error");
      })

    })
  }


  ngOnInit() {



    // get all the customer id,

    this._paymentService.getAllStripeCustomer().subscribe((data) => {

      this.stripeCustomer = data;

      console.log(this.stripeCustomer, " this is all stripe customer data")
    },
      (err) => {
        console.log({ err })
      }
    );

    // all customer ends

    // create a customer with card details and



    // get all the products
    this._paymentService.getAllProducts().subscribe(data => {

      this.stripeProduct = data;

      console.log(this.stripeProduct, " data for the products");
    }, err => {
      console.log(err);
    })

    // all products ends


    // get all the plans

    this._paymentService.getAllPlans().subscribe(data => {

      this.stripePlan = data;
      console.log(this.stripePlan, " data of plans ");
    }, err => {
      console.log(err, " error ");
    });

    // get the invoices




    // all plans ends

    this.newCustomer = true;
    this.SignupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required,]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'address': new FormControl(null),
        'phone': new FormControl(null)
      }),
      // 'gender': new FormControl(''),
      // 'hobbies': new FormArray([])
    });

    // this.SignupForm.setValue({
    //   'userData': {
    //     'username': 'akash',
    //     'email': 'akash@gmail.com'
    //   },
    //   'gender': 'male'

    // })
  }

  customerData: any;

  // creating a customer
  onSignUp(data) {
    if (data === 'newCustomerSignup') {
      let body = {
        email: this.SignupForm.value.userData.email,
        description: this.SignupForm.value.userData.username,
        phone: this.SignupForm.value.userData.phone,
        address: this.SignupForm.value.userData.address,

      }

      this._paymentService.createCustomerInLocal(body).subscribe(data => {
        // data coming from apis
        this.customerData = data;

        console.log(data, " customer created ");

      },
        err => {
          console.log(err);
        });

      // save to local data base - mongodb




    }

  }





  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };

    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  manualPayment;



  async onSubmit(form: NgForm) {


    // console.log(this.stripeCard, " card token ");

    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      this.stripeCard = token.card;
      if (this.manualPaymentflag == true) {
        this.makePayment();


      }
      else {
        this.subscriptionPayment();

      }

    }
    this.saveInvoice();



  }

  // saving to local database

  // saveToMongo() {
  //   this._paymentService.createCustomer(this.staticData).subscribe(data => {
  //     console.log(data, " data ");
  //   }, err => {
  //     console.log(err);
  //   })
  // }

  manualObject: {
    planid, planNickname, planCurrency, customerid, amount
  }
  manualPaymentflag = false;
  manual(id, interval, nickname, currency, amount, data) {
    if (data === 'manual') this.manualPaymentflag = true;
    this.manualObject = {
      planid: id,
      planNickname: nickname,
      planCurrency: currency,
      customerid: this.stripeCustomer,
      amount: amount,

    }

  }

  makePayment() {



    this.planTag = true;
    // attaching card to customer
    console.log(this.selectedCustomerId, this.stripeCard, this.stripeCurrency);
    let paymentObject = {

      customerId: this.selectedCustomerId,
      amount: 10, source: this.stripeCard.id,
      currency: this.stripeCurrency,
      // for subscription

    }



    console.log(paymentObject, " payment object ");
    this._paymentService.saveCardAndPay(paymentObject).subscribe(data => {
      console.log(data, " data after payment");
    },
      err => {
        console.log(err, " error ");
      });

    // for subscription
    // cus

    this.storeCustomerInformation(paymentObject, 'manual');

  }

  paymentObject: {
    customerId, amount, source, planID, currency, productId
  }

  planId;

  planSelectedByUser(id, interval, nickname, currency) {
    //  customer id, amount, currency, planid,
    console.log(this.selectedCustomerId, this.stripeCard, this.stripeCurrency);
    // data = planid
    this.planId = id;
    this.paymentObject = {
      customerId: this.selectedCustomerId,
      amount: 10, source: this.stripeCard.id,
      planID: id,
      productId: this.productId,
      currency: currency,

      // for subscription

    }




  }
  subscriptionId: any;

  subscriptionPayment() {

    this.paymentObject = {
      customerId: this.selectedCustomerId,
      amount: 10,
      source: this.stripeCard.id,
      planID: this.planId,
      currency: this.stripeCurrency,
      productId: this.productId

    }
    console.log(this.paymentObject, " payment object ");

    this._paymentService.subscriptionPay(this.paymentObject).subscribe(data => {
      console.log(data, " data from subscribe");
      this.subscriptionId = data;

    }, err => {
      console.log(err);
    });
    this.storeCustomerInformation(this.paymentObject, '');

  }

  saveObject: {
    email, stripeCustomerId, stripeProductId, stripeSubscriptionId, stripePlanId

  }

  storeCustomerInformation(data, mode) {


    this.saveObject = {
      email: this.selectedCustomerEmail,
      stripeCustomerId: this.selectedCustomerId,
      stripeProductId: this.productId,

      stripeSubscriptionId: this.subscriptionId,
      stripePlanId: this.planId
    }


    this._paymentService.saveStripe(this.saveObject).subscribe(data => {
      console.log(data, " from user");
    }, err => {
      console.log(err);
    })

  }

}



