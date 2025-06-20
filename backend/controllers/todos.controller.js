const User = require("../models/user.model");
const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const user = req.user;
  try {
    const todos = await Todo.find({ user: user._id })
      .populate("user", "username email")
      .skip(skip)
      .limit(limit);
    const totalCount = await Todo.countDocuments({ user: req.user.id });

    res.status(200).json({ todos, totalCount });
  } catch (error) {
    console.log("error in getTodos controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTodo = async (req, res) => {
  const { title } = req.body;
  const user = req.user;
  try {
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title must be provided" });
    }
    const newTodo = new Todo({
      user: user._id,
      title,
      completed: false,
    });

    user.todos.push(newTodo._id);
    await user.save();
    await newTodo.save();
    return res
      .status(201)
      .json({ newTodo, message: "Todo created successfully" });
  } catch (error) {
    console.log("error in createTodo controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  if (!todoId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid todo ID" });
  }
  try {
    const user = req.user;
    const todo = await Todo.findOne({ _id: todoId });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    if (todo.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Forbidden - Not your todo" });
    }
    await Todo.deleteOne({ _id: todoId });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("error in deleteTodo controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const completeInCompleteTodo = async (req, res) => {
  const todoId = req.params.id;
  if (!todoId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid todo ID" });
  }
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    const todo = await Todo.findOne({ _id: todoId });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (todo.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Forbidden - Not your todo" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    const statusMessage = todo.completed
      ? "Todo completed successfully"
      : "Todo marked as incomplete successfully";

    res.status(200).json({ message: statusMessage, completed: todo.completed });
  } catch (error) {
    console.error("Error in completeInCompleteTodo controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const editTodo = async (req, res) => {
  const { title } = req.body;
  const id = req.params.id;
  const user = req.user;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid todo ID" });
  }

  try {
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title must be provided" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (todo.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this todo" });
    }

    todo.title = title;
    await todo.save();

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.error("Error in editTodo controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchTodo = async (req, res) => {
  const { q } = req.query;
  console.log(req.query);

  try {
    const user = req.user;
    const todos = await Todo.find({
      user: user._id,
      title: { $regex: q, $options: "i" },
    });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTodos,
  deleteTodo,
  completeInCompleteTodo,
  createTodo,
  editTodo,
  searchTodo,
};
