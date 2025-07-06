# Greenbite Deployment Guide

## Issues Found and Fixed

### 1. API Route Mismatch (FIXED)
**Problem**: Client was calling `/auth/register` but server expected `/api/auth/register`

**Solution**: Updated all client-side API calls to include the `/api` prefix:
- `/auth/register` → `/api/auth/register`
- `/auth/login` → `/api/auth/login`
- `/auth/me` → `/api/auth/me`
- `/food` → `/api/food`
- `/food/:id` → `/api/food/:id`

### 2. Environment Variables Required for Render

Make sure to set these environment variables in your Render dashboard:

```
PORT=5000 (or let Render set it automatically)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
```

### 3. Server Configuration

The server is properly configured with:
- CORS enabled for cross-origin requests
- MongoDB connection with fallback
- JWT authentication middleware
- Proper error handling

## Deployment Steps

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT signing
   - `PORT`: Let Render set this automatically

### Frontend (Render or Vercel)
1. Set build command: `npm install && npm run build`
2. Set output directory: `build`
3. Set environment variables if needed

## Testing the Fix

After deploying with these changes:

1. **Registration**: Should work at `/api/auth/register`
2. **Login**: Should work at `/api/auth/login`
3. **Food Management**: All food-related API calls now use `/api/food`

## Common Issues

1. **CORS Errors**: Make sure your frontend URL is allowed in CORS configuration
2. **MongoDB Connection**: Verify your MongoDB URI is correct and accessible
3. **JWT Issues**: Ensure JWT_SECRET is set and consistent

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Food Management
- `GET /api/food` - Get all food posts
- `POST /api/food` - Create new food post
- `PATCH /api/food/:id/status` - Update food status
- `DELETE /api/food/:id` - Delete food post 