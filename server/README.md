# Kavya Capstone — Server

This folder contains a Node/Express backend for the Kavya Capstone project with full authentication and property management.

## 🔒 Security Features

### Password Security
- **bcrypt hashing** with 10 salt rounds
- Passwords never stored in plain text
- Secure password comparison on login
- Passwords excluded from all API responses

### JWT Authentication
- Token-based authentication with 7-day expiration
- Secret key stored in environment variables (64-byte random string)
- All sensitive routes protected with auth middleware
- User ID extracted from token (not request body)

### API Security
- CORS enabled for cross-origin requests
- Input validation on all endpoints
- Protected routes require valid JWT
- Users can only access their own data

## Quick start

1. Copy `.env.example` to `.env` and set values:

```bash
cp .env.example .env
```

Required environment variables:
- `MONGO_URI` - MongoDB connection string (default: `mongodb://127.0.0.1:27017/kavyacapstone`)
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - 64-byte random secret (generate with: `openssl rand -base64 64`)

2. Install dependencies and start server:

```bash
npm install
npm run dev
```

3. (Optional) Seed sample properties into MongoDB:

```bash
npm run seed
```

## API endpoints

### Authentication (with bcrypt + JWT)
- **POST** `/api/auth/signup` - Create account with hashed password
  ```json
  { "name": "John Doe", "email": "john@example.com", "password": "secure123" }
  ```
  Returns: `{ "token": "...", "user": {...} }`

- **POST** `/api/auth/login` - Login with password verification
  ```json
  { "email": "john@example.com", "password": "secure123" }
  ```
  Returns: `{ "token": "...", "user": {...} }`

- **GET** `/api/auth/me` - Get current user (protected)
  - Header: `Authorization: Bearer <token>`

### Properties
- **GET** `/api/properties` - Get all properties with optional filters
  - Query params: `?search=`, `?location=`, `?type=`, `?bedrooms=`, `?minPrice=`, `?maxPrice=`
- **GET** `/api/properties/:id` - Get single property

### Cart / Saved Properties (all protected)
- **GET** `/api/cart` - Get user's saved properties
- **POST** `/api/cart` - Add property to cart
  ```json
  { "propertyId": "1" }
  ```
- **DELETE** `/api/cart/:propertyId` - Remove property from cart
- **GET** `/api/cart/check/:propertyId` - Check if property is saved

## Security Implementation Details

### Password Hashing (bcrypt)
```javascript
// Signup
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);

// Login
const isMatch = await bcrypt.compare(password, user.password);
```

### JWT Token Creation
```javascript
const token = jwt.sign(
  { id: user._id }, 
  process.env.JWT_SECRET, 
  { expiresIn: '7d' }
);
```

### Auth Middleware
```javascript
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.userId = decoded.id;
```

## Database Models

### User
- `name` - String
- `email` - String (unique, required)
- `password` - String (bcrypt hashed, required)
- `createdAt` - Date

### Property
- `title`, `location`, `type` - String
- `bedrooms`, `bathrooms` - Number
- `area`, `price`, `description` - String
- `features` - Array of strings
- `images` - Array of strings
- `createdAt` - Date

### Cart
- `userId` - ObjectId (ref: User)
- `propertyId` - String (supports both ObjectId and numeric IDs)
- `addedAt` - Date
- Unique index: (userId, propertyId)

## Notes & next steps

- ✅ bcrypt password hashing implemented with 10 salt rounds
- ✅ JWT authentication with secure secret key
- ✅ All cart endpoints require authentication
- ✅ Hybrid cart system works with both DB and sample properties
- ✅ Search and filter functionality for properties
- Frontend imports `app/data/properties.js` — to use backend exclusively, replace with API fetch calls
- Can add: password reset flow, refresh tokens, rate limiting, Redis caching

## Testing

See `TESTING_GUIDE.md` in the root directory for comprehensive testing instructions including:
- Password security verification
- JWT token testing
- Cart system testing
- Frontend integration testing

## Development Dependencies

```json
{
  "bcryptjs": "^2.4.3",    // Password hashing
  "jsonwebtoken": "^9.0.0", // JWT tokens
  "mongoose": "^7.4.0",     // MongoDB ODM
  "express": "^4.18.2",     // Web framework
  "cors": "^2.8.5",         // CORS support
  "dotenv": "^16.3.1"       // Environment variables
}
```

All security best practices implemented and ready for production! 🔒
