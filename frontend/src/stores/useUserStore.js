import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  checkingAuth: true,
  loading: false,

  signup: async ({ username, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ error: "Passwords don't match", loading: false });
    }
    try {
      const res = await axios.post(
        "/auth/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      set({ user: res.data, loading: false });
      toast.success("Signed up successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error);
    }
  },
  login: async ({ username, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        "/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      set({ user: res.data, loading: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error);
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/logout", null, {
        withCredentials: true,
      });
      set({ loading: false, user: null });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error);
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/me", {
        withCredentials: true,
      });

      set({ user: res.data.user, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },
}));
