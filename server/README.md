<div align="center">

![Contributor](https://img.shields.io/badge/Contributor-000?style=flat&logo=c&logoColor=whitesmoke) ![Node JS](https://img.shields.io/badge/Node-339933?style=flat&logo=node.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![NPM](https://img.shields.io/badge/Npm-CC342D?style=flat&logo=npm&logoColor=white)
![GitHub](https://img.shields.io/badge/Github-000?style=flat&logo=github&logoColor=white) ![MongoDB](https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat&logo=express&logoColor=white) ![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white) ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white)

</div>

<br />
<br />

<div style='display: flex; align-items: center; gap: 4rem'>
<img src="../client/public/favicon.png" width="30"/>

# autoBot - Authentication System Documentation
</div>

## 📸 Project Screenshot

![Project Screenshot](../client/public/banner.png)

## 📈 System Overview

A comprehensive MERN stack authentication system with email verification and password reset functionality.

## Backend Architecture

## 🚀 Features

- 🔐 [JWT-based Authentication](#1-user-registration-apiauthregister)
- ✉️ [Email Verification System](#3-email-verification)
- 🔑 [Password Reset Flow](#4-password-reset)
- 📧 [Email Templates](#-security-features)
- 🍪 [Cookie-based Token Storage](#-security-features)
- 🛡️ [Security Best Practices](#-security-features)
- 🚀 [Production-ready Configuration](#)

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Nodemailer (with Brevo SMTP)
- Bcrypt.js
- Cookie Parser
- CORS

### 🔑 Authentication Flow

#### 1. User Registration (`/api/auth/register`)
```javascript
Registration Flow:

1. Validate input (name, email, password)
2. Check for existing user
3. Hash password using bcrypt (salt rounds from env)
4. Create user in MongoDB
5. Generate JWT token
6. Set HTTP-only cookie
7. Send welcome email
8. Return success response
```

#### 2. User Routes
```
GET /api/users/get-user
- Get user profile
- Requires valid JWT
```

#### 3. Email Verification
```javascript
Two-Step Process:

1. Send OTP (/api/auth/send-verify-otp):
   - Generate 6-digit OTP
   - Store in user document with 5-min expiry
   - Send email using custom HTML template
   - Return success response

2. Verify OTP (/api/auth/verify-account):
   - Validate OTP input
   - Check OTP expiration
   - Update user verification status
   - Clear OTP data
   - Return success response
```

#### 4. Password Reset
```javascript
Three-Step Process:

1. Request Reset (/api/auth/send-reset-otp):
   - Validate email
   - Generate 6-digit OTP
   - Store with 5-min expiry
   - Send reset email

2. Verify OTP & Reset (/api/auth/reset-password):
   - Validate OTP and new password
   - Check OTP expiration
   - Hash new password
   - Update user document
```

## 🔒 Security Features

1. **Password Security**
   - Bcrypt hashing
   - Configurable salt rounds
   - No plain-text storage

2. **JWT Authentication**
   - HTTP-only cookies
   - Secure cookie flags
   - Configurable expiration

3. **Email Security**
   - OTP expiration
   - HTML email templates
   - SMTP integration

4. **API Security**
   - CORS protection
   - Input validation
   - Error handling

## 🏗️ Project Structure
```
src/
├── app.js
├── config/
│   ├── db.js
│   ├── emailTemplate.js
│   └── nodemailer.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   └── userAuth.js
├── models/
│   └── userModel.js
└── routes/
    ├── authRoutes.js
    └── userRoutes.js
```

## ⚙️ Environment Variables

```env
PORT=<port>
MONGO_URI=<mongodb://localhost:27017/your_database>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRE=<expiry_day>
SMTP_USER=<your_smtp_username>
SMTP_PASS=<your_smtp_password>
SENDER_EMAIL=<your_sender_email>
FRONTEND_URI=<frontend_url>
SALT_NUMBER=<salt_number>
NODE_ENV=<development> or <production>
```

## 👨‍💻 Author

[![LinkedIn][github-shield]][github-url]
[![LinkedIn][linkedin-shield]][linkedin-url]




[github-shield]: https://img.shields.io/badge/-GitHub-black.svg?style=flat-square&logo=github&color=555&logoColor=white
[github-url]: https://github.com/Limon00001
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/monayem-hossain-limon/
