const express = require('express');
const router = express.Router();
const {
  landingPage,
  MakePayment,
  SuccessfullPaymentPage,
} = require('../controller/Payment.controller');

router.get('/', landingPage);
router.post('/pay', MakePayment);
router.get('/successfull-payment', SuccessfullPaymentPage);

module.exports = router;
