const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: 'No items in order' });
    }

    let subtotal = 0;
    const populatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      populatedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
      subtotal += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: populatedItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      total: subtotal,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
