# 📝 Fullstack Todo App

A fullstack Todo application built with **React**, **Node.js**, and **MongoDB**. Users can create, edit, delete, search, and paginate through their tasks. Authentication is included using JWTs stored in cookies.

## 🚀 Features

- ✅ User authentication with JWT & cookies
- ✅ Create, edit, delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Search todos by keyword
- ✅ Pagination (10 todos per page)
- ✅ Fully responsive UI
- ✅ Toast notifications for feedback

---

## 🛠️ Tech Stack

### Frontend

- React
- Axios
- Zustand (state management)
- Tailwind CSS
- React Hot Toast
- Lucide Icons

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for auth
- dotenv for config

---

## 🔐 Authentication

- JWT stored in `httpOnly` cookies
- Protected routes on backend
- Frontend checks auth on load

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/adamKhalidIsHere/todolist.git
cd todo-fullstack

# Install server dependencies
npm install

# Install client dependencies
cd frontend
npm install
```

### 🔧 Environment Variables

Create a `.env` file in `/server`:

```
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret

```

---

## ▶️ Running Locally

```bash
# Start backend
npm run dev

# Start frontend
cd frontend
npm run dev
```

---

## 🙋‍♂️ Author

**Adam Elshazly**  
Inspired by real productivity needs and built with 💻 & ❤️  
[GitHub](https://github.com/adamKhalidIsHere)

---

## 📄 License

This project is open source and free to use.
