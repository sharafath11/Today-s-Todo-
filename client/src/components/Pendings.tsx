import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../servises";
import { TODOS } from "../servises";
import Completed from "./Completed";
import { showError, showInfo, showSuccess } from "../../Utility/Toastyfy";

const Pendings: React.FC = () => {
  const [todos, setTodos] = useState<TODOS[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        const response = await getRequest("get-todos");
        setTodos(response.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [todos]);

  async function handleDelete(id: string): Promise<void> {
    try {
      const response = await postRequest("delete", { id });
      response.ok ? showInfo("You are fake 🤬") : showError(response.msg);
    } catch (error) {
      showError("Something went wrong");
    }
  }

  function editHandler(id: string, todo: string): void {
    setEditId(id); 
    setEditText(todo); 
  }

  async function saveEdit(id: string): Promise<void> {
    try {
      const response = await postRequest("edit", { id, todo: editText });
      if (response.ok) {
        showSuccess("Task updated successfully");
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, todo: editText } : todo
          )
        );
        setEditId(null);
      } else {
        showError(response.msg);
      }
    } catch (error) {
      showError("Update failed");
    }
  }

  async function handleCompleted(id: string): Promise<void> {
    try {
      const response = await postRequest("completed", { id });
      response.ok
        ? showSuccess("Task marked as completed!")
        : showError(response.msg);
    } catch (error) {
      showError("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start border p-4 gap-4">
      <ul className="w-full lg:w-1/2 border p-2 rounded bg-white shadow-md">
        <h2 className="text-xl font-bold text-green-600 mb-4 text-center">
          Pending Tasks 🧐
        </h2>
        {todos?.filter((todo) => !todo.status).map((todo) => (
          <li
            key={todo._id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 border-b bg-white shadow-md rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            {editId === todo._id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-2 rounded-md text-lg font-semibold"
              />
            ) : (
              <span className="text-lg font-semibold text-gray-800">
                {todo.todo}
              </span>
            )}
            <div className="flex space-x-2 mt-2 sm:mt-0">
              {editId === todo._id ? (
                <button
                  className="p-2 text-xs text-white bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => saveEdit(todo._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-4 py-2 text-xs text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
                  onClick={() => editHandler(todo._id, todo.todo)}
                >
                  Edit
                </button>
              )}
              <button
                className="px-4 py-2 text-xs text-white bg-green-500 border border-green-500 rounded-lg hover:bg-green-600 transition"
                onClick={() => handleCompleted(todo._id)}
              >
                Done
              </button>
              <button
                className="px-4 py-2 text-xs text-white bg-red-500 border border-red-500 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleDelete(todo._id)}
              >
                Delete 🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full lg:w-1/2 border p-2 rounded bg-white shadow-md">
        <h2 className="text-xl font-bold text-green-600 mb-4 text-center">
        Completed Tasks 😎 
        </h2>
        <ul className="w-full">
  {todos
    ?.filter((todo) => todo.status)
    .sort((a, b) => (a._id < b._id ? 1 : -1)) 
    .map((todo) => (
      <li key={todo._id} className="p-2 border-b">
        <Completed todos={todo } handleDelete={handleDelete} />
      </li>
    ))}
</ul>
      </div>
    </div>
  );
};

export default Pendings;
