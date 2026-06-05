require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  { name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.', price: 79.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', stock: 50, rating: 4.5 },
  { name: 'Running Shoes', description: 'Lightweight running shoes with responsive cushioning for everyday training.', price: 129.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', stock: 30, rating: 4.3 },
  { name: 'Smart Watch', description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life.', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', stock: 25, rating: 4.7 },
  { name: 'Cotton T-Shirt', description: 'Premium 100% organic cotton t-shirt. Comfortable and breathable.', price: 24.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', stock: 100, rating: 4.1 },
  { name: 'Backpack', description: 'Durable 40L travel backpack with padded laptop compartment.', price: 59.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', stock: 40, rating: 4.4 },
  { name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness and color temperature.', price: 34.99, category: 'Home', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop', stock: 60, rating: 4.2 },
  { name: 'Coffee Maker', description: 'Programmable 12-cup coffee maker with built-in grinder.', price: 89.99, category: 'Home', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop', stock: 20, rating: 4.6 },
  { name: 'Yoga Mat', description: 'Extra thick 6mm non-slip yoga mat with carrying strap.', price: 29.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', stock: 80, rating: 4.0 },
  { name: 'Sunglasses', description: 'Polarized UV400 sunglasses with lightweight titanium frame.', price: 49.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', stock: 45, rating: 4.3 },
  { name: 'Bluetooth Speaker', description: 'Portable waterproof Bluetooth speaker with 360-degree sound.', price: 44.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', stock: 35, rating: 4.5 },
  { name: 'Denim Jacket', description: 'Classic denim jacket with a modern slim fit.', price: 69.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', stock: 25, rating: 4.2 },
  { name: 'Notebook Set', description: 'Set of 3 premium hardcover notebooks, lined, 200 pages each.', price: 19.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=400&h=400&fit=crop', stock: 90, rating: 4.8 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    const adminExists = await User.findOne({ email: 'admin@shop.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@shop.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@shop.com / admin123');
    }

    const userExists = await User.findOne({ email: 'user@shop.com' });
    if (!userExists) {
      await User.create({
        name: 'Test User',
        email: 'user@shop.com',
        password: 'user123',
      });
      console.log('Test user created: user@shop.com / user123');
    }

    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
