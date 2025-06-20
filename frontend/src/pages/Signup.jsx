import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { LogIn } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { signup, loading } = useUserStore();

  return (
    <div className="bg-emerald-600 min-h-[92vh] flex justify-center items-center">
      <div className="bg-emerald-100 rounded-lg py-16 px-10 max-sm:px-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form
            className="flex items-center flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              signup(formData);
            }}
          >
            <p className="mb-12 text-3xl font-bold text-center text-zinc-800 flex items-center">
              <span className="mr-3">Signup</span>
              <LogIn />{" "}
            </p>
            {/* Username */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="username"
                className="w-36 text-left mr-3 text-zinc-800"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="flex-1 focus:outline-0 bg-emerald-200 rounded-lg px-6 py-2 text-zinc-800 border border-emerald-700"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="email"
                className="w-36 text-left mr-3 text-zinc-800"
              >
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="flex-1 focus:outline-0 bg-emerald-200 rounded-lg px-6 py-2 text-zinc-800 border border-emerald-700"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="password"
                className="w-36 text-left mr-3 text-zinc-800"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="flex-1 focus:outline-0 bg-emerald-200 rounded-lg px-6 py-2 text-zinc-800 border border-emerald-700"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="flex items-center mb-4">
              <label
                htmlFor="confirm-password"
                className="w-36 text-left mr-3 text-zinc-800"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="flex-1 focus:outline-0 bg-emerald-200 rounded-lg px-6 py-2 text-zinc-800 border border-emerald-700"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="mt-6 text-lg bg-emerald-600 text-zinc-100 cursor-pointer text-center rounded-lg py-2 px-3.5"
            >
              Signup
            </button>
          </form>
        )}
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer text-purple-950">
            Login page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
