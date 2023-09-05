const path = require('path');
const { AuthorizationKey } = require('../secret');

const paymentOptions = {
  return_url: 'http://localhost:4050/successfull-payment',
  website_url: 'http://localhost:4050/',
  amount: 700 * 100,
  purchase_order_id: 'Order-191806',
  purchase_order_name: 'Buying Dlsr  and Shoe',
  customer_info: {
    name: 'Rahul Dotel',
  },
  product_details: [
    {
      identity: '2398y238575',
      unit_price: 200,
      name: 'Jordan Air',
      total_price: 200,
      quantity: 1,
    },
    {
      identity: 'fsdfdsfdsfd',
      unit_price: 500,
      name: 'DSLR Camera',
      total_price: 500,
      quantity: 1,
    },
  ],
};

exports.MakePayment = async (req, res) => {
  try {
    const paymentInitiatedPromise = await fetch(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      {
        method: 'POST',
        headers: {
          Authorization: AuthorizationKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentOptions),
      }
    );
    const paymentInitiatedResponse = await paymentInitiatedPromise.json();
    res.status(200).json(paymentInitiatedResponse);
  } catch (err) {
    console.log(err.message);
  }
};

exports.landingPage = (req, res) => {
  const landingPagePath = path.resolve(
    __dirname,
    '..',
    'views',
    'LandingPage.html'
  );
  res.sendFile(landingPagePath);
};

exports.SuccessfullPaymentPage = (req, res) => {
  res.send(
    `
    <html>
      <head>Payment successfull</head>
      <body>
        <h1>Transaction-Id : ${req.query.transaction_id}</h1>
        <p>status: ${req.query.status}</p>
        <p>Purchase order id: ${req.query.purchase_order_id}</p>
        <p>Purchase order name: ${req.query.purchase_order_name}</p>
      </body>
    </html>
    `
  );
};
