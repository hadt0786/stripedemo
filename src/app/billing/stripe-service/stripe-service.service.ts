import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StripeServiceService {

  constructor(private _http: HttpClient) { }

  // stripe attaching a source and making payment

  saveCardAndPay(body) {
    console.log(body, " body inside stripe service");

    return this._http.post('http://localhost:3000/attachsource', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  subscriptionPay(body) {
    console.log(body, " body inside stripe service");

    return this._http.post('http://localhost:3000/subscriptionCharge', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  saveStripe(body) {
    console.log(body, " save customer");

    return this._http.post('http://localhost:3000/createcustomer', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }




  // create a customer

  createCustomer(body) {
    console.log(body, " body inside stripe service");

    return this._http.post('http://localhost:3000/createcustomer', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // store in local database




  createCustomerInLocal(body) {
    console.log(body, " body inside stripe service");

    return this._http.post('http://localhost:3000/invoice/recurring/subscription', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  // get all the cutomer

  getAllStripeCustomer() {
    return this._http.get('http://localhost:3000/allstripeCustomer', {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // create a customer



  // get all product

  getAllProducts() {
    return this._http.get('http://localhost:3000/getallproduct', {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // get all plans

  getAllPlans() {
    // pass the product id
    console.log("pass product id");
    return this._http.get('http://localhost:3000/getallplans', {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllPlansOfproduct() {
    // pass the product id
    console.log("pass product id");
    return this._http.get('http://localhost:3000/getallplans', {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  stripePayment(body: any) {


    console.log(body, "inside body of service");
    return this._http.post('http://localhost:3000/charge', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  stripePaymentSubscription(body: any) {


    console.log(body, "inside body of service");
    return this._http.post('http://localhost:3000/subscriptioncharge', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // get the invoices of the customer

  getCustomerInvoices(customerID) {
    let body = customerID
    console.log(body, "passing customer id");
    return this._http.get('http://localhost:3000/invoices/getallinvoices/:' + customerID, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });


  }

  // saving to local database

  saveInvoicetoMongod(body: any) {


    console.log(body, "inside body of service");
    return this._http.post('http://localhost:3000/invoice/recurring/subscription', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }



}
