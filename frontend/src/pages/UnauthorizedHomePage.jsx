import {Link } from "react-router-dom"
const UnauthorizedHomePage = () => {
  return (
    <div className="h-[calc(100vh-70.98px)] bg-emerald-600 flex justify-center items-center flex-col">
      <h1 className="text-zinc-100 text-5xl font-bold text-center">
        Simple and fast todolist app for <span className="block mt-5">PRODUCTIVITY</span>
      </h1>
      <Link to={"/signup"} className="mt-10 text-zinc-800 bg-emerald-200 rounded-lg text-center px-8 py-4  font-bold text-2xl hover:bg-emerald-600 hover:border-2 hover:border-white hover:text-white duration-300">Signup now</Link>
    </div>
  );
};
export default UnauthorizedHomePage;
