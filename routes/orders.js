const express = require('express');
const Order = require('../models/Order');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get user orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.productId');
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single order
router.get('/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      user: req.user.id
    }).populate('items.productId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (Admin only)
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.productId');

    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download product
router.post('/:orderId/download/:productId', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      user: req.user.id
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const downloadLink = order.downloadLinks.find(
      link => link.productId.toString() === req.params.productId
    );

    if (!downloadLink) {
      return res.status(404).json({ error: 'Product not found in order' });
    }

    // Check if download link is expired
    if (downloadLink.expiresAt && new Date() > downloadLink.expiresAt) {
      return res.status(400).json({ error: 'Download link expired' });
    }

    // Increment download count
    downloadLink.downloadsCount += 1;
    await order.save();

    res.status(200).json({ 
      success: true, 
      downloadUrl: downloadLink.downloadUrl,
      expiresIn: downloadLink.expiresAt ? (downloadLink.expiresAt - new Date()) / 1000 : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Request refund
router.post('/:orderId/refund', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      user: req.user.id
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'refunded') {
      return res.status(400).json({ error: 'Order already refunded' });
    }

    order.status = 'refunded';
    order.paymentStatus = 'refunded';
    await order.save();

    res.status(200).json({ success: true, message: 'Refund request submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
