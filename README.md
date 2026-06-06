# E-Commerce Website

## Overview

A full-stack e-commerce platform that enables users to browse products, manage shopping carts, and place orders online. The application provides separate functionalities for customers and administrators, ensuring a smooth shopping experience and efficient product management.

## Features

### User Features

* User Registration and Login
* Secure Authentication
* Browse Products
* Search and Filter Products
* Add Products to Cart
* Place Orders
* View Order History

### Admin Features

* Admin Dashboard
* Add Products
* Update Products
* Delete Products
* Manage Orders
* Manage Users

## Technologies Used

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

## Installation

### Prerequisites

* Node.js
* MongoDB
* npm

### Clone Repository

```bash
git clone <repository-url>
cd ecommerce-website
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
npm start
```

### Run Frontend

```bash
cd client
npm start
```

## Project Structure

```text
ecommerce-website/
│
├── client/
│   ├── src/
│   ├── public/
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│
├── package.json
└── README.md
```

## Usage

1. Register or login.
2. Browse products.
3. Add items to cart.
4. Place orders.
5. Admin can manage products and orders.

## Future Enhancements

* Payment Gateway Integration
* Wishlist Feature
* Product Reviews and Ratings
* Email Notifications
* Order Tracking System

