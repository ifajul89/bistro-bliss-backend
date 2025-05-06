# 🍽️ Bistro Bliss | Backend

![Bistro Bliss](https://bistro-bliss-restaurant.netlify.app/)

## 📌 Live URL
[Bistro Bliss API](https://bistro-bliss-server.vercel.app/)

## 🌟 Overview
Bistro Bliss Backend is a robust and scalable API service that powers the Bistro Bliss restaurant management platform. Built with a modern Node.js/Express architecture and MongoDB, this RESTful API efficiently handles food inventory management, order processing, user authentication, and various restaurant operations.

## ✨ Key Features

- **🔐 JWT Authentication & Authorization**: Secure route protection with token-based authentication and role-based access control
- **🍽️ Food Management API**: Complete CRUD operations for food items with category management and filtering
- **📊 Order Processing System**: Efficient order placement, tracking, and management capabilities
- **🔍 Advanced Search & Filtering**: Sophisticated search functionality with MongoDB regex queries
- **📱 Pagination**: Server-side pagination for optimal data loading and performance
- **📈 Analytics-Ready Endpoints**: API endpoints that track order counts and identify top-selling items
- **🔄 Real-time Inventory Management**: Automatically updates food quantities upon order placement

## 🛠️ Technology Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel
- **API Testing**: Postman
- **Version Control**: Git & GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB account

### Installation

1. Clone the repository
```bash
git clone https://github.com/ifajul89/bistro-bliss-backend.git
cd bistro-bliss-server
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
DB_URI=your_mongodb_connection_string
ACCESS_TOKEN=your_jwt_secret_key
CLIENT_URL=your_frontend_url
```

4. Start the development server
```bash
npm run dev
```

## 📝 API Endpoints

### Authentication
- `POST /jwt` - Generate JWT token
- `POST /logout` - Clear authentication cookies

### Food Management
- `GET /foods` - Get all foods (with pagination and search)
- `GET /food/:id` - Get single food item details
- `POST /foods` - Add a new food item
- `PUT /food/:id` - Update a food item
- `GET /foods-count` - Get total count of food items
- `GET /top-foods` - Get top-selling food items
- `GET /my-added-foods` - Get foods added by a specific user

### Order Management
- `POST /carts` - Add item to cart/place order
- `GET /carts` - Get user's ordered items
- `DELETE /carts` - Remove item from cart

## 🔐 Security Features

- CORS configuration with specific origin allowance
- HTTP-only cookies for token storage
- Token verification middleware for protected routes
- Proper error handling and status codes
- Data validation before database operations

## 🌐 Deployment

The API is deployed on Vercel with continuous integration. The deployment configuration is handled via `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
```

## 📊 Performance Optimizations

- Database connection pooling
- Query optimization using MongoDB indexes
- Efficient data pagination
- Response compression
- Properly structured MongoDB schema

## 🧪 Future Enhancements

- Implement robust error logging system
- Add unit and integration tests
- Create detailed API documentation with Swagger
- Implement rate limiting and API throttling
- Add caching layer for frequently accessed data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Ifajul Islam - [@ifajul89](https://github.com/ifajul89)

Project Link: [https://github.com/ifajul89/bistro-bliss-backend](https://github.com/ifajul89/bistro-bliss-backend)

---

⭐ Star this repository if you find it useful! 