# 🚀 Quick Start Guide

## Prerequisites
- MongoDB installed and running
- Node.js installed

## 1. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

## 2. Start Backend Server
```bash
cd /Users/underxcore/Desktop/kavyacapstone/server
npm install  # First time only
npm start
```

Server will run on: **http://localhost:5000**

## 3. Start Frontend (New Terminal)
```bash
cd /Users/underxcore/Desktop/kavyacapstone/client
npm install  # First time only
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 4. Test the Application

### Create Account
1. Go to http://localhost:3000
2. Click "Contact" or go to `/auth`
3. Sign up with email and password
4. You'll be logged in automatically

### Test Cart/Saved Properties
1. Browse properties on the homepage
2. Click the **heart icon** on any property
3. Heart turns **red** = Property saved ✅
4. Check navbar - **cart badge** shows count
5. Click **heart again** to remove
6. Go to **Profile** to see all saved properties

### Features Working
- ✅ Password security with bcrypt (10 salt rounds)
- ✅ JWT authentication (7-day expiration)
- ✅ Add/remove properties to cart
- ✅ Real-time cart count updates
- ✅ Persistent cart state (survives refresh)
- ✅ Property search and filters
- ✅ User profile with saved properties

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -ti:5000

# Kill the process if needed
kill -9 $(lsof -ti:5000)

# Restart server
npm start
```

### MongoDB Connection Error
```bash
# Check MongoDB status
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb-community
```

### Frontend Error
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart
npm run dev
```

### Cart Not Saving
1. Make sure you're logged in (check for token in localStorage)
2. Check browser console for errors
3. Verify backend is running on port 5000
4. Check MongoDB is connected (server logs)

## Environment Variables

### Server (.env)
```bash
MONGO_URI=mongodb://127.0.0.1:27017/kavyacapstone
PORT=5000
JWT_SECRET=your_64_byte_secret_here
```

### Client (.env.local) - Optional
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires auth)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- Filters: `?search=`, `?location=`, `?type=`, `?bedrooms=`, `?minPrice=`, `?maxPrice=`

### Cart (All require authentication)
- `GET /api/cart` - Get saved properties
- `POST /api/cart` - Add property `{ propertyId: "1" }`
- `DELETE /api/cart/:propertyId` - Remove property
- `GET /api/cart/check/:propertyId` - Check if saved

## Project Structure
```
kavyacapstone/
├── server/               # Backend (Node.js + Express)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── config/          # Database config
│   └── data/            # Sample property data
│
├── client/              # Frontend (Next.js)
│   ├── app/            # Pages and components
│   │   ├── auth/       # Login/Signup
│   │   ├── profile/    # User profile
│   │   ├── landing/    # Homepage
│   │   └── properties/ # Property listing
│   └── components/     # Shared components
│
└── docs/               # Documentation
```

## Support
Check these files for detailed information:
- `CART_FIX_SUMMARY.md` - Cart system fixes
- `TESTING_GUIDE.md` - Security testing
- `server/README.md` - Backend documentation

Happy coding! 🎉
