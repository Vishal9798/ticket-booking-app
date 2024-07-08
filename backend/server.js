// // backend/server.js
// const express = require('express');
// const Razorpay = require('razorpay');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const razorpay = new Razorpay({
//   key_id: 'rzp_test_Dz0lheeiwtdaB1',
//   key_secret: 'FcA6wA02jNxGdlYJqqyldz7I',
// });

// app.post('/create-order', async (req, res) => {
//   const { amount } = req.body;
//   const options = {
//     amount: amount * 100, // amount in the smallest currency unit
//     currency: 'INR',
//     receipt: 'receipt#1',
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_test_Dz0lheeiwtdaB1', // Replace with your Razorpay Key ID
  key_secret: 'FcA6wA02jNxGdlYJqqyldz7I' // Replace with your Razorpay Key Secret
});

app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'order_rcptid_11'
  };
  try {
    const order = await razorpay.orders.create(options);
    console.log('Order created:', order); // Log the order for debugging
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error); // Log the error to see what went wrong
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
