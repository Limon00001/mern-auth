<div align="center">

![Contributor](https://img.shields.io/badge/Contributor-000?style=flat&logo=c&logoColor=whitesmoke) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) ![Node JS](https://img.shields.io/badge/Node-339933?style=flat&logo=node.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![MongoDB](https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat&logo=express&logoColor=white) ![NPM](https://img.shields.io/badge/Npm-CC342D?style=flat&logo=npm&logoColor=white)
![GitHub](https://img.shields.io/badge/Github-000?style=flat&logo=github&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/-TailwindCss-38BDF8?style=flat&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/-Axios-000000?style=flat&logo=axios&logoColor=white) ![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?style=flat&logo=vs-code&logoColor=white) ![Toastify](https://img.shields.io/badge/-Toastify-F05032?style=flat&logo=toastify&logoColor=white) ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white)

</div>

<br />
<br />

<div style='display: flex; align-items: center; gap: 4rem;'>
<img src="./client/public/favicon.png" width="30"/>

# MERN Authentication System

</div>

## 📸 Project Screenshot

![Project Screenshot](./client/public/banner.png)

## 📈 System Overview

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring email verification and password reset functionality.


## 🚀 Features

- 🪪 User Registration & Login
- ✉️ Email Verification System
- 🔑 Password Reset Functionality
- 🔒 Protected Routes
- 🛡️ JWT Authentication
- 🎨 Modern UI with Tailwind CSS
- 🚀 Responsive Design
- 🍪 Cookie-based Authentication
- 🔔 Toast Notification
- ⚡ Fast and Lightweight

## 🛠️ Technologies Used

- **Frontend:**
  - React.js with Vite
  - Tailwind CSS
  - Axios
  - React Router DOM
  - React Toastify

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Nodemailer for email services
  - bcrypt for password hashing

## </> API Endpoints

- **Auth Routes:**
  - POST `/api/auth/register` - Register a new user
  - POST `/api/auth/login` - Login user
  - POST `/api/auth/logout` - Logout user
  - POST `/api/auth/verify-account` - Verify email account
  - POST `/api/auth/send-verify-otp` - Send verification OTP
  - POST `/api/auth/send-reset-otp` - Send password reset OTP
  - POST `/api/auth/reset-password` - Reset password
  - GET `/api/auth/is-auth` - Authenticate user

- **User Routes:**
  - GET `/api/users/get-user` - Get user profile

## 🧩 Project Structure

```
mern-auth/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── assets/      # Static assets
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Context providers
│   │   └── pages/       # Page components
│   └── ...
└── server/              # Backend Node.js/Express application
    ├── config/         # Configuration files
    ├── controllers/    # Request handlers
    ├── middleware/     # Custom middleware
    ├── models/        # Database models
    ├── routes/        # API routes
    └── ...
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Limon00001/mern-auth.git
   cd mern-auth
   ```

2. **Set up the backend:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the server directory:
   ```env
   PORT=<your-port>
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   SMTP_HOST=<smtp-host>
   SMTP_PORT=<smtp-port>
   SMTP_USER=<smtp-username>
   SMTP_PASS=<smtp-password>
   ```

3. **Set up the frontend:**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the client directory:
   ```env
   VITE_BACKEND_URI=<backend-url>
   ```

4. **Run the application:**
   
   In the server directory:
   ```bash
   npm run dev
   ```
   
   In the client directory:
   ```bash
   npm run dev
   ```

## 👨‍💻 Author

[![LinkedIn][github-shield]][github-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[github-shield]: https://img.shields.io/badge/-GitHub-black.svg?style=flat-square&logo=github&color=555&logoColor=white
[github-url]: https://github.com/Limon00001
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/monayem-hossain-limon/