import { useEffect, useState } from "react";
import {
  X,
  CheckIcon,
  EllipsisVertical,
  CheckSquare,
  Square,
  Plus,
  Search,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useTodoStore } from "../stores/useTodoStore";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthorizedHomePage = () => {
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [query, setQuery] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState(null);

  const {
    getTodos,
    createTodo,
    deleteTodo,
    editTodo,
    completeInCompleteTodo,
    searchTodo,
    page,
    totalCount,
    setPage,
    todos,
    loading,
  } = useTodoStore();
  useEffect(() => {
    getTodos(page, 10);
  }, [page, getTodos]);

  const totalPages = Math.ceil(totalCount / 10);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="min-h-[calc(100vh-70.98px)] bg-emerald-600 px-52 py-12 max-md:px-0 max-md:py-0">
      <div className="bg-emerald-100 rounded-lg min-h-[100%] max-md:rounded-none px-32 py-16">
        <div className="mb-6 flex relative items-center">
          <input
            type="text"
            className="w-[100%] px-4 py-2 focus:outline-0 border-2 border-black rounded-lg"
            placeholder="Create a task here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Plus
            className="absolute right-2  cursor-pointer"
            onClick={() => createTodo({ title })}
          />
        </div>
        <div className="flex justify-end mb-7 items-center relative">
          <Search
            size={16}
            className="absolute right-58 cursor-pointer"
            onClick={() => searchTodo({ query })}
          />
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-0 border-black border-2 rounded-lg pl-7 py-1"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchTodo({ query });
              }
            }}
          />
        </div>
        {todos.map((todo) => (
          <div
            className={`border-2 border-zinc-700 rounded-lg px-4 py-2 flex justify-between items-center mb-3 ${
              editModalOpen ? null : "relative"
            }`}
            key={todo._id}
          >
            <div className="flex items-center">
              {todo.completed ? (
                <CheckSquare
                  size={20}
                  className="mr-4 cursor-pointer"
                  onClick={() => completeInCompleteTodo(todo._id)}
                />
              ) : (
                <Square
                  size={20}
                  className="mr-4 cursor-pointer"
                  onClick={() => completeInCompleteTodo(todo._id)}
                />
              )}

              <p>{todo.title}</p>
            </div>

            <EllipsisVertical
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setActiveTodoId(activeTodoId === todo._id ? null : todo._id);
              }}
            />
            {activeTodoId === todo._id && (
              <div className="absolute bg-zinc-700 -right-16 top-8">
                <div
                  className="py-3 px-4 hover:bg-zinc-500 duration-300 text-white cursor-pointer"
                  onClick={() => {
                    setEditModalOpen(!editModalOpen);
                    setActiveTodoId(todo._id);
                    setEditTitle(todo.title);
                  }}
                >
                  Edit
                </div>
                <div
                  className="py-3 px-4 hover:bg-zinc-500 duration-300 text-white cursor-pointer"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        ))}
        {editModalOpen && (
          <>
            <div
              className="fixed inset-0 w-full min-h-screen bg-[rgba(63,63,70,0.4)] z-40"
              onClick={() => setEditModalOpen(false)}
            />
            <div className="absolute top-[50%] left-[50%] -translate-1/2 flex justify-center items-center z-50">
              <div className="bg-emerald-600 rounded-lg text-white px-10 py-16 z-50 flex flex-col">
                <p className="font-bold text-2xl text-center mb-8">
                  Edit Todo!
                </p>
                <X
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => setEditModalOpen(!editModalOpen)}
                />
                <div className="">
                  <label htmlFor="title" className="text-xl mr-4">
                    Title:{" "}
                  </label>
                  <input
                    type="text"
                    className="focus:outline-0 border-[1px] border-zinc-100 rounded-lg px-4 py-2"
                    id="title"
                    name="title"
                    onChange={(e) => setEditTitle(e.target.value)}
                    value={editTitle}
                  />{" "}
                </div>
                <button
                  className="mt-7 font-bold text-2xl border-2 border-white rounded-lg w-18 cursor-pointer self-center"
                  onClick={() => {
                    editTodo({ title: editTitle, id: activeTodoId });
                    setEditModalOpen(false);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-between mt-8 items-center">
          <div
            className={`flex cursor-pointer ${
              page === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          >
            <ArrowLeft />
            <span className="ml-2">Previous Page</span>
          </div>
          <p className="text-center mt-4 text-zinc-800">
            Page {page} of {totalPages}
          </p>
          <div
            className={`flex cursor-pointer ${
              totalPages <= page ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => {
              if (totalPages > page) setPage(page + 1);
            }}
          >
            <span className="mr-2">Next Page</span>
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthorizedHomePage;
