const express = require("express");
const { getTodos, deleteTodo, completeInCompleteTodo, createTodo, editTodo, searchTodo } = require("../controllers/todos.controller");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.get("/", protectRoute, getTodos);
router.get("/search", protectRoute, searchTodo);
router.patch("/:id/toggle", protectRoute, completeInCompleteTodo);
router.patch("/edit/:id", protectRoute, editTodo);
router.post("/create", protectRoute, createTodo);
router.delete("/delete/:id", protectRoute, deleteTodo);

module.exports = router;
