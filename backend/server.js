const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const todosRoutes = require("./routes/todos.route");
const connectToDB = require("./utils/connectToDB");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

// SERVE FRONTEND IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// CONNECT TO DB AND START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();
});
