# Testing Guide - Authentication & Cart System

## ✅ Security Features Implemented

### 1. **Password Security with bcrypt**
- **Location**: `server/routes/auth.js`
- **Implementation**:
  ```javascript
  // Signup - hashing with salt
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  
  // Login - comparing hashed passwords
  const isMatch = await bcrypt.compare(password, user.password);
  ```
- **Salt Rounds**: 10 (industry standard)
- **Library**: `bcryptjs` v2.4.3

### 2. **JWT Authentication**
- **Location**: `server/routes/auth.js`, `server/middleware/auth.js`
- **Features**:
  - Token signing with secret key
  - 7-day expiration
  - Token validation on protected routes
  - Automatic token refresh on login
- **Secret**: Stored in `.env` file (64-byte random string)

### 3. **Protected Routes**
All cart operations require authentication:
- `GET /api/cart` - Get saved properties
- `POST /api/cart` - Add property
- `DELETE /api/cart/:id` - Remove property
- `GET /api/cart/check/:id` - Check if property is saved
- `GET /api/auth/me` - Get user profile

## 🧪 Testing the System

### Prerequisites
```bash
# 1. Install MongoDB (if not already installed)
brew install mongodb-community

# 2. Start MongoDB
brew services start mongodb-community

# 3. Copy environment file
cd server
cp .env.example .env

# 4. Install dependencies
npm install
```

### Step 1: Start the Server
```bash
cd server
npm run dev
```

Server should start on `http://localhost:5000`

### Step 2: Test Authentication

#### Test Signup (bcrypt hashing)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

**Verify in MongoDB**:
```bash
mongosh
use kavyacapstone
db.users.find().pretty()
```
You should see the password is hashed (not plain text).

#### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Test Invalid Password
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "wrongpassword"
  }'
```
**Expected**: `{"message": "Invalid credentials"}`

### Step 3: Test Protected Routes

#### Get User Profile (with token)
```bash
# Replace YOUR_TOKEN with the token from signup/login
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Try Without Token (should fail)
```bash
curl -X GET http://localhost:5000/api/auth/me
```
**Expected**: `{"message": "No token"}`

### Step 4: Test Cart System

#### Add Property to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"propertyId": "1"}'
```

#### Get Saved Properties
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Check if Property is Saved
```bash
curl -X GET http://localhost:5000/api/cart/check/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Remove Property
```bash
curl -X DELETE http://localhost:5000/api/cart/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Step 5: Test Frontend Integration

```bash
# Start frontend (in another terminal)
cd client
npm install
npm run dev
```

Visit `http://localhost:3000`:

1. **Signup Flow**:
   - Click "Contact Us Now"
   - Switch to "Sign Up"
   - Fill form and submit
   - ✅ Password is hashed with bcrypt on backend
   - ✅ JWT token stored in localStorage
   - ✅ Redirected to properties page

2. **Login Flow**:
   - Go to `/auth`
   - Enter credentials
   - ✅ Password compared with bcrypt
   - ✅ JWT token stored
   - ✅ User state appears in navbar

3. **Cart Flow**:
   - Browse properties
   - Click heart icon on any property
   - ✅ JWT sent in Authorization header
   - ✅ Property saved to database
   - ✅ Heart icon fills
   - ✅ Cart count updates in navbar
   - Visit `/profile`
   - ✅ See saved properties
   - Click trash icon to remove

## 🔒 Security Best Practices Implemented

### ✅ Password Security
- [x] Passwords hashed with bcrypt (10 salt rounds)
- [x] Plain text passwords never stored
- [x] Passwords never returned in API responses

### ✅ JWT Security
- [x] Secret key stored in environment variable
- [x] 64-byte random secret generated with OpenSSL
- [x] Token expiration (7 days)
- [x] Token verification on every protected request

### ✅ API Security
- [x] Auth middleware validates all protected routes
- [x] User can only access their own data
- [x] CORS enabled for cross-origin requests
- [x] Input validation on all endpoints

### ✅ Data Security
- [x] MongoDB indexes for unique constraints
- [x] Passwords excluded from query results
- [x] User ID from JWT (not from request body)

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  createdAt: Date
}
```

### Cart Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  propertyId: String (supports both ObjectId and numeric IDs),
  addedAt: Date
}
```

## 🐛 Troubleshooting

### Issue: "No token" error
**Solution**: Make sure you're sending the token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Issue: "Invalid credentials"
**Solution**: 
- Check password is correct
- Verify user exists in database
- Check bcrypt is installed: `npm list bcryptjs`

### Issue: Saved properties not showing
**Solution**:
- Check MongoDB is running
- Verify token is valid
- Check browser console for errors
- Verify propertyId format (should be string)

### Issue: Cart operations fail
**Solution**:
- Make sure you're logged in
- Check token in localStorage/sessionStorage
- Verify backend server is running
- Check MongoDB connection

## 📝 Environment Variables

Create `.env` file in `server/` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/kavyacapstone
PORT=5000
JWT_SECRET="your-64-byte-random-secret-here"
```

Generate a secure JWT secret:
```bash
openssl rand -base64 64
```

## ✨ Features Summary

1. **Authentication**: Signup, login, JWT tokens, bcrypt password hashing
2. **Authorization**: Protected routes, user-specific data access
3. **Cart System**: Save properties, view saved items, remove items
4. **Search**: Filter properties by location, type, bedrooms, price
5. **Profile**: View user info, manage saved properties
6. **Security**: Bcrypt hashing, JWT validation, environment variables

All security best practices are implemented and ready for production use!
