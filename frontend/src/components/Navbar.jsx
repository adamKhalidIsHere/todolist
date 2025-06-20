import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
import { LogIn, LogOut } from "lucide-react";
const Navbar = () => {
  const { user, loading, logout } = useUserStore();

  return (
    <div className="flex bg-emerald-100 py-2 px-52 items-center justify-between max-md:px-4 max-sm:px-2">
      <Link to={"/"} className="flex items-center">
        <img src="/logo.png" alt="" className="w-14" />
        <p className="font-bold text-zinc-800 text-lg">Todolist</p>
      </Link>
      <div className="flex">
        {user ? (
          <Link
            className="bg-emerald-600 py-2.5 px-3 rounded-xl text-zinc-100 min-w-4 flex flex-row items-center justify-between"
            onClick={logout}
          >
            <span className="mr-3">Logout</span>
            <LogOut size={20} />
          </Link>
        ) : loading ? null : (
          <>
            <Link
              className="bg-emerald-600 py-2.5 px-3 rounded-xl text-zinc-100 mr-2 text-center flex flex-row items-center justify-between"
              to={"/signup"}
            >
              <span className="mr-3">Start here</span>
              <LogIn size={20} />
            </Link>
            <Link
              className="bg-emerald-600 py-2.5 px-3 rounded-xl text-zinc-100 flex flex-row items-center justify-between"
              to={"/login"}
            >
              <span className="mr-3">Login</span>
              <LogIn size={20} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
