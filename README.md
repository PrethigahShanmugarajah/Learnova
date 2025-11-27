# 🎓 Learnova – Full Stack Learning Management System (React + Node + Express + MongoDB)

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey?logo=express)](https://expressjs.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?logo=clerk)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-yellow?logo=stripe)](https://stripe.com/)

**Learnova** is a **Full Stack Learning Management System (LMS)** that allows **educators** to create and manage courses, and **students** to enroll, learn, and track their progress.
It integrates **Clerk** for authentication, **Stripe** for payments, and **Cloudinary** for file uploads.

---

## ✨ Features

### 👨‍🏫 Educator Portal

- Sign up/login as educator (Clerk)
- Add, update, and manage courses
- Upload lectures and course materials
- Track students enrolled in their courses
- View analytics dashboard for course performance

### 👩‍🎓 Student Portal

- Sign up/login as student (Clerk)
- Browse and enroll in courses
- View lectures and course content
- Track progress and course completion
- Rate and review courses
- View enrolled courses and manage learning journey

### 💳 Payments

- Course payments integrated with **Stripe**
- Automatic handling of completed and failed payments via webhooks

### 🛠️ Technologies Used

**Frontend:**

- React.js (Vite)
- Tailwind CSS / Custom CSS
- Axios for API calls
- React Router DOM
- Framer Motion (animations)

**Backend:**

- Node.js & Express.js
- MongoDB with Mongoose
- Clerk (authentication & multi-session profiles)
- Stripe (payment integration)
- Cloudinary (file uploads)
- dotenv (environment configuration)

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PrethigahShanmugarajah/Learnova.git
cd Learnova
```

---

### 2️⃣ Backend Setup

```bash
cd Server
npm install
npm run server
```

### 3️⃣ Frontend Setup

```bash
cd Client
npm install
npm run dev
```

---

## 🔑 Environment Variables Setup

### 📂 Backend `.env` (Server/)

```
MONGODB_URI=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 📂 Frontend `.env` (Client/)

```
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BASE_URL=
VITE_CURRENCY=
```

---

## 📎 Project Link

[GitHub Repository](https://github.com/PrethigahShanmugarajah/Learnova.git)

---

## 👨‍💻 Author

**Prethigah Shanmugarajah (2020/2021)**<br>
Department of Software Engineering, Faculty of Computing<br>
Sabaragamuwa University of Sri Lanka

---
