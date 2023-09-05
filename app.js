const express = require('express');
const app = express();

const KhaltiPaymentRoutes = require('./routes/KhaltiPayment.routes');
app.use('/', KhaltiPaymentRoutes);

module.exports = app;
