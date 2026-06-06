const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create PayPal Order
router.post('/paypal/create', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    res.status(201).json({ success: true, amount: cart.total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Capture PayPal Order
router.post('/paypal/capture', protect, async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    const order = new Order({
      orderId: orderId,
      user: req.user.id,
      items: cart.items,
      totalAmount: cart.subtotal,
      discount: cart.discount,
      finalAmount: cart.total,
      paymentMethod: 'paypal',
      paymentStatus: 'completed',
      status: 'completed',
      completedAt: new Date()
    });

    await order.save();

    // Update product downloads and user purchases
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { sales: 1, downloads: item.quantity }
      });
    }

    // Clear cart
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [], total: 0 });

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
