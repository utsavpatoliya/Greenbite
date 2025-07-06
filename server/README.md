# 🍽️ Waste Food Management Platform

A full-stack web application that connects restaurants/caterers with NGOs to reduce food waste. Restaurants can upload food donations, and NGOs can verify and accept/reject them.

## 🚀 Features

### For Restaurants/Caterers:
- Register and login with email/password
- Upload food donation cards with details (food type, quantity, address, contact, expiry time)
- View all their food posts and their current status
- Delete pending food posts
- Real-time status updates from NGOs

### For NGOs:
- Register and login with email/password
- View all available food donations from restaurants
- Verify food details and accept/reject donations
- Add notes when accepting/rejecting
- Track response history

## 🛠️ Tech Stack

### Backend:
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend:
- **React.js** with functional components and hooks
- **React Router** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **CSS3** with modern styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd waste-food-management
```

### 2. Install dependencies
```bash
npm run install-all
```

### 3. Environment Setup
Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/waste-food-management
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

### 5. Run the application
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

## 📱 Usage

### 1. Registration
- Visit `http://localhost:3000`
- Click "Sign up here" to register
- Choose account type: Restaurant/Caterer or NGO
- Fill in all required details

### 2. Restaurant Workflow
1. **Login** with your credentials
2. **Upload Food Donation** by clicking "Add Food Donation"
3. **Fill Details**: Food type, quantity, address, contact, expiry time
4. **Submit** and wait for NGO response
5. **Track Status** of your donations

### 3. NGO Workflow
1. **Login** with your credentials
2. **Browse Food Donations** from all restaurants
3. **Review Details** of each donation
4. **Accept/Reject** with optional notes
5. **Track Response History**

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Food Management
- `POST /api/food` - Create food post (Restaurant only)
- `GET /api/food` - Get food posts (filtered by user type)
- `GET /api/food/:id` - Get specific food post
- `PATCH /api/food/:id/status` - Update status (NGO only)
- `DELETE /api/food/:id` - Delete food post (Restaurant only)

## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface
- **Real-time Updates** - Instant status changes
- **Toast Notifications** - User feedback for all actions
- **Loading States** - Visual feedback during operations

## 🔒 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Secure session management
- **Input Validation** - Server-side validation for all inputs
- **Role-based Access** - Different permissions for different user types
- **CORS Protection** - Cross-origin request handling

## 📁 Project Structure

```
waste-food-management/
├── client/                 # React frontend
│   ├── public/
│   │   ├── components/
│   │   │   ├── auth/      # Login/Register components
│   │   │   └── layout/    # Navbar component
│   │   ├── App.js         # Main app component
│   │   └── index.js       # React entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill processes using the ports

3. **Module Not Found Errors**
   - Run `npm run install-all` again
   - Clear node_modules and reinstall

4. **CORS Errors**
   - Check if backend is running on correct port
   - Verify proxy setting in client/package.json

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- MongoDB team for the database
- Express.js team for the web framework
- All open-source contributors

---

**Happy coding! 🚀** 