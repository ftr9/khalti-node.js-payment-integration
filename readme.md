## Khalti Payment Integration steps

## How Khalti payment works ?

[X] User visits the merchant's website to make some purchase
A unique purchase_order_id is generated at merchant's system
Payment request is made to Khalti providing the purchase_order_id, amount in paisa and return_url
User is redirected to the epayment portal (eg. https://pay.khalti.com)
After payment is made by the user, a successful callback is made to the return_url
The merchant website can optionally confirm the payment received
The merchant website then proceeds other steps after payment confirmation

### 1) Create a merchant account and grab api key from portal

![Screenshot 2023-09-05 174230](https://github.com/ftr9/khalti-payment-integration-demo/assets/60734475/f0f93d56-8261-4e2b-96cd-b135fd11b2c0)

### 2) initiate a payment request to /epayment/initiate/ from frontend to backend with a following payload details

![image](https://github.com/ftr9/khalti-payment-integration-demo/assets/60734475/c6a00dea-1dc9-410c-87c9-65bee77ba997)

```
exports.MakePayment = async (req, res) => {
  try {
    const paymentInitiatedPromise = await fetch(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      {
        method: 'POST',
        headers: {
          Authorization: ApiKeyGrabedFromMerchantAccount,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        }),
      }
    );
    const paymentInitiatedResponse = await paymentInitiatedPromise.json();
    res.status(200).json(paymentInitiatedResponse);
  } catch (err) {
    console.log(err.message);
  }
};
```

### 3) Payment initiation returns following response

![image](https://github.com/ftr9/khalti-payment-integration-demo/assets/60734475/7247d59f-17c5-47e1-b192-04e87b98160c)

After getting the success response, the user should be redirected to the payment_url obtained in the success response.

### 4) Payment Success callback

After the user completes the payment, the success response is obtained in the return URL specified during payment initiate.

User must be redirected to return_url with following json

![image](https://github.com/ftr9/khalti-payment-integration-demo/assets/60734475/970a9c6b-a004-4f4a-a8e9-ad5634a95987)

This ensures payment has been verified and completed
