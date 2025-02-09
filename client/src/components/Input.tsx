import React, { useState } from 'react';
import { postRequest } from '../servises';

const Input: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSendData = async (): Promise<void> => {
    setIsLoading(true);
    setMessage("");
    try {
      const data=await postRequest("add-todo", { todo });
      if(!data.ok)return setMessage(data.msg)
      setTodo("");
      setMessage("Todo added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
      setMessage("Failed to add todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <input
          type="text"
          value={todo}
          className="bg-slate-300 border-2 border-yellow-400 py-2 px-4 mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter Today Todo..."
          onChange={(e) => setTodo(e.target.value)}
          disabled={isLoading} 
        />
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
          onClick={handleSendData}
          disabled={isLoading || !todo.trim()} 
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </>
  );
};

export default Input;