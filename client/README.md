<div align="center">

![Contributor](https://img.shields.io/badge/Contributor-000?style=flat&logo=c&logoColor=whitesmoke) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![NPM](https://img.shields.io/badge/Npm-CC342D?style=flat&logo=npm&logoColor=white)
![GitHub](https://img.shields.io/badge/Github-000?style=flat&logo=github&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/-TailwindCss-38BDF8?style=flat&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/-Axios-000000?style=flat&logo=axios&logoColor=white) ![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?style=flat&logo=vs-code&logoColor=white) ![Toastify](https://img.shields.io/badge/-Toastify-F05032?style=flat&logo=toastify&logoColor=white)

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

A modern React-based authentication system with email verification and password reset functionality.

## Fronend Architecture

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- ✉️ Email Verification System
- 🔑 Password Reset Flow
- 🎨 Modern UI with Tailwind CSS
- 🚀 Responsive Design
- 🔒 Protected Routes
- 🍪 Cookie-based Authentication
- ⚡ Fast and Lightweight

## 🛠️ Tech Stack

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify

## Project Structure

```
src/
├── assets/
├── components/
│   ├── Hero.jsx
│   └── Navbar.jsx
├── context/
│   └── AppContext.jsx
├── pages/
│   ├── EmailVerify.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   └── ResetPassword.jsx
└── App.jsx
```

## Key Components

- `AppContext`: Manages global state and authentication
- `Login`: Handles user registration and login
- `EmailVerify`: Manages email verification process
- `ResetPassword`: Handles password reset flow
- `Navbar`: Navigation and user menu component
- `Hero`: Main landing page component

#### Dashboard Implementation

```javascript
Features:
1. Protected Access:
   - JWT validation
   - Auth state check
   - Redirect logic

2. User Data Display:
   - Profile information
   - Account status
   - Join date formatting
   - Activity tracking
```

## 📡 API Integration

### Authentication Endpoints

```javascript
1. User Management:
   POST /api/auth/register
   POST /api/auth/login
   POST /api/auth/logout

2. Email Verification:
   POST /api/auth/send-verify-otp
   POST /api/auth/verify-account

3. Password Reset:
   POST /api/auth/send-reset-otp
   POST /api/auth/reset-password
```

### Protected Routes

```javascript
Implementation:
- JWT validation
- Auth state checks
- Automatic redirects
- Error handling
```

### Navigation System

```javascript
Features:
1. Route Protection:
   - Auth checks
   - Role-based access
   - Redirect logic

2. User Experience:
   - Smooth transitions
   - Loading states
   - Error handling
```

### Date Formatting (`formatDate.js`)

```javascript
Functionality:
- Date string parsing
- Invalid date handling
- Localized formatting
- 12-hour time format
```

## Environment Variables

| Variable         | Description     |
| ---------------- | --------------- |
| VITE_BACKEND_URI | Backend API URL |

## ⚙️ Environment Variables

```env
VITE_BACKEND_URI=<backend_url>
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

<!-- ## Author & License
```
Author: Monayem Hossain Limon
GitHub: @Limon00001
Copyright © 2024 monayem_hossain_limon
``` -->

## 👨‍💻 Author

[![LinkedIn][github-shield]][github-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[github-shield]: https://img.shields.io/badge/-GitHub-black.svg?style=flat-square&logo=github&color=555&logoColor=white
[github-url]: https://github.com/Limon00001
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/monayem-hossain-limon/
