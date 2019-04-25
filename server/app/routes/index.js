const UserRoutes = require('./user-routes');
const InvoiceRoutes = require('./invoice-routes');
// const stripeRoutes = require('./stripe-routes');
module.exports = (app) => {
  app.use(UserRoutes,
    InvoiceRoutes);





  // app.use(stripeRoutes);
};
