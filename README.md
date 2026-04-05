# 🛒 E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features role-based access control, product management, shopping cart, order processing, and an admin dashboard.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Folder Structure](#-folder-structure)
- [Challenges & Solutions](#-challenges--solutions)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## ✨ Features

### 👤 User Features
- **Authentication** — Secure registration and login with JWT tokens
- **Product Browsing** — View and search available products
- **Shopping Cart** — Add, update, and remove items from cart
- **Checkout & Orders** — Complete purchases and track order history
- **User Profile** — Manage personal account information

### 🔐 Admin Features
- **Admin Dashboard** — Centralized management interface
- **Product Management** — Create, edit, and delete products with image uploads
- **Category Management** — Organize products into categories
- **User Management** — View all users, modify roles, and delete accounts
- **Order Management** — View and update order statuses

### 🛡️ Security Features
- Password hashing with `bcryptjs`
- JWT-based authentication with token expiration
- Role-based access control (Admin/User)
- Protected API routes with middleware

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Library |
| Redux Toolkit | State Management |
| React Router v7 | Client-side Routing |
| Tailwind CSS v4 | Styling |
| Axios | HTTP Client |
| React Hot Toast | Notifications |
| React Icons | Icon Library |
| Vite | Build Tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js v5 | Web Framework |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Multer + Cloudinary | File Upload & Storage |
| CORS | Cross-Origin Resource Sharing |
| Nodemon | Development Server |

### Tools & Services
- **Cloudinary** — Cloud-based image storage and management
- **Vercel** — Deployment platform (backend configured via `vercel.json`)
- **Concurrently** — Run frontend and backend servers simultaneously

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React)                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │
│  │  Pages   │  │Components│  │  Redux Store      │ │
│  │  (Routes)│  │   (UI)   │  │  (State Mgmt)     │ │
│  └────┬─────┘  └────┬─────┘  └─────────┬─────────┘ │
│       └──────────────┴──────────────────┘           │
│                          │                          │
│                    Axios Calls                      │
└──────────────────────────┬──────────────────────────┘
                           │
                    HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────┐
│                   Backend (Express)                  │
│  ┌──────────┐  ┌────────────┐  ┌────────────────┐  │
│  │  Routes  │→ │ Middleware │→ │  Controllers   │  │
│  │          │  │ (Auth/Role)│  │  (Business     │  │
│  │          │  │            │  │   Logic)       │  │
│  └──────────┘  └────────────┘  └────────┬───────┘  │
│                                         │          │
│                                    Models          │
│                                  (DB Schema)       │
└─────────────────────────────────────────┬──────────┘
                                          │
                                   MongoDB Atlas
                                          │
                                  ┌───────▼───────┐
                                  │   Cloudinary   │
                                  │  (Images)      │
                                  └───────────────┘
```

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **Yarn** or **npm** package manager
- **MongoDB** database (local or Atlas)
- **Cloudinary** account for image storage

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-commerence
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   yarn install

   # Install backend dependencies
   cd Backend
   yarn install

   # Install frontend dependencies
   cd ../frontend
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `Backend/` directory (see [Environment Variables](#-environment-variables))

4. **Run the application**
   ```bash
   # From the root directory
   yarn dev
   ```
   
   This starts both the backend (port 5000) and frontend (port 5173) simultaneously.

   **Or run separately:**
   ```bash
   # Backend only
   cd Backend
   yarn start

   # Frontend only
   cd frontend
   yarn dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 🔑 Environment Variables

Create a `.env` file in the `Backend/` directory with the following variables:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ **Never commit `.env` files to version control.** Add it to `.gitignore`.

---

## 📖 Usage Guide

### First-Time Setup

1. **Register a new account** at `/register`
2. **Create an admin user:**
   - Register a normal account first
   - Use the provided `update_admin.js` script to promote a user to admin:
     ```bash
     node update_admin.js <username_or_email>
     ```

### User Roles

| Role | Permissions |
|------|-------------|
| **User** | Browse products, manage cart, place orders, view order history |
| **Admin** | All user permissions + manage products, categories, users, and orders |

### Common Workflows

**🛍️ Shopping Flow:**
1. Browse products on the home page
2. Add items to cart
3. Review cart and proceed to checkout
4. Complete order with shipping details
5. Track orders in the Orders section

**🔐 Admin Flow:**
1. Log in with admin credentials
2. Access admin dashboard at `/admin`
3. Manage products, categories, users, and orders

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Admin | Create product (with image upload) |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Categories
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/categories` | Public | Get all categories |
| POST | `/api/categories` | Admin | Create category |
| PUT | `/api/categories/:id` | Admin | Update category |
| DELETE | `/api/categories/:id` | Admin | Delete category |

### Cart
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/cart/add` | User | Add item to cart |
| GET | `/api/cart` | User | Get user's cart |
| DELETE | `/api/cart/remove/:productId` | User | Remove item from cart |

### Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/orders` | User | Create order |
| GET | `/api/orders/my-orders` | User | Get user's orders |
| GET | `/api/orders/history` | User | Get user's order history |
| GET | `/api/orders/:id` | User | Get order by ID |
| PUT | `/api/orders/:id/pay` | User | Mark order as paid |
| GET | `/api/orders` | Admin | Get all orders |
| PUT | `/api/orders/:id/status` | Admin | Update order status |
| GET | `/api/orders/admin/history` | Admin | Get all orders history |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/dashboard` | Admin | Access admin dashboard |
| GET | `/api/admin/user` | Admin | Get all users |
| PUT | `/api/admin/user/:id` | Admin | Update user role |
| DELETE | `/api/admin/user/:id` | Admin | Delete user |

### User
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/user/profile` | User | Get user profile |

---

## 📸 Screenshots

> _Add screenshots here_

| Home Page | Product Listing | Cart |
|-----------|----------------|------|
| ![Home](./screenshots/home.png) | ![Products](./screenshots/products.png) | ![Cart](./screenshots/cart.png) |

| Admin Dashboard | Order Management |
|-----------------|------------------|
| ![Admin](./screenshots/admin.png) | ![Orders](./screenshots/orders.png) |

---

## 🚀 Live Demo

> _Add live demo URL here if deployed_

- **Frontend:** `https://your-frontend-url.vercel.app`
- **Backend:** `https://your-backend-url.vercel.app`

---

## 📁 Folder Structure

```
E-commerence/
├── Backend/                    # Express.js backend
│   ├── config/                 # Configuration files
│   ├── controllers/            # Request handlers
│   │   ├── cartController.js
│   │   ├── categoryController.js
│   │   └── orderController.js
│   ├── middleware/             # Custom middleware
│   │   ├── authMiddleware.js   # JWT authentication
│   │   ├── roleMiddleware.js   # Role-based access
│   │   └── uploadMiddleware.js # Multer + Cloudinary
│   ├── models/                 # MongoDB schemas
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── orderModel.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/                 # API route definitions
│   ├── utils/                  # Utility functions
│   │   └── cloudinary.js
│   ├── server.js               # Entry point
│   └── vercel.json             # Vercel deployment config
│
├── frontend/                   # React + Vite frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, fonts, etc.
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Layout/         # Navbar, Footer, etc.
│   │   │   ├── Product/        # Product cards, etc.
│   │   │   ├── Search/         # Search components
│   │   │   └── UI/             # Generic UI elements
│   │   ├── constants/          # App-wide constants
│   │   ├── dashboards/         # Dashboard-specific components
│   │   ├── pages/              # Route-level components
│   │   │   ├── Admin/          # Admin pages
│   │   │   ├── Auth/           # Login/Register
│   │   │   ├── Cart/
│   │   │   ├── Checkout/
│   │   │   ├── Home/
│   │   │   ├── Orders/
│   │   │   ├── Products/
│   │   │   └── User/
│   │   ├── redux/              # Redux state management
│   │   │   ├── slices/         # Redux Toolkit slices
│   │   │   └── store.js
│   │   ├── services/           # API service functions
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   └── vite.config.js
│
├── update_admin.js             # Script to promote user to admin
├── update_admin.py             # Python alternative for admin promotion
└── package.json                # Root package configuration
```

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **Role-Based Access Control** | Implemented custom middleware to verify user roles on protected routes |
| **Image Upload & Storage** | Integrated Cloudinary with Multer for seamless cloud-based image management |
| **State Management** | Used Redux Toolkit for predictable state handling across cart, auth, products, and orders |
| **Protected Routes** | Created custom React components (`ProtectedRoute`, `AdminRoute`) to guard routes based on authentication and role |
| **Concurrent Development** | Set up `concurrently` to run frontend and backend servers with a single command |

---

## 🚧 Future Improvements

- [ ] **Payment Gateway Integration** — Stripe, PayPal, or local payment processors
- [ ] **Product Reviews & Ratings** — Allow users to review purchased products
- [ ] **Advanced Search & Filtering** — Category, price range, and keyword filters
- [ ] **Wishlist Feature** — Save products for later
- [ ] **Email Notifications** — Order confirmations and status updates
- [ ] **Inventory Alerts** — Low stock notifications for admin
- [ ] **Analytics Dashboard** — Sales reports and visualizations for admin
- [ ] **Mobile Responsiveness Improvements** — Enhanced mobile-first design
- [ ] **Testing Suite** — Unit and integration tests with Jest/React Testing Library
- [ ] **CI/CD Pipeline** — Automated testing and deployment workflows

---

## 👤 Author

**Muhammad Noman**

- GitHub: [github.com/muhammadnoman](https://github.com/muhammadnoman)

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  <em>If you found this project helpful, consider giving it a ⭐ on GitHub!</em>
</p>
