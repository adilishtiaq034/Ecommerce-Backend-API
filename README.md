# 🛒 E-Commerce Backend API

A RESTful E-Commerce Backend API built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project provides the core backend functionality required for an e-commerce application, including user authentication, role-based authorization, product management, shopping cart functionality, order management, stock control, and order status management.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- User and Admin roles
- Role-based access control

### 📦 Product Management

- Create products
- Get all products
- Get a single product by ID
- Update products
- Delete products
- Product validation
- Stock management

### 🛒 Shopping Cart

- Add products to cart
- Get user's cart
- Update product quantity
- Remove products from cart
- Prevent adding non available products

### 📋 Order Management

- Create orders from cart
- View user's orders
- View a specific order
- Cancel pending orders
- Update order status
- Automatic stock deduction when an order is created
- Restore stock when an order is cancelled
- Automatically clear cart after successful order creation

### 👨‍💼 Admin Features

- Admin-only routes
- Update order status
- Manage products
- Role-based authorization

### ⚠️ Error Handling

- Centralized error handling
- Appropriate HTTP status codes
- Validation and authentication error responses

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Postman | API testing |
| dotenv | Environment variables |

---

## 📁 Project Structure

```text
ecommerce-backend/
│
├── controllers/
│   ├── user-controller.js
│   ├── product-controller.js
│   ├── cart-controller.js
│   └── order-controller.js
│
├── middleware/
│   ├── auth-middleware.js
│   ├── admin-middleware.js
│   └── error-middleware.js
│
├── models/
│   ├── user-model.js
│   ├── product-model.js
│   ├── cart-model.js
│   └── order-model.js
│
├── routers/
│   ├── user-router.js
│   ├── product-router.js
│   ├── cart-router.js
│   └── order-router.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md