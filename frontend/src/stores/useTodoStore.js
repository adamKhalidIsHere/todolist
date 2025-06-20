import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;
export const useTodoStore = create((set) => ({
  loading: false,
  todos: [],
  page: 1,
  totalCount: 0,
  setPage: (page) => set({ page: page }),
  getTodos: async (page, limit) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`/todos?page=${page}&limit=${limit}`, {
        withCredentials: true,
      });
      set({ todos: data.todos, totalCount: data.totalCount });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch todos");
    } finally {
      set({ loading: false });
    }
  },

  createTodo: async ({ title }) => {
    if (!title || title.trim() === "") {
      toast.error("Title cannot be empty");
      return;
    }

    set({ loading: true });
    try {
      const { data } = await axios.post(
        "/todos/create",
        { title },
        { withCredentials: true }
      );

      set((state) => ({
        todos: [...state.todos, data.newTodo],
      }));
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Failed to create todo");
    } finally {
      set({ loading: false });
    }
  },
  deleteTodo: async (id) => {
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      toast.error("Invalid todo ID");
      return;
    }
    set({ loading: true });
    try {
      const res = await axios.delete(`/todos/delete/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete todo");
    } finally {
      set({ loading: false });
    }
  },
  editTodo: async ({ title, id }) => {
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      toast.error("Invalid todo ID");
      return;
    }
    set({ loading: true });
    try {
      const res = await axios.patch(
        `/todos/edit/${id}`,
        { title },
        { withCredentials: true }
      );
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, title } : todo
        ),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update todo");
    } finally {
      set({ loading: false });
    }
  },
  completeInCompleteTodo: async (id) => {
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      toast.error("Invalid todo ID");
      return;
    }
    set({ loading: true });
    try {
      const res = await axios.patch(`/todos/${id}/toggle`, null, {
        withCredentials: true,
      });
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo._id === id) {
            todo.completed = !todo.completed;
            return todo;
          } else {
            return todo;
          }
        }),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  searchTodo: async ({ query }) => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `/todos/search?q=${encodeURIComponent(query)}`,
        {
          withCredentials: true,
        }
      );
      set({ todos: res.data.todos });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
