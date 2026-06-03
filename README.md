# 🧊 ProductViz Dashboard — MERN Stack

A full-stack Product Visualization Dashboard built with MongoDB, Express.js, React.js, and Node.js — featuring Three.js 3D product visualization.

---

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── controllers/
│   │   └── productController.js    ← Business logic for all 3 APIs
│   ├── models/
│   │   └── Product.js              ← Mongoose schema
│   ├── routes/
│   │   └── productRoutes.js        ← Express route definitions
│   ├── .env                        ← Environment variables
│   └── server.js                   ← Express app entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.js            ← Top navigation bar
        │   ├── ProductCard.js       ← Product list card UI
        │   └── ThreeScene.js        ← Three.js 3D scene (BONUS: OrbitControls + Texture)
        ├── pages/
        │   ├── ProductListPage.js   ← Lists all products (BONUS: search)
        │   ├── AddProductPage.js    ← Form to add a new product
        │   └── ProductDetailPage.js ← Product info + Three.js scene
        ├── services/
        │   └── api.js               ← Axios API service layer
        └── App.js                   ← React Router setup
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js >= 16
- MongoDB running locally on port 27017
- npm

---

### Backend Setup

```bash
cd project-root/backend
npm install
# (Optional) Edit .env to set your MONGODB_URI
npm start
# → Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd project-root/frontend
npm install
npm start
# → App runs on http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/products`       | Get all products         |
| GET    | `/api/products?search=chair` | Search products by name |
| GET    | `/api/products/:id`   | Get product by ID        |
| POST   | `/api/products`       | Create a new product     |

### Sample POST Request

```json
{
  "name": "Wooden Chair",
  "category": "Furniture",
  "price": 2999,
  "description": "Modern wooden chair with ergonomic design"
}
```

---

## 🗂️ MongoDB Schema

```js
{
  name:        String   (required),
  category:    String   (required),
  price:       Number   (required, min: 0),
  description: String   (required),
  createdAt:   Date     (default: now)
}
```

---

## ✨ Features

### Core Features
- ✅ Product listing with responsive grid
- ✅ Add product form with validation
- ✅ Product detail page
- ✅ Three.js 3D scene with rotation animation + lighting

### Bonus Features Implemented
- ✅ **Search** — Real-time debounced search by product name (MongoDB regex)
- ✅ **Orbit Controls** — Drag to orbit, scroll to zoom the 3D object
- ✅ **Texture Mapping** — Canvas-generated gradient + grid texture applied to 3D mesh
- ✅ **Category-aware geometry** — Different 3D shapes per product category

---

## 🎨 Tech Stack

| Layer     | Technology                       |
|-----------|----------------------------------|
| Backend   | Node.js, Express.js, Mongoose    |
| Database  | MongoDB                          |
| Frontend  | React 18, React Router v6, Axios |
| 3D Scene  | Three.js (OrbitControls, Canvas Texture) |
| Styling   | Custom CSS with CSS Variables    |

---

## 📸 Pages

1. **Product Listing** (`/`) — Grid of product cards with search bar
2. **Add Product** (`/add`) — Form with validation, connects to POST API
3. **Product Detail** (`/products/:id`) — Full details + Three.js 3D viewer
